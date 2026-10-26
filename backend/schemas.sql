-- Conectado em vetlab_db
CREATE SCHEMA IF NOT EXISTS auth;      -- tabelas do ASP.NET Identity
CREATE SCHEMA IF NOT EXISTS produto;   -- tabelas do negócio

ALTER DATABASE vetlab_db SET search_path TO public;

-- Índices para performance (aplicar após migrations)
CREATE INDEX IF NOT EXISTS idx_solicitacao_status ON produto.solicitacoes_exame (status);
CREATE INDEX IF NOT EXISTS idx_solicitacao_veterinario ON produto.solicitacoes_exame (crmv);
CREATE INDEX IF NOT EXISTS idx_solicitacao_data ON produto.solicitacoes_exame (data_criacao DESC);
