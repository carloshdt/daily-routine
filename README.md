# Daily Routine - Trello Like App

Aplicativo web para gerenciar sua rotina diária com estilo Trello. Organize suas tarefas por dias da semana, defina metas e acompanhe seu progresso.

## Funcionalidades

- 📅 **Colunas por dia da semana**: Organize suas tarefas em colunas para cada dia
- ✅ **Marcar como feito**: Clique no card para marcar/desmarcar como feito no dia
- 🎯 **Metas personalizadas**: Defina metas para cada tarefa (ex: 200 vezes)
- 📊 **Contador persistente**: Acompanhe quantas vezes cada tarefa foi feita (nunca reseta)
- 🔄 **Reset semanal**: Botão para resetar todos os "done" da semana (mantém o contador)
- 💾 **Persistência local**: Seus dados são salvos automaticamente no navegador

## Como usar

1. **Adicionar tarefa**: Use o formulário no topo para adicionar uma nova tarefa
   - Digite o nome da tarefa
   - (Opcional) Defina uma meta numérica
   - Clique em "Adicionar"

2. **Marcar como feito**: Clique em qualquer card na coluna do dia correspondente

3. **Editar meta**: Clique no contador do card (ex: "1/200") para editar a meta

4. **Resetar semana**: Use o botão "Resetar Semana" para limpar todos os "done" da semana atual (o contador não é resetado)

## Desenvolvimento

### Instalação

```bash
npm install
```

### Executar localmente

```bash
npm run dev
```

### Build para produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

## Deploy no GitHub Pages

O projeto está configurado para deploy automático via GitHub Actions. Quando você fizer push para a branch `main`, o workflow irá:

1. Buildar o projeto
2. Fazer deploy automaticamente para o GitHub Pages

Certifique-se de ativar o GitHub Pages nas configurações do repositório:
- Settings → Pages
- Source: GitHub Actions

## Tecnologias

- React 18
- TypeScript
- Vite
- CSS3

## Estrutura do Projeto

```
daily-routine/
├── src/
│   ├── components/
│   │   ├── Card.tsx          # Componente de card de tarefa
│   │   ├── Column.tsx        # Componente de coluna (dia)
│   │   └── AddTask.tsx       # Formulário para adicionar tarefa
│   ├── utils/
│   │   └── storage.ts        # Funções de persistência (localStorage)
│   ├── types.ts              # Tipos TypeScript
│   ├── App.tsx               # Componente principal
│   ├── App.css               # Estilos
│   └── main.tsx              # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── vite.config.ts            # Configuração do Vite
└── package.json
```
