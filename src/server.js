//ARCHIVO QUE SERA EL SERVIDOR
const express = require('express');//Guardamos el modulo de express en una constante
const app = express();//Creamos el servidor

const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');//Guardamos mongoose porque usaremos mongodb

// Configuramos la carpeta public static para usar estilos CSS
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'));
//<-


// //Ahora nos conectamos a la base de datos
// mongoose.connect('mongodb://localhost/crud-hackademy')//Creamos la base de datos
//     .then(db=>console.log("Conexion exitosa"))//Promesa que envia el mensaje que se realizo la conexion
//     .catch(err=>console.log(err))//En caso contrario madna el error

    mongoose.connect('mongodb+srv://carlosRochav:lostdesert1989@clusterx.yxlnv.mongodb.net/crud-hackademy?retryWrites=true&w=majority')//Creamos la base de datos
    .then(db=>console.log("Conexion exitosa"))//Promesa que envia el mensaje que se realizo la conexion
    .catch(err=>console.log(err))//En caso contrario madna el error

//Importamos Rutas
const indexRoutes = require('./routes/index');//Requiero trabajar con el archivo index

//SETTINGS
    app.set('port',process.env.PORT || 3000);
    //Ahora establecemos path para poder decirle al servidor donde esta la carpeta views
    app.set('views',path.join(__dirname,'views'));
    //Ahora el motor de plantillas(modulo)
    app.set('view engine','ejs');

// MIDDLEWARES
    app.use(morgan('dev'));//Me indica cuanto se demora el el servidor en devolver las rustas al cliente
    app.use(express.urlencoded({extended:false}));//Poder recibir datos de un form desde html y que solor reciba texto

//  ROUTES
    app.use('/',indexRoutes);

   
// STARTING THE SERVER
    //Crear funcion para escuchar el servidor de express
    app.listen(app.set('port'),()=>{
        console.log(`Escuchando en el puerto ${app.set('port')}`);
    })

    /*Con Nodemon evitamos volver a ejecutar el servicor y al realizar cambios 
    en el codigo el servidor lo relaiza de manera automatica; Reinicia el servidor cada vez
    que hay nuevos cambios de manera automatica */