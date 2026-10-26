-- Executado automaticamente pelo docker-compose no primeiro start do volume
-- (montado em /docker-entrypoint-initdb.d). Para um banco já existente, rode manualmente:
--   docker compose exec -T postgres psql -U vetlab -d vetlab_db -f /docker-entrypoint-initdb.d/00-schemas.sql

CREATE SCHEMA IF NOT EXISTS auth;      -- tabelas do ASP.NET Identity
CREATE SCHEMA IF NOT EXISTS produto;   -- tabelas do negócio

ALTER DATABASE vetlab_db SET search_path TO public;

-- Os índices ficam em indices.sql — eles dependem das tabelas criadas pelas migrations.
