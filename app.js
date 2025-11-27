/*********************************************************************************************
 * Objetivo: Arquivo responsável pela requisições da API do projeto da locadora de filmes
 * Data: 27/11/2025
 * Autor: Davi de Alemida Santos
 * Versão: 1.0
 **********************************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')

const PORT = process.PORT || 8080

//Porta
const app = express()

//Configurações do cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const controlerUsuario = require('./controller/usuario.js/controller_usuario')

  // end poin para crud de filmes 
  app.get('/v1/viagem/usuario', cors(), async function(request, response){
    let usuario = await controlerUsuario.listarUsuarios()
    
    response.status(usuario.status_code)
    response.json(usuario)
    } )


    app.listen(PORT, function(){
        console.log('API está rodadndo')
  
    })
  