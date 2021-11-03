'use strict';
require('custom-env').env();

const OpenAPIBackend = require('openapi-backend').default;
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const auth = require('./middlewares/Auth');

app.use(express.json());

const cors_options = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 3600,
  preflightContinue: true,
  exposedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

app.use(cors(cors_options));
app.options('*', cors());
app.use(morgan('dev'));

const api = new OpenAPIBackend({
  definition: path.join(__dirname, 'api/openapi.yaml'),
  strict: true,
  quick: false,
  validate: true,
  handlers: {
    validationFail: async (c, req, res) => res.status(400).json({ err: c.validation.errors }),
    notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
    notImplemented: async (c, req, res) => {
      const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId);
      return res.status(status).json(mock);
    },
    notFound: async (c, req, res) => res.status(404).json({ err: 'not found' }),
    unauthorizedHandler: async (c, req, res) => res.status(401).json({ err: 'unauthorized' }),
  },
});

api.registerSecurityHandler('APIKEY-Gotham', (context, request, res) => {
  return auth.authAPIKEY(context, request, res);
});

api.registerSecurityHandler('JWT-token', (context, request, res) => {
  return auth.authToken(context, request, res);
});

const routes = require('./routes');
api.register(routes.router);

api.init();

app.use((req, res) => api.handleRequest(req, req, res));

app.listen(process.env.PORT, () => {
  console.info('Environnement : %s', process.env.NODE_ENV);
  console.info('API listening at %d', process.env.PORT);
});
