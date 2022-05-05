const { default: axios } = require('axios');
const { Router } = require('express');
const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  {getAll, getpokemonid,getpokemonname}  = require('../Controllers/controllers.js');
const { Pokemon , Types } = require('../db');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons/:id', async(req,res) => {
 try {
       let id = req.params.id
       let pokid = await getpokemonid(id)
    res.send(pokid)
 } catch (error) {
      console.log(error)
 }   
 
    
})

    router.get('/pokemons', async(req,res) => {
        let name = req.query.name
       try {
        if (name){
            let pokem = await getpokemonname(name.toLowerCase())
            res.status(200).json(pokem)
            
        }else {
            const poke = await getAll();
            res.status(200).json(poke)
        }
    
       } catch (error) {
           console.log(error)
       } 
    })


    router.get('/types', async(req,res) => {
        const {data} = await axios.get('https://pokeapi.co/api/v2/type')
        const types = data.results.map(el => el.name)
        const dbtypes = types.flat()
       dbtypes.forEach(elem => {
            Types.findOrCreate({
                where:{
                    name: elem
                }
            })
        })
        const allTypes = await Types.findAll();
        return res.status(200).send(allTypes)
    })

    router.post('/pokemons', async (req,res) => {
        let{
            name,
            img,
            hp, 
            attack,
            defense,
            speed,
            height,
            weight,
            type,
    
        } = req.body
        const createdPokemon = await Pokemon.create({
            name,
            img,
            hp, 
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDb:true
        })
        createDb = await Types.findAll({
            where:{
                name:type
            }
        })
        createdPokemon.addTypes(createDb)
        return res.status(200).send('pokemon creado con exito')
    })



module.exports = router;
