//FRAMEWORKS
  const express = require('express')
  const handle = require('express-handlebars')
  const bodyParser = require('body-parser')
  const path = require('path')
               require('dotenv').config();
  const poop = require('puppeteer')

//SQL QUERIES
  const userQuery = require('./sql/userQueries')
  const ticketQuery = require('./sql/ticketQueries')

//MODELS
  const User = require('./models/User')
  const Address = require('./models/Address')
  const Vehicle = require('./models/Vehicle')
  const Item = require('./models/Item')
  const Ticket = require('./models/Ticket')
  const ItemTicket = require('./models/ItemTicket')

//DATABASE
  const db = require('./models/db')

//CONFIGS
  //EXPRESS
    const app = express()
    app.use(express.json())

  //HANDLEBARS
    app.engine('handlebars', handle({defaultLayouts : 'main',
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      }
    }))
    app.set('view engine', 'handlebars') 

  //BODY-PARSER
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

  //STATIC
    app.use(express.static(path.join(__dirname,'public')))

//ROTAS
  // GET
    //PRINCIPAL
      app.get('/', async(req,res)=>{
        const title = process.env.INDEX_NAME
        // res.render('index', { showHeader: true, titleName: title  })
        res.redirect('/usuariosCadastrados')
      })
    
    //CADASTRO USUÁRIO
      app.get('/cadastro', async(req,res)=>{
        res.render('cadastro', { showHeader: true })
      })

    //EXIBIR LISTA DE USUÁRIOS CADASTRADOS
      app.get('/usuariosCadastrados', async(req,res)=>{
        const result = await db.query(userQuery.SELECT_USERDATA_ADDRESS())
        res.render('usuariosCadastrados', { dados:result[0], showHeader: true })
      })

    //PAGINA ESPECIFICA DE CADA CLIENTE
      app.get('/cadum/:id', async(req,res)=>{
        const userId = req.params.id
          const result = await db.query(userQuery.SELECT_USERDATA_ADDRESS_ID(userId))
          const ticket = await db.query(userQuery.SELECT_TICKET_BY_USERID(userId)) || null
        const idVeiculo = ticket[0][0]?.idVeiculo || null
          const vehicle = await db.query(userQuery.SELECT_VEHICLES_BY_USERID(idVeiculo))
        res.render('cadum', { dados:result[0], tickets: ticket[0], vehicles: vehicle[0], showHeader: true })
      })

    // PAGINA CADASTRAR VEICULO NO USUARIO
      app.get('/cadastrarVeiculo/:id', async(req,res)=>{
        const result = await db.query(userQuery.SELECT_USERDATA_ADDRESS_ID(req.params.id))
        const vehicle = await db.query(userQuery.SELECT_VEHICLES_BY_USERID(req.params.id))
        res.render('cadastroVeiculos', { dados:result[0], vehicles: vehicle[0], showHeader: true })
      })

    //CRIAR FICHA
      app.get('/criarFicha/:id', async(req,res)=>{
        const resultUser = await db.query(userQuery.SELECT_USERDATA_ADDRESS_ID(req.params.id))
        const resultVehicle = await db.query(userQuery.SELECT_VEHICLES_BY_USERID(req.params.id))
        res.render('criarFicha', { vehicle:resultVehicle[0], user:resultUser[0], showHeader: true })
      })

    //VISUALIZAR FICHA 
      app.get('/ficha/:id', async(req,res)=>{
        const ticketId = req.params.id
        const ticketResult  = await db.query(ticketQuery.SELECT_TICKET_BY_ID_WITH_USER_AND_CAR(ticketId))
        const itemsTicket = await db.query(ticketQuery.SELECT_ITEMSTICKET_BY_TICKETID(ticketId))
        res.render('ticket', { ticket: ticketResult[0], items: itemsTicket[0],showHeader: true })
      })

    //MONTAR PDF
      app.get('/gerarPdf/:id', async(req,res)=>{
        const ticketId = req.params.id
        const ticketResult  = await db.query(ticketQuery.SELECT_TICKET_BY_ID_WITH_USER_AND_CAR(ticketId))
        const itemsTicket = await db.query(ticketQuery.SELECT_ITEMSTICKET_BY_TICKETID(ticketId))
        res.render('pdf', { ticket: ticketResult[0], items: itemsTicket[0] })
      })

    //GERAR PDF
      app.get('/pdf/:id', async(req,res)=>{
        const browser = await poop.launch()
        const page = await browser.newPage()
      
        await page.goto(`${process.env.BASE_URL}${process.env.PORT}/gerarPdf/${req.params.id}`), {
          waitUntil: 'networkidle0'
        }

        const pdf = await page.pdf({
          printBackground: true,
          format: 'Letter',
          margin:{
            top: '10px',
            bottom: '10px',
            left: '8px',
            right: '8px'
          }
        });

      await browser.close()

      res.contentType('application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename=arquivo.pdf')
      res.contentType('application/pdf')

      res.send(pdf)
      })
    
//BANCO DE DADOS
  // POST
    //USUARIO
      app.post('/cadastrar', async(req,res)=>{
          const newAddress = await Address.create({
            cep: req.body.cep,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf
          })
          await User.create({
            nome: req.body.nome,
            telefone: req.body.telefone,
            idEndereco: newAddress.id
          }).then(()=>{
              return res.status(200).redirect('/usuariosCadastrados')
          }).catch((err)=>{
            return res.status(400).json({
              erro: true,
              mensagem: "Usuário não cadastrado " + err
            })
          })
      })
    
    //VEICULO
      app.post('/cadastrarVeiculos/:idUser', async(req,res)=>{
        await Vehicle.create({
          marca: req.body.marca,
          modelo: req.body.modelo,
          ano: req.body.ano,
          placa: req.body.placa,
          anotacoes: req.body.anotacoes,
          idUsuario: req.params.idUser
        }).then(()=>{
          return res.status(200).redirect(`/cadum/${req.params.idUser}`)
        }).catch((err)=> {
          return res.status(400).json({
          erro: true,
          mensagem: "Veiculo não cadastrado " + err
          })
        })
      })
    
    //CRIAR FICHA
      app.post('/criarFicha', async(req,res)=>{
        await Ticket.create({
          status: req.body.status,
          garantia: req.body.garantia,
          valorFinal: 0,
          idUsuario: req.body.idUsuario,
          idVeiculo: req.body.idVeiculo
        }).then(()=>{
          return res.status(200).redirect(`/cadum/${req.body.idUsuario}`)
        }).catch((err)=> {
          return res.status(400).json({
          erro: true,
          mensagem: "Não foi possível criar a ficha " + err
          })
        })
      })
    
    //ADICIONAR PEÇA NA LISTA
      app.post('/addPeca/:idTicket', async(req,res)=>{
        const totalItem = await req.body.valorUn * req.body.quantidade
        const item = await Item.create({
          nome: req.body.nome
        })
        await ItemTicket.create({
          valorUn: req.body.valorUn,
          quantidade: req.body.quantidade,
          valorTot: totalItem,
          idTicket: req.params.idTicket,
          idItem: item.id
        }).then(()=>{
          res.redirect(`/save/${req.params.idTicket}/${totalItem}`)
        }).catch((err)=>{
          res.status(404).send(`Erro ao cadastrar item ${err}`)
        })
      })

  //UPDATE
    //SALVAR VALOR DO TICKET
      app.get('/save/:idTicket/:value', async(req,res)=>{
        const ticket = await db.query(ticketQuery.SELECT_TICKET_BY_ID(req.params.idTicket))
        const value = parseFloat(ticket[0][0].valorFinal) + parseFloat(req.params.value)

        await db.query(ticketQuery.UPDATE_TICKET_VALUE_BY_IDTICKET(req.params.idTicket, value))

        res.redirect(`/ficha/${req.params.idTicket}`)
      })

  //DELETE
    //ITEM DA FICHA
        app.get('/removerItem/:idTicket/:valor/:idItemTicket', async(req,res)=>{
          const valor = parseFloat(`-${req.params.valor}`)
          await db.query(ticketQuery.DELETE_ITEMSTICKET_BY_ITEMTICKETID(req.params.idItemTicket))
          res.redirect(`/save/${req.params.idTicket}/${valor}`)
        })

//SERVIDOR
  app.listen(process.env.PORT,()=>{ 
    console.log(`Servidor iniciado em: http://localhost:${process.env.PORT}`)
  }) 