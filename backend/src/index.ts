import express from 'express';
import cors from 'cors';
import { sequelize } from './database';
import restaurantsRouter from '../Routers/restaurantsRouter';



const app = express();
require('dotenv').config();

const port = process.env.PORT;
app.use(cors());
app.use(express.json());

//routers
app.use('/restaurants', restaurantsRouter);


sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas creadas');
    app.listen(port, async () => {
      console.log(`El servidor está corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:\n', error);
  });
