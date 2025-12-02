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

const usuarioRoutes = require('./routes/usuario')




//Configuração das rotas
app.use('/v1/travel/usuario', usuarioRoutes)

app.use('/v1/travel/usuario/:id', usuarioRoutes)


app.listen(PORT, function(){
  console.log('API aguardando resposta ;)')
})

