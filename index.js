const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./src/config/env.config')
app.use(cors())
app.use(express.json());

const Middleware = require('./src/middleware')
const AuthLogin = require('./src/routers/Auth.routers')
const UserRouter = require('./src/routers/User.routers')
const CityRouter = require('./src/routers/City.routers')
const PocketRouter = require('./src/routers/Pocket.money.routers')
const PerdinRouter = require('./src/routers/Perdin.routers')

app.use('/auth', AuthLogin);
app.use('/users', Middleware.accessToken, UserRouter);
app.use('/citys', Middleware.accessToken, CityRouter);
app.use('/pocket-moneys', Middleware.accessToken, PocketRouter);
app.use('/perdins', Middleware.accessToken, PerdinRouter);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
