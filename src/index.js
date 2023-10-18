const express = require('express')
const {v4: uuid} = require('uuid') // v4 gera numeros aleatorios e está sendo renomeada para uuid

const app = express()

app.use(express.json())

const users = []

//Métodos Usuários
app.post('/users', (request, response) => { 
    const {name, email} = request.body //desestruturação
    const emailAlreadyExixts = users.some((user) => user.email === email )

    if (emailAlreadyExixts){
        return response.status(400).json({error: 'Users already exists'})
    }

   users.push({
       name: name,
       email: email,
       id: uuid(),
   })
   return response.status(201).json({message: 'OK'})
})

app.get('/getUsers', (request, response) =>{
    return response.status(200).json(users)
})

app.listen(3333, () => console.log('Server is running'))