const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa');
const Router = require('koa-router');

const router = new Router();

const schema = require('./schema.js');


console.log(schema);
const app = new Koa();

const PORT = '3000'

router.post('/graphql', graphqlKoa(ctx => ({
  schema,
})));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app
  .use(bodyParser())
  .use(router.routes())
;

app.on('error', (err) => {
  console.error('server error', err);
});

app.listen(PORT);

console.log(`Server listening on port ${PORT}`);