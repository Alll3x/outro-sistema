//FRAMEWORKS
  const express = require('express')
  const handle = require('express-handlebars')
  const bodyParser = require('body-parser')
  const path = require('path')
               require('dotenv').config();

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
    }}))
    app.set('view engine', 'handlebars') 

  //BODY-PARSER
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

  //STATIC
    app.use(express.static(path.join(__dirname,'public')))

//ROTAS
  //PRINCIPAL
  app.get('/', async(req, res)=>{
      res.render('index')
  })
  
  //CADASTRO USUÁRIO
  app.get('/cadastro', async(req, res)=>{
     res.render('cadastro')
})

  //EXIBIR LISTA DE USUÁRIOS CADASTRADOS
  app.get('/usuariosCadastrados', async(req, res)=>{
    const result = await db.query(userQuery.SELECT_USERDATA_ADDRESS())
    res.render('usuariosCadastrados', { dados:result[0] })
  })

  //PAGINA ESPECIFICA DE CADA CLIENTE
  app.get('/cadum/:id', async(req, res)=>{
    const userId = req.params.id
      const result = await db.query(userQuery.SELECT_USERDATA_ADDRESS_ID(userId))
      const ticket = await db.query(userQuery.SELECT_TICKET_BY_USERID(userId))
    const idVeiculo = ticket[0][0]?.idVeiculo || null
      const vehicle = await db.query(userQuery.SELECT_VEHICLES_BY_USERID(idVeiculo))
    res.render('cadum', { dados:result[0], tickets: ticket[0], vehicles: vehicle[0] })
      
  })

  // PAGINA CADASTRAR VEICULO NO USUARIO
  app.get('/cadastrarVeiculo/:id', async(req, res)=>{
    const result = await db.query(userQuery.SELECT_USERDATA_ADDRESS_ID(req.params.id))
    const vehicle = await db.query(userQuery.SELECT_VEHICLES_BY_USERID(req.params.id))
    res.render('cadastroVeiculos', { dados:result[0], vehicles: vehicle[0] })

  })

  //CRIAR FICHA
  app.get('/criarFicha/:id', async(req,res)=>{
    const resultUser = await db.query(userQuery.SELECT_USERDATA_ADDRESS_ID(req.params.id))
    const resultVehicle = await db.query(userQuery.SELECT_VEHICLES_BY_USERID(req.params.id))
    res.render('criarFicha', { vehicle:resultVehicle[0], user:resultUser[0] })
  })

  //Ficha
  app.get('/ficha/:id', async(req, res)=>{
    const ticketId = req.params.id
    const ticketResult  = await db.query(ticketQuery.SELECT_TICKET_BY_ID_WITH_USER_AND_CAR(ticketId))
    const itemsTicket = await db.query(ticketQuery.SELECT_ITEMSTICKET_BY_TICKETID(ticketId))
    res.render('ticket', { ticket: ticketResult[0], items: itemsTicket[0]  })
  })

//BANCO DE DADOS
  //USUARIO
    app.post('/cadastrar', async(req, res)=>{
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
    app.post('/cadastrarVeiculos/:idUser', async(req, res)=>{
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
  
  //Adicionar peça na lista
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
        res.status(200).redirect(`/ficha/${req.params.idTicket}`)
      }).catch((err)=>{
        res.status(404).send(`Erro ao cadastrar item ${err}`)
      })
    })

  //deletar cadastro
  // app.get('/deletar/:id', async(req, res)=>{
  //   User.destroy({where:{'id': req.params.id}}).then(()=>{
  //     res.redirect('/')
  //   }).catch((err)=>{
  //     res.send('Este cadastro não existe !')
  //   })
  // })

//SERVIDOR
  app.listen(process.env.PORT,()=>{ 
    console.log(`Servidor iniciado em: http://localhost:${process.env.PORT}`)
  }) 