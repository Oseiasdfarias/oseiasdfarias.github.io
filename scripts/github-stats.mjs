#!/usr/bin/env node
// Gera public/data/github.json com dados do GitHub via `gh` (GraphQL autenticado).
// Roda no predeploy; o site lê o JSON em runtime, então o token nunca vai para o bundle.
// Uso: node scripts/github-stats.mjs [login]

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOGIN = process.argv[2] || 'oseiasdfarias';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data', 'github.json');

const gql = (query, vars = {}) => {
  const args = ['api', 'graphql', '-f', `query=${query}`];
  for (const [k, v] of Object.entries(vars)) args.push('-F', `${k}=${v}`);
  return JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })).data;
};

const { user } = gql(`query($login: String!) {
  user(login: $login) {
    login name createdAt
    followers { totalCount }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) { totalCount }
    contributionsCollection {
      totalCommitContributions totalPullRequestContributions totalPullRequestReviewContributions
      totalIssueContributions totalRepositoriesWithContributedCommits restrictedContributionsCount
      contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } }
      commitContributionsByRepository(maxRepositories: 25) {
        repository { nameWithOwner url isPrivate description primaryLanguage { name color } stargazerCount }
        contributions { totalCount }
      }
    }
  }
}`, { login: LOGIN });

const cc = user.contributionsCollection;
const days = cc.contributionCalendar.weeks.flatMap(w => w.contributionDays);

// Sequências (streak): a atual tolera o dia de hoje ainda sem contribuição
let longest = 0, run = 0;
for (const d of days) { run = d.contributionCount > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
let current = 0;
for (let i = days.length - 1; i >= 0; i--) {
  if (days[i].contributionCount > 0) current++;
  else if (i === days.length - 1) continue;
  else break;
}

// Linguagens: peso = commits do ano por linguagem principal do repositório
// (bytes distorcem: outputs de notebooks inflam Jupyter para >90%)
const langs = new Map();
for (const r of cc.commitContributionsByRepository) {
  const l = r.repository.primaryLanguage;
  if (!l) continue;
  const cur = langs.get(l.name) || { name: l.name, color: l.color, commits: 0 };
  cur.commits += r.contributions.totalCount; langs.set(l.name, cur);
}
const totalCommits = [...langs.values()].reduce((a, l) => a + l.commits, 0) || 1;
const languages = [...langs.values()].sort((a, b) => b.commits - a.commits).slice(0, 5)
  .map(l => ({ name: l.name, color: l.color, pct: +((l.commits / totalCommits) * 100).toFixed(1) }));

// Só repositórios públicos aparecem por nome
const topRepos = cc.commitContributionsByRepository
  .filter(r => !r.repository.isPrivate && !r.repository.nameWithOwner.endsWith('/.github'))
  .slice(0, 5)
  .map(r => ({
    name: r.repository.nameWithOwner, url: r.repository.url,
    description: r.repository.description, language: r.repository.primaryLanguage?.name ?? null,
    stars: r.repository.stargazerCount, commits: r.contributions.totalCount,
  }));

// Última release do Synapsys (pode não existir)
let synapsys = null;
try {
  const rel = JSON.parse(execFileSync('gh', ['api', 'repos/synapsys-lab/synapsys/releases/latest'], { encoding: 'utf8' }));
  synapsys = { tag: rel.tag_name, publishedAt: rel.published_at, url: rel.html_url };
} catch { /* sem release publicada */ }

const data = {
  generatedAt: new Date().toISOString(),
  login: user.login,
  profile: {
    followers: user.followers.totalCount,
    publicRepos: user.repositories.totalCount,
    since: user.createdAt.slice(0, 4),
  },
  year: {
    total: cc.contributionCalendar.totalContributions,
    commits: cc.totalCommitContributions,
    pullRequests: cc.totalPullRequestContributions,
    reviews: cc.totalPullRequestReviewContributions,
    issues: cc.totalIssueContributions,
    reposContributed: cc.totalRepositoriesWithContributedCommits,
    private: cc.restrictedContributionsCount,
  },
  streak: { current, longest },
  calendar: cc.contributionCalendar.weeks.map(w => w.contributionDays.map(d => [d.date, d.contributionCount])),
  topRepos,
  languages,
  synapsys,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(data));
console.log(`github.json: ${data.year.total} contribuições/ano · streak ${current}/${longest} · ${topRepos.length} repos · ${languages.length} linguagens`);
