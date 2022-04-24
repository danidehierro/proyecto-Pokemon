const { Router } = require('express');
const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  getAll  = require('../Controllers/controllers.js');
const { Pokemon , Types } = require('../db');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons',async (req, res) => {
    let name = req.query.name
    const poke = await getAll();
    if (name){
        const resp = await poke.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        resp.length ?
        res.status(200).json(resp) :
        res.status(404).send('no se encontro el Pokemón');
    }else {
        res.status(200).json(poke)
    }
    
})

module.exports = router;
