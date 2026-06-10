# Setup Guide - Tree Watering Monitoring App

## Pré-requisitos

- Node.js 14+ (https://nodejs.org)
- PostgreSQL 12+ (https://www.postgresql.org)
- Git

## Instalação Local

### 1. Clone o Repositório

```bash
git clone https://github.com/francays05/-tree-watering-app.git
cd -tree-watering-app
```

### 2. Configure o Banco de Dados

```bash
# Conecte ao PostgreSQL
psql -U postgres

# Execute os scripts de criação
\i database/schema.sql
```

### 3. Configure o Backend

```bash
cd backend
npm install

# Crie um arquivo .env
cp .env.example .env

# Edite .env com suas credenciais de banco de dados

# Inicie o servidor
npm run dev
```

O backend estará disponível em `http://localhost:5000`

### 4. Configure o Frontend

```bash
cd ../frontend
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000`

## Usuários de Teste

**Username:** contractor1
**Password:** (use a hash no banco de dados)

**Username:** contractor2
**Password:** (use a hash no banco de dados)

## Acessar via QR Code

O QR Code deve apontar para:
```
https://treewatering.app/tree/LF-T0001
```

Quando escaneado, automaticamente redireciona para o detalhe da árvore.

## Deploy em Produção

### Usando Docker

```bash
# Build das imagens
docker-compose build

# Inicie os serviços
docker-compose up -d
```

### Variáveis de Ambiente em Produção

- `NODE_ENV=production`
- `DB_HOST` = seu servidor PostgreSQL
- `DB_USER` = usuário do BD
- `DB_PASSWORD` = senha segura
- `JWT_SECRET` = chave secreta forte
- `FRONTEND_URL` = URL da aplicação