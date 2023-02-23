# Funcionalidades
  - Cadastrar usuário com endereço;
  - Cadastrar objeto do usuário;
  - Criar uma ficha de manutenção para o objeto;
  - Adicionar itens a ficha;
  - Calcula automáticamente o valor final;
  - Gera a ficha em PDF, e faz o download automaticamente
  
# Para devs
  ## Comandos 
   ### Para instalar os pacotes 
    npm install
   ### Para criar o banco de dados
    npx sequelize-cli db:create
   ### Para utilizar as migrations no banco
    npx sequelize-cli db:migrate
   ### Para executar em modo de desenvolvedor 
    npm run dev
   ### Para auto commit 
    npm run commit 
   ### Para auto commit e auto play
    npm run commitPlay
   ### Para atualizar 
    npm run atualizar 
  
## Tecnologias utilizadas
 ### V1  
  - Node
  - Express
  - Sequelize   
  - Migrations
  - BodyParser  
  - HandleBars
  - DOTENV
  - Gerar PDF (puppeteer)
  
## Banco de dados 
  - SQL

 ### V2
  ## Tecnologias a serem implementadas:
  - React
