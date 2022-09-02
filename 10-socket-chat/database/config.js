const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        mongoose.connect(process.env.DB_CNN);

        console.log("Connected to DB");

    }catch(error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB')
    }

}

module.exports = {
    dbConnection
}