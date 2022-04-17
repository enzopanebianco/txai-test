# txai-test
teste para a empresa Txai

#Banco de Dados
- Para o banco de dados, escolhi o postgres (está hospedado no Heroku) por já ter trabalhado com ele e é fácil conectar à um servidor NodeJS.

## Para testar
(API)
vá a pasta server e de um _npm install__
depois execute o __npm start__ ,estará rodando na porta 3333

(Frontend)
vá a pasta frontend _npm install__
depois execute o __npm start__, estará rodando na porta 3000

TABELAS

Usuários
- ID
- Name
- Password
- Office

Produtos
- Name
- Price
- Register_dt
- Quantity
- Owner_id(FK de usuários)

#API Node JS

ENDPOINTS

ADM
- Get Usuários:
- Post Usuários:
- Put Usuários:
- Delete Usuários:

- Login: (name,password)

- Get Produtos
- Post Produtos:
- Put Produtos:
- Delete Produtos:

#FRONTEND

PAGÍNAS
- Login
- Cadastro
- Usuário com o crud de produtos
- Dashboard do adm


