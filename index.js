const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
require('express-async-errors');

dotenv.config();

const { sequelize } = require("./config/connectDb");
const movieRouter = require('./routes/movie-routes');
const specs = require('./spec/swagger');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(logger("dev"));

app.use('/', movieRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.all("*", async () => {
	throw new Error('Route not found');
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500).send(err.message || "Something went wrong");
});

app.listen(port, async () => {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`We are live on port ${port}...`)
})
