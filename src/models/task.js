// Ahora vamos a definir el modelo de la base de datos, sus
// atributos para poder trabajar con ello definiendo el objeto
// mongoose

const mongoose = require('mongoose');//Creamos una variable con el modulo
const Schema = mongoose.Schema;//Guardamos en una variable scheme

//Definimos el objeto de tipo esquema para saber que va a recibir la base de datos
const PersonaSchema= new Schema({
    name:String,//aqui definimos los atributos de nuestro objeto; que va a almacenar y su tipo de dato
    city:String,
    status:{
        type:Boolean,
        default:false
    }
});

//Ahora exportamos
module.exports=mongoose.model('personas',PersonaSchema);

