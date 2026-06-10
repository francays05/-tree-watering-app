# Power BI Integration Guide

## Overview

Toda a estrutura de dados foi desenhada para ser facilmente exportada e analisada no Power BI.

## Relações de Dados

```
Companies (1) ----> (N) Users
                -----> (N) Watering Visits

Trees (1) --------> (N) Watering Visits

Users (1) --------> (N) Watering Visits
```

## Chaves Primárias e Estrangeiras

### Companies
- PK: `id`

### Users
- PK: `id`
- FK: `company_id` -> Companies.id

### Trees
- PK: `id`
- UK: `tree_id` (TreeID único)

### Watering Visits
- PK: `id`
- FK: `tree_id` -> Trees.id
- FK: `user_id` -> Users.id
- FK: `company_id` -> Companies.id

## Exportar Dados para Power BI

### Método 1: Conexão Direta PostgreSQL

1. Abra Power BI Desktop
2. Clique em "Get Data" → "Database" → "PostgreSQL Database"
3. Configure:
   - **Server:** seu_servidor_postgres
   - **Database:** tree_watering_db
   - **Username:** seu_usuario
   - **Password:** sua_senha

4. Selecione as tabelas:
   - companies
   - users
   - trees
   - watering_visits

5. Clique "Load"

### Método 2: Exportar via API

Crie um script para exportar dados em CSV:

```sql
-- Export Trees
COPY (
  SELECT * FROM trees
) TO STDOUT WITH CSV HEADER;

-- Export Watering Visits
COPY (
  SELECT * FROM watering_visits
) TO STDOUT WITH CSV HEADER;

-- Export Users
COPY (
  SELECT * FROM users
) TO STDOUT WITH CSV HEADER;

-- Export Companies
COPY (
  SELECT * FROM companies
) TO STDOUT WITH CSV HEADER;
```

## Modelos Recomendados no Power BI

### 1. Resumo Executivo
- KPIs: Total de Árvores, Visitas Completas, Taxa de Conformidade
- Gráficos: Visitas por Ward, Tendência Temporal

### 2. Análise por Ward
- Distribuição de árvores
- Performance de rega
- Taxa de conclusão

### 3. Performance da Empresa
- Visitas realizadas por empresa
- Produtividade do usuário
- Qualidade das avaliações

### 4. Análise de Espécies
- Performance por espécie
- Condição média
- Taxa de sobrevivência

### 5. Análise Temporal
- Tendência de visitas
- Previsão de conformidade
- Comparação período a período

## Dimensões para Análise

- **Temporal:** visit_datetime, planting_date
- **Geográfica:** ward, latitude, longitude
- **Organizacional:** company_id, user_id
- **Qualitativa:** condition, species, status

## Fórmulas DAX úteis

```dax
-- Taxa de Conformidade
Compliance Rate = 
DIVIDE(
  CALCULATE(COUNTA(WateringVisits[id])),
  CALCULATE(SUM(Trees[required_visits]))
)

-- Árvores Pendentes
Pending Trees = 
CALCULATEVALUE(COUNTA(Trees[id])) - 
CALCULATEVALUE(COUNTA(DISTINCT WateringVisits[tree_id]))

-- Média de Visitas por Árvore
Avg Visits per Tree = 
DIVIDE(
  CALCULATE(COUNTA(WateringVisits[id])),
  CALCULATE(COUNTA(DISTINCT WateringVisits[tree_id]))
)
```

## Segurança de Dados

- Implemente Row-Level Security (RLS) para filtrar dados por empresa
- Use credenciais de banco de dados com permissões limitadas
- Revise e limpe dados sensíveis antes da análise