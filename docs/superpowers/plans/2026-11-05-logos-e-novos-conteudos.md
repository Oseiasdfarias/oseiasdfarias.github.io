# Planejamento: logos, banners e novos conteúdos do portfólio

Iniciado em 2026-11-05 · branch `feat/aixis-style` (PR #5 para `develop`)

Objetivo: deixar o portfólio mais visual e mais convincente, mostrando logos de instituições, empresas, eventos e ferramentas em vez de só os nomes. Visual clean, mas com presença: logos médios a grandes, nada de ícones minúsculos.

---

## 0. Status

| Item | Situação |
|---|---|
| Seção **Artigos** (Medium, §06) | Feita localmente, **sem commit**. Script `scripts/medium-posts.mjs` → `public/data/medium.json`, roda no `predeploy` |
| Levantamento de logos | Concluído (seções 1 e 2 abaixo) |
| Implementação dos logos | Aguardando as decisões da seção 4 |
| Novos conteúdos | Recebendo (seção 5) |

---

## 1. Diagnóstico

- O site cita cerca de **70 marcas**, mas só **4 logos** aparecem: UFABC, UFPA, IF e Oracle ONE, todos nos cards de Formação (`components/EduCertIcons.tsx`, arquivos em `public/assets/logos/`).
- Todo o resto é texto: chips mono de tag, nome da empresa em texto pequeno, emissor do certificado como legenda.

## 2. Inventário

| Grupo | Itens | Onde aparecem |
|---|---|---|
| Instituições | UFABC, UFPA (PPCA, LACUT), AFOSR (Força Aérea dos EUA), IFMA, SOFTEX, IFAL, IME‑USP | Pesquisa, Trajetória, Formação, Sobre |
| Empresas | Verzel, Lunella, Otensor (própria), Grupo Piracanjuba, Udemy | Trajetória, Sobre |
| Eventos / publicações | CBA 2026 (2 artigos), COBENGE 2023, ENEEL 2018 (Even3), BDM UFPA | Pesquisa |
| Emissores de certificado | Udemy (15), Alura / Oracle ONE (6), Coursera / IME‑USP, Udacity, EBA, IFAL, IFMA | Formação |
| Plataformas | GitHub, YouTube, Medium, Udemy, PyPI | Comunidade, Open Source |
| Tecnologias | 57 tags diferentes. Mais frequentes: Python (12), PyTorch, ZeroMQ, ESP32 (4), Docker, Simulink, MQTT (3) | Foco, Projetos, Trajetória, Pesquisa |

Conceitos sem logo continuam como texto: LQR, H∞, CUSUM, HIL/SIL, PID, DQN, Deep RL, Voice AI.

### Disponibilidade dos logos

**Prontos na Simple Icons** (v16, SVG monocromático, licença CC0):
Python, PyTorch, TensorFlow, Keras, MLflow, DVC, NumPy, SciPy, Pandas, FastAPI, Pydantic, Pytest, Hypothesis, Docker, Quarkus, GraphQL, PostgreSQL, Redis, Spring Boot, MySQL, Vue.js, React, JavaScript, C++, Three.js, Espressif (ESP32), Raspberry Pi, MQTT, Arduino, ElevenLabs, Keycloak, Vercel, Cal.com, OpenCV, Apache Spark, Flask, Jupyter, Git, GitHub Actions, Linux, GitHub, YouTube, Medium, Udemy, Coursera, Udacity, PyPI.

**Buscar no press kit ou site oficial**:
- Ferramentas: AWS (Lambda, SQS, SAM, DynamoDB), Java, MATLAB / Simulink, OpenAI, Twilio, ZeroMQ, JAX, Oracle, Alura, VAPI, TaskingAI, Pipefy
- Instituições e empresas: AFOSR, Verzel, Lunella, Grupo Piracanjuba, SBA (CBA), ABENGE (COBENGE), IFAL, SOFTEX, USP

---

## 3. Propostas por seção (em ordem de impacto)

- [x] **P1. Faixa "Onde atuei" abaixo do hero.** Wordmarks grandes (40–48 px de altura): UFABC · AFOSR · UFPA · Verzel · Lunella · Piracanjuba · Oracle ONE. Monocromáticos, com cor no hover.
- [x] **P2. Stack** (dentro do Foco, sem nova seção).** Grid de blocos com logo (~40 px) e nome, agrupado pelas 4 frentes do Foco: ML/MLOps · IA & Agentes · Cloud & Back‑end · Sistemas físicos. Cerca de 30 tecnologias. Os chips do Foco ficam mais enxutos.
- [x] **P3. Trajetória.** Bloco de logo da empresa (56–64 px) à esquerda de cada experiência. Selo "financiado pela AFOSR" na UFABC.
- [ ] **P4. Pesquisa.** Faixa de banner no topo dos cards (UFABC + AFOSR, UFPA + PPCA). Selo do evento nas publicações (CBA, COBENGE).
- [ ] **P5. Projetos.** Linha "feito com" com 4–6 logos médios e nome, no lugar dos chips. Conceitos continuam como texto.
- [ ] **P6. Certificações.** Agrupar por emissor, com o logo grande no cabeçalho de cada grupo.
- [ ] **P7. Comunidade.** Logo da plataforma em destaque no topo de cada card.

**Regras visuais (valem para tudo)**
- Monocromático no tom do texto (`currentColor`). A cor da marca aparece só no hover.
- Logo sempre acompanhado do nome. Tamanho médio a grande.
- Arquivos no próprio site, em `public/assets/logos/`. Preferir SVG. Sem hotlink.
- Funcionar nos temas escuro e claro e em 390 px de largura.

**Fases sugeridas**
1. P1 + P2 + P3 (maior efeito)
2. P4 + P5
3. P6 + P7

---

## 4. Decisões pendentes

- [x] **Verzel / Lunella:** liberado. Lunella entra só com o nome: não há logo público (lunella.ai é outro site).
- [x] **AFOSR:** só texto (não há logo próprio no Commons; DoD restringe insígnias). Antes: usar o brasão ou só o selo em texto "financiado pela AFOSR"? A AFOSR tem regras de uso de marca.
- [x] **Cor:** monocromático com cor no hover. Antes: com cor no hover (recomendado) ou sempre na cor da marca?
- [ ] **Escopo da primeira fase:** P1 + P2 + P3?
- [x] **D5. SmartTrac:** resolvido. Repositório público novo, sem o material da Tractian. Antes era: é um desafio técnico da Tractian. O enunciado permite publicar? Opções: (a) tornar o repositório público como está; (b) público, mas sem o nome nem o material da Tractian; (c) no site sem link para o código.
- [x] **D6.** Entrou na Trajetória (tipo voluntariado), com a palestra no TDC. Antes: entra na Trajetória (como experiência) ou em Comunidade (junto da palestra no TDC)?
- [ ] **D7. Posts do LinkedIn:** bloco próprio "No LinkedIn" dentro de Artigos, ou cada post na seção do assunto (CBA em Pesquisa, TDC em Comunidade)?

---

## 5. Novos conteúdos a adicionar

Seção alimentada aos poucos, pela conversa. Cada item registra a informação, onde entra no site e se precisa de logo ou imagem.

| # | Informação | Seção do site | Logo / imagem | Status |
|---|---|---|---|---|
| N1 | **Synapsys sai do destaque** (é mais engenharia de controle do que ML/IA). Ver análise 5.1 | §03 Open Source, Sobre, menu | — | **Feito** (sem commit): §03 removida, Synapsys virou o card REC.07 em Projetos |
| N2 | **Projeto de ML em produção no lugar do destaque**: detecção de anomalias em vibração (desafio de ML Engineering do **Tech Fast Track 2026 da Tractian**: top 5% dos candidatos, chegou à etapa final com entrevista com o diretor e uma pessoa do time de ML; não foi selecionado no fim). Repo público: https://github.com/Oseiasdfarias/vibration-anomaly-detection | Projetos (destaque) | Diagrama de arquitetura (gerar) | **Feito** (sem commit): REC.01 em destaque, diagrama `public/assets/vibration_anomaly_pipeline.svg` |
| N3 | **Uso diário de Linux** para IA, ML, DL, ciência de dados e Docker, e também na pesquisa do mestrado (MATLAB, Simulink, Claude Code). Mais **AWS** e **GitHub Actions** | Sobre (1 parágrafo) + Stack (P2) + Foco | Simple Icons: Linux, Ubuntu, GitHub Actions, Docker, Claude Code, Anthropic. Fora dela: AWS, MATLAB/Simulink | Parágrafo no Sobre **feito** (sem commit). Stack (P2) pendente |
| N4 | **Post LinkedIn, out/2026**: "dois mestrados ao mesmo tempo". Dois artigos apresentados no CBA 2026 (PPGEEL/UFABC e PPCA/UFPA). Foto ao lado do pôster. https://lnkd.in/p/dwnhW5m6 | Pesquisa (destaque CBA) + bloco "No LinkedIn" | Foto salva: `public/assets/eventos/cba2026-poster-ufabc.webp` | Pronto para entrar |
| N5 | **Post LinkedIn, set/2026**: análise da manchete "IA resolveu Navier–Stokes" (10 mil agentes, 88 h, qual enunciado foi de fato provado). https://lnkd.in/p/dtfFzVSp | Bloco "No LinkedIn" (junto de Artigos) | — | Pronto para entrar |
| N6 | **Post LinkedIn, dez/2024**: convite da Oracle para palestrar no **TDC Summit Porto Alegre (IA)** sobre o programa ONE. https://lnkd.in/p/dGnu3yAP | Comunidade / Palestras + Trajetória (voluntariado) | Logo TDC e Oracle ONE (buscar) | Pronto para entrar |
| N7 | **Post LinkedIn, jun/2024**: certificação AWS do **Santander Bootcamp 2024** (DIO). https://lnkd.in/p/dJgEg8tq | Certificações (categoria cloud) | Logo DIO / Santander (buscar) | Falta a data exata e o link do certificado |
| N8 | **Certificados de apresentação CBA 2026** (06–09/out/2026, São Paulo; SBA, USP, Unicamp). FCS-MPC com Raphael Teixeira; Multiagente com E. E. Martínez, J. C. O. S. Lescano e A. S. Potts | Pesquisa → publicações: trocar "aceito" por **"apresentado"** e abrir o certificado num modal | Salvos: `public/assets/certificados/cba2026-fcs-mpc.webp` e `cba2026-multiagente.webp` | Pronto para entrar |
| N10 | **Formação: Técnico em Eletrotécnica integrado ao Ensino Médio**, IFPA (Instituto Federal do Pará) | Formação (antes do bacharelado) | Logo já existe: `public/assets/logos/Instituto_Federal_do_Pará_-_Marca_Vertical_2015.svg.webp` | **Feito** (sem commit): 2012–2016, grid da Formação passou a 3 colunas |
| N11 | **Experiências novas:** IBGE (agente de pesquisa), Dow Corning (estagiário em eletrotécnica, manutenção elétrica), Dow (oficial de manutenção). Os portfólios antigos citam também um **estágio na Eletrobras/Eletronorte** | Trajetória + faixa "Onde atuei" | Prontos em `public/assets/logos/org/`: dow.svg (letras recortadas), ibge.svg, eletrobras.png (CC BY-SA 3.0) | **Feito** (sem commit): IBGE 2017–2018 (PNAD Contínua, Tucuruí), Dow Corning mai/2015–fev/2016 (Breu Branco), Eletrobras mar/2014–jan/2015 (almoxarifado UHE Tucuruí); LACUT com descrição completa; faixa com 12 marcas. **Pendente: Dow, oficial de manutenção** ("2023–2024" coincide com o estágio na Piracanjuba, set/2023–mar/2024, em GO) |
| N12 | **Stack ampliada**: OpenAI, Gemini, Cursor e VAPI em IA; **PX4** e **Aeropêndulo (TCC)** em Sistemas físicos. Quadricóptero completo com PX4, telemetria e rádio, testado em voo | Stack (Foco) + texto do pilar Sistemas físicos | OpenAI: Lobe Icons (MIT). Gemini e Cursor: Simple Icons. VAPI: vapi.ai. PX4: repositório PX4-Autopilot (letras recortadas). Aeropêndulo: `lab-virtual/brand/svg/icone-mono.svg` | **Feito** (sem commit). Possível card de projeto do quadricóptero: faltam fotos ou vídeo do voo |
| N13 | **Quadricóptero com PX4** como card em Projetos (REC.05), com o vídeo do repo `Quadrotor` (GIF de 20 MB convertido em WebP de 600 KB). **Cards de Projetos e Pesquisa**: os diagramas de pipeline, ilegíveis a 220 px, deram lugar a ilustração do problema + faixa de logos (`components/ProjectVisual.tsx`). **Logo da AFOSR** (enviado pelo usuário) na faixa e na Pesquisa | Projetos, Pesquisa, faixa | `public/assets/quadrotor.webp`, `public/assets/logos/org/afosr.webp` | **Feito** (sem commit) |
| N9 | **Voluntariado: Comitê AlumniONE BR**, Oracle Next Education, ago/2024 – mai/2025 (10 meses), Ciência e tecnologia. Iniciativas para fortalecer a comunidade de egressos do ONE (formação front e back-end de 6 meses, mais de 500 h) | Trajetória (novo tipo "voluntariado") ou Comunidade | Selo salvo: `public/assets/logos/alumnione-br.webp` | Pronto para entrar |

> Os links de imagem do LinkedIn expiram em 12 e 18/nov/2026. As cópias locais acima são as que valem.

### 5.1 Análise: Synapsys fora do destaque e projeto substituto

**Onde o Synapsys aparece hoje**
- §03 é uma seção inteira só dele (com item no menu e no índice lateral), logo depois de Projetos: badges de versão, 501 testes, 100% de cobertura e 3 GIFs do quadricóptero.
- Um parágrafo do Sobre ("Open source: autor do Synapsys…").
- A release do Synapsys no snapshot do GitHub (`scripts/github-stats.mjs`).

**Proposta**
- A seção §03 deixa de existir. O Synapsys vira um card comum em Projetos, junto com animaflow e lab-virtual, sem `featured`, numa linha "Engenharia e open source".
- O Sobre troca o parágrafo do Synapsys pelo de Linux, cloud e ferramentas (N3) e cita o Synapsys numa frase só.
- O menu perde um item, o que também abre espaço para "Artigos".

**Candidatos a destaque, conferidos no GitHub**

| Repositório | O que é | Aderência a ML/MLOps/AI Eng | Maturidade | Público? |
|---|---|---|---|---|
| `tractian-smarttrac-anomaly-detection` | Detecção de anomalias em vibração (trilha ML Engineering). FastAPI com 3 réplicas atrás de nginx, modelos no MinIO (S3), estado no Redis, Docker, teste de carga. F1 0,864, precisão 82,6%, recall 86,4%. 91 testes, 84 passando | **Alta**: ML em produção, escala horizontal, IoT industrial (liga com Otensor e com a pesquisa de detecção de falhas) | Completo | Não (privado) |
| `glassllm` | Transformer do zero em NumPy, com rastreio de cada passo e site interativo | Alta (LLM por dentro) | **Só design**: 2 commits, sem código | Sim |
| `youfy`, `oseias_desafio_elite_dev_ia` | Já estão em destaque | — | — | Sim |

**Como ficou o repositório público** (`vibration-anomaly-detection`, branch padrão `develop`)
- Sem enunciado, dados, rótulos nem a suíte oficial da Tractian. Nome neutro, sem "SmartTrac".
- 27 testes próprios com sinais sintéticos (modelo, motor de alertas, stores, contrato da API, reinício, réplicas, concorrência).
- **Bug corrigido:** a versão entregue no desafio devolvia 404 quando o `/fit` e o `/predict` caíam em réplicas diferentes, e cada réplica tinha seu próprio estado de alerta. Agora o estado vem do Redis a cada predição e o modelo é recarregado do S3 quando falta ou foi re-treinado.
- MinIO trocado por SeaweedFS (S3), porque as imagens do MinIO saíram do Docker Hub e do quay.io.
- Validado com `docker compose` (nginx + 3 réplicas + Redis + S3), inclusive o reinício das réplicas.

**Recomendação original:** colocar o SmartTrac em destaque, com um nome neutro ("Detecção de anomalias em máquinas rotativas"). Antes, decidir D5. O glassllm entra depois, quando a fase 1 estiver pronta.

---

## 6. Registro

- 2026-11-05 · Seção Artigos (Medium) criada localmente, sem commit.
- 2026-11-05 · Levantamento de logos e propostas P1–P7.
- 2026-11-05 · Projetos: problema/solução/impacto recolhidos por padrão, com resumo (`summary`) visível; links e tags sempre visíveis. Cards de ~1.050 px para ~700 px.
- 2026-11-05 · N13: card do quadricóptero; ilustrações nos cards de Projetos e Pesquisa; logo da AFOSR.
- 2026-11-05 · N12: Stack com 6 marcas novas; pilar Sistemas físicos cita o quadricóptero PX4.
- 2026-11-05 · N11: três experiências novas e LACUT atualizado. Dow (oficial de manutenção) aguarda a data.
- 2026-11-05 · Fase 1 dos logos (P1–P3) feita, sem commit. `components/brands.ts` (51 marcas), `BrandMark.tsx`, `BrandSections.tsx`; arquivos em `public/assets/logos/{tech,org}`. AlumniONE (N9) na Trajetória.
- 2026-11-05 · Site: N1, N2, N10 e o parágrafo de N3 aplicados; CBA "aceito" → "apresentado"; "Artigos" na barra superior. Sem commit.
- 2026-11-05 · Repo `vibration-anomaly-detection` publicado (N2). Recebido N10 (IFPA).
- 2026-11-05 · Recebidos N1–N9. Imagens do LinkedIn salvas localmente (sem commit). Análise do substituto do Synapsys feita no GitHub.
