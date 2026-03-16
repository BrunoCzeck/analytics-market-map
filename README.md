# Driva - Analise de Mercado

## Produção

- **UI:** 
Link Produção:
https://analytics-market-map-ui.vercel.app/

## Repositorio

https://github.com/BrunoCzeck/analytics-market-map.git

---

## Setup

### Pré-requisitos
- Node.js 20+
- npm ou yarn
- Docker e Docker Compose (para rodar via container)

### Instalação local

**BFF:**
```bash
cd bff
npm install
```

**UI:**
```bash
cd ui
npm install
```

---

## Uso

### Desenvolvimento local

**BFF** (porta 3001):
```bash
cd bff
npm run dev
```

**UI** (porta 3000):
```bash
cd ui
npm run dev
```

Acesse `http://localhost:3000`.

### Docker Compose

Sobe BFF e UI juntos com um único comando:

```bash
docker compose up --build
```

- UI: `http://localhost:3000`
- BFF: `http://localhost:3001`

Para parar:
```bash
docker compose down
```

### Build para produção

```bash
# BFF
cd bff && npm run build && npm start

# UI
cd ui && npm run build
```

---

## Camadas de dados

O mapa exibe 5 camadas independentes, ativáveis pelo painel lateral:

| Camada | Cor | Descrição |
|---|---|---|
| **Filiais** | Verde | Unidades ativas da empresa com localização geográfica |
| **Potencial de mercado** | Azul | Score por estado (0–100) baseado em PIB per capita, renda média e população |
| **Demanda estimada** | Âmbar | Bolhas proporcionais à demanda projetada por estado |
| **Zonas de expansão** | Roxo | Estados estratégicos para abertura de novas unidades |
| **Concorrentes** | Vermelho | Localização de concorrentes mapeados (Brand A, B e C) |

Os dados são filtráveis por **região** (Norte, Nordeste, Centro-Oeste, Sudeste, Sul), **período** e **busca textual** por nome, cidade ou estado.

---

## Decisões técnicas e trade-offs ##

### Clean Architecture no BFF
O BFF foi estruturado em camadas (Domain → Application → Infrastructure → HTTP) para isolar regras de negócio da implementação. Facilitando também na troca dos dados mockados por uma base real.

### Dados mock em memória
Todos os dados (27 estados, filiais, concorrentes) são servidos de arrays in-memory. A escolha elimina dependência de banco de dados externo. Os repositórios implementam interfaces, então a migração para  banco exige apenas nova implementação da camada de infraestrutura.

### Fastify no lugar de Express
Fastify oferece melhor performance e validação de schema nativa. O trade-off é um ecossistema menor que Express, mas suficiente para um BFF focado em leitura de dados.

### Context API
O estado global da UI (filtros e camadas) usa Context API nativa do React por ser simples e sem dependências extras.

### Proxy no Vite
A UI faz chamadas para `/api` e o Vite redireciona para `http://localhost:3001` em desenvolvimento. Isso evita problemas de CORS localmente e mantém a mesma URL de chamada entre dev e produção.

### Deploy separado (UI e BFF na Vercel)
Cada serviço tem seu próprio `vercel.json`, permitindo deploys independentes.

