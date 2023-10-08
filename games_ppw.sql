
-- Cria a tabela `categoria`
CREATE TABLE categoria (
  id serial not null primary key,
  nome VARCHAR(255) NOT NULL
);

-- Cria a tabela `desenvolvimento`
CREATE TABLE desenvolvimento (
  id serial not null primary key,
  nome VARCHAR(255) NOT NULL
);

-- Cria a tabela `plataforma`
CREATE TABLE plataforma (
  id serial not null primary key,
  nome VARCHAR(255) NOT NULL
);


-- Cria a tabela `games`
CREATE TABLE games (
  id serial not null primary key,
  nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  plataforma_id INT NOT NULL,
  categoria_id INT NOT NULL,
  desenvolvimento_id INT NOT NULL,

  FOREIGN KEY (plataforma_id) REFERENCES plataforma (id),
  FOREIGN KEY (categoria_id) REFERENCES categoria (id),
  FOREIGN KEY (desenvolvimento_id) REFERENCES desenvolvimento (id)
);

-- Cria a tabela `jogador`
CREATE TABLE jogador (
  id serial not null primary key,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  data_cadastro DATE DEFAULT CURRENT_DATE
);


-- Popula a tabela `categoria`
INSERT INTO categoria (nome) VALUES ('Ação'), ('Aventura'), ('RPG'), ('Estratégia'), ('Simulação'), ('Casual'), ('Outros');

-- Popula a tabela `desenvolvimento`
INSERT INTO desenvolvimento (nome) VALUES ('Ubisoft'), ('Sony Interactive Entertainment'), ('Microsoft Studios'), ('Nintendo'), ('Square Enix'), ('Bethesda Softworks'), ('EA Games');

-- Popula a tabela `plataforma`
INSERT INTO plataforma (nome) VALUES ('PC'), ('PlayStation 4'), ('Xbox One'), ('Nintendo Switch'), ('iOS'), ('Android');


INSERT INTO games (nome, descricao, plataforma_id, categoria_id, desenvolvimento_id)
VALUES ('Far Cry 3', 'Far Cry 3 é um jogo eletrônico de 2012 dos gêneros tiro em primeira pessoa e mundo aberto.', 1, 1, 1);

INSERT INTO jogador (nome, email, senha)
VALUES ('Manuela', 'manuela@ppw.com', '1234567');
