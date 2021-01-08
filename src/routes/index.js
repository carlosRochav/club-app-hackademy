//Requerimos el modulo de express una vez mas
const express = require('express');
const router = express.Router();//Devuelve un objeto que guardaremos en una constante

//Requerimos el modelo de la carpeta modelos
const Persona = require('../models/task');

//Vamos a regresar algo cuando el usuario haga una peticion a nuestro sitio
router.get('/',async(peticion,respuesta)=>{
    const personas = await Persona.find();
    //Le estoy diciendo a respuesta que envie un mensaje
    //respuesta.send("Hola Mundo");
    //Le voy a enviar una vista ahora->
    respuesta.render('index',{//Y tambien le pasamos el arrelgo de coleccion de la db
        personas
    });
});

//Ahora vamos a usar el mismo metodos pero con async/await
router.post('/add',async(peticion,respuesta)=>{

    const persona=new Persona(peticion.body);
    await persona.save();
    //respuesta.send("Recibido");
    //Ya no queremos que nos mande el mensaje de recibido
    respuesta.redirect('/#supreme');
});

//Ahora Vamos a hacer la funcion que elimina un registro
router.get('/delete/:id',async(peticion,respuesta)=>{
    const {id}=peticion.params;
    await Persona.remove({_id:id});
    respuesta.redirect('/#supreme');
})

//UPDATE; Funcion para editar un registro
router.get('/update/:id',async(peticion,respuesta)=>{
    const {id}=peticion.params;    
    const persona = await Persona.findById(id);
    respuesta.render('update',{
        persona
    });
});

//UPDATE POST; ENVIA NUEVOS DATOS
router.post('/update/:id',async(peticion,respuesta)=>{
    const { id }= peticion.params;
    await Persona.update({_id:id},peticion.body);
    respuesta.redirect('/#supreme');
});


//NOT (router) YES = router
module.exports=router;
