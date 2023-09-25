require('dotenv').config();
const app = require('./server');
const { connectToDatabase } = require('./database');

async function startServer() {
  await connectToDatabase();
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}

startServer();
