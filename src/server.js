const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose')
const configureMongo = require('./config/configureMongo')

const app = express();
mongoose.connect(configureMongo.path, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  


// GET , POST, PUT , DELETE

// req.query = Acessar  Query params ( para filtros)  users?idade=1
// req.params = Acessar Route params (para edicao e delete) users/1
// req.body = Acessar corpo da requesiçaõ ( criação e edição)
app.use(express.json());
app.use(routes);
app.listen(3333);