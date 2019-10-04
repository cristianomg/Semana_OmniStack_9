const express = require('express');
const routes = require('./routes')
const mongoose = require('mongoose')
const configureMongo = require('./config/configureMongo')
const cors = require('cors');
const path = require('path')

const app = express();
mongoose.connect(configureMongo.path, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  


// GET , POST, PUT , DELETE

// req.query = Acessar  Query params ( para filtros)  users?idade=1
// req.params = Acessar Route params (para edicao e delete) users/1
// req.body = Acessar corpo da requesiçaõ ( criação e edição)
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
app.listen(3333);