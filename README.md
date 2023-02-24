# Funcionalidades
  - Cadastrar usuário com endereço;
  - Cadastrar objeto do usuário;
  - Criar uma ficha de manutenção para o objeto;
  - Adicionar itens a ficha;
  - Calcula automáticamente o valor final;
  - Gerar a ficha em PDF, e fazer o download automaticamente
  
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
  - Node | https://nodejs.org/en/docs/
  - Express | https://expressjs.com/pt-br/4x/api.html
  - Sequelize | https://sequelize.org/docs/v6/getting-started/
  - Migrations | https://sequelize.org/docs/v6/other-topics/migrations/
  - BodyParser | http://expressjs.com/en/resources/middleware/body-parser.html
  - HandleBars | https://handlebarsjs.com/api-reference/
  - DOTENV | https://www.dotenv.org/docs/
  - Gerar PDF (puppeteer) | https://pptr.dev
  
## Banco de dados 
  - SQL

 ### V2
  ## Tecnologias a serem implementadas:
  - React
