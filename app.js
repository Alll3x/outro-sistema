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
    console.log(result[0]);
    res.render('cadum', { dados:result[0] })
  })

  //CADASTRAR EM BANCO
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
          return res.status(200).redirect('/')
      }).catch((err)=>{
        return res.status(400).json({
          erro: true,
          mensagem: "Usuário não cadastrado " + err
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