# Tree Watering Monitoring App

Aplicativo de Monitoramento de Rega de Árvores para o London Borough of Merton - Programa 1000 Árvores

## Características Principais

✅ **Login de Usuários** - Contratantes fazem login com usuário e senha
✅ **Gerenciamento de Empresas** - Usuários pertencem a empresas contratantes
✅ **Registros de Árvores** - Rastreamento completo de cada árvore plantada
✅ **Visitas de Rega** - Registro de cada visita com fotos de evidência
✅ **Códigos QR** - Acesso rápido às árvores via QR Code
✅ **Dashboard Analítico** - Métricas e gráficos de desempenho
✅ **Integração Power BI** - Exportação de dados para análise avançada

## Estrutura do Projeto

```
tree-watering-app/
├── backend/              # API REST (Node.js + Express)
├── frontend/             # Interface Web (React)
├── database/             # Scripts de banco de dados
├── docs/                 # Documentação
└── README.md
```

## Como Começar

### Requisitos
- Node.js (v14+)
- npm ou yarn
- PostgreSQL (v12+)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/francays05/-tree-watering-app.git
cd -tree-watering-app
```

2. **Configure o Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

3. **Configure o Frontend**
```bash
cd ../frontend
npm install
npm start
```

4. **Configure o Banco de Dados**
```bash
cd ../database
# Execute os scripts SQL no PostgreSQL
```

## Documentação

- [API Documentation](./docs/API.md)
- [Database Schema](./database/schema.sql)
- [Setup Guide](./docs/SETUP.md)
- [Power BI Integration](./docs/POWERBI.md)

## Licença

MIT License - Desenvolvido para o London Borough of Merton