const { Router } = require('express')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

// Métodos: GET, POST, PUT, DELETE
// Tipos de Parâmetros
// Query params: request.query (Filtros, ordenação, paginação, ...)
// Route params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// index, show, store, update, delete

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.get('/search', SearchController.index)

module.exports = routes;