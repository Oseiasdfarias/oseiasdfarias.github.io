# Solução de Erro de Autenticação

O erro `Authentication failed` e `vscode-git...sock` acontece porque o terminal perdeu a conexão com as credenciais do seu GitHub no VS Code.

## Como resolver (Passo a Passo)

Abra o terminal e execute estes comandos na ordem:

### 1. Limpar variáveis de ambiente quebradas
Isso remove a dependência do VS Code que está falhando:
```bash
unset GIT_ASKPASS
```

### 2. Autenticar novamente via GitHub CLI
Essa é a forma mais garantida. Execute e siga as instruções na tela (escolha **HTTPS** e **Browser**):
```bash
gh auth login
```

### 3. Configurar o Git para usar a autenticação do CLI
Isso garante que o comando `npm run deploy` consiga usar suas credenciais:
```bash
gh auth setup-git
```

### 4. Tentar o Deploy novamente
```bash
npm run deploy
```

---
**Nota:** Se o `npm run deploy` continuar falhando, você pode tentar fazer o push manual da pasta dist:
1. `npm run build`
2. `cd dist`
3. `git init`
4. `git checkout -b gh-pages`
5. `git add .`
6. `git commit -m "deploy"`
7. `git remote add origin https://github.com/Oseiasdfarias/oseiasdfarias.github.io.git`
8. `git push -f origin gh-pages`
