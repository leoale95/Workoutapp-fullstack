const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos de MongoDB Atlas');
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
}

module.exports = { connectToDatabase };
