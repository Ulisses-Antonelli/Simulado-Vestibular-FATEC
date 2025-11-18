# Estrutura do Projeto

## 📁 Organização de Pastas

```
src/
├── components/          # Componentes React
│   ├── Question.jsx     # Componente de questão individual
│   ├── Question.css     # Estilos do componente Question
│   ├── GabaritoPanel.jsx # Painel de gabarito
│   ├── GabaritoPanel.css # Estilos do painel de gabarito
│   ├── Statistics.jsx    # Painel de estatísticas
│   ├── Statistics.css    # Estilos do painel de estatísticas
│   ├── Filters.jsx       # Componente de filtros
│   └── Filters.css       # Estilos dos filtros
│
├── hooks/               # React Hooks customizados
│   └── useLocalStorage.js # Hook para gerenciar localStorage
│
├── styles/              # Estilos globais
│   └── App.css          # Estilos principais da aplicação
│
├── data/                # Dados e configurações
│   └── fatec-app-config.json # Configuração das provas
│
├── App.js               # Componente principal da aplicação
└── index.js             # Ponto de entrada da aplicação
```

## 🎯 Convenções

### Componentes
- Cada componente possui seu próprio arquivo `.jsx`
- Os estilos específicos de cada componente ficam no mesmo diretório
- Importar componentes: `import ComponentName from './components/ComponentName'`

### Hooks
- Hooks customizados seguem a convenção `use[NomeDoHook]`
- Armazenados na pasta `hooks/`
- Importar hooks: `import { useHookName } from './hooks/useHookName'`

### Estilos
- Estilos globais na pasta `styles/`
- Estilos específicos de componentes junto com o componente
- CSS puro sem pré-processadores

### Dados
- Arquivos de configuração em `data/`
- Metadados das questões carregados dinamicamente de `/public/questions/`

## 🔄 Fluxo de Dados

1. **Metadados das Questões**: Carregados via `fetch` do arquivo `questions-metadata.json`
2. **Configuração da Prova**: Importada de `data/fatec-app-config.json`
3. **Estado Local**: Gerenciado via hook `useLocalStorage` para persistência
4. **Gabarito**: Construído dinamicamente a partir dos metadados das questões
