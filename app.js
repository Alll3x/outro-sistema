//FRAMEWORKS
  const express = require('express')
  const handle = require('express-handlebars')
  const bodyParser = require('body-parser')
  const path = require('path')

//SQL QUERIES
  const myQuery = require('./sql/userQueries')

//MODELS
  const User = require('./models/User')
  const Address = require('./models/Address')
  const Vehicle = require('./models/Vehicle')

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
  app.get('/usuariosCadastrados', async(req, res) =>{
    const result = await db.query(myQuery.SELECT_USERDATA_ADDRESS())
    res.render('usuariosCadastrados', { dados:result[0] })
  })

  //PAGINA ESPECIFICA DE CADA CLIENTE
  app.get('/cadum/:id', async(req, res) =>{
    const result = await db.query(myQuery.SELECT_USERDATA_ADDRESS_ID(req.params.id))
    res.render('cadum', { dados:result[0] })
  })

  // PAGINA CADASTRAR VEICULO NO USUARIO
  app.get('/cadastrarVeiculo/:id', async(req, res) =>{
    const result = await db.query(myQuery.SELECT_USERDATA_ADDRESS_ID(req.params.id))
    const vehicle = await db.query(myQuery.SELECT_VEHICLES_BY_USERID(req.params.id))
    res.render('cadastroVeiculos', { dados:result[0], vehicles: vehicle[0] })

  })

//CADASTRAR EM BANCO
  //USUARIO
    app.post('/cadastrar', async(req, res) =>{
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
    app.post('/cadastrarVeiculos/:idUser', async(req, res) =>{
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

  //deletar cadastro
  app.get('/deletar/:id', async(req, res)=>{
    User.destroy({where:{'id': req.params.id}}).then(()=>{
      res.redirect('/')
    }).catch((err)=>{
      res.send('Este cadastro não existe !')
    })
  })

//SERVIDOR
  app.listen(8080,()=>{ 
    console.log("Servidor iniciado em: http://localhost:8080")
  })