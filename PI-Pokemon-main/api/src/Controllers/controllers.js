var express = require('express');
const db = require('../db')
const axios = require('axios');
const { Pokemon, Types } = require('../db.js');
const types = require('../models/Types.js');
const e = require('express');
var router = express.Router();

const getDb = async () => {
    try {
        let DB = await Pokemon.findAll({
            include:{
                model:Types,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        })
        return DB;
    }catch (error){

    }
};

const getApi = async () => {
    const Api = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/'
        )
        const Apik = await axios.get(
            Api.data.next
            )
            const apiAll = Api.data.results.concat(Apik.data.results)
        
            for (let p of apiAll) {
                let url = await axios.get(p.url);
                delete p.url;
                p.id = url.data.id;
                p.img = url.data.sprites.other.dream_world.front_default;
                p.hp = url.data.stats[0].base_stat;
                p.attack = url.data.stats[1].base_stat;
                p.defense = url.data.stats[2].base_stat;
                p.speed = url.data.stats[5].base_stat;
                p.height = url.data.height;
                p.weight = url.data.weight;
                p.type = url.data.types.map((el) => el.type.name);
              }
        
       return apiAll;
            
            
        }

        
            
            
           // id: e.id,
        
            //img: e.
           // types: e.types.map((e) => e.type.name).join(', '),
            //attack: e.stats[1].base_stat,
           // height: e.height,
            //weight: e.weight,
            //hp: e.stats[0].base_stat,
            //defense: e.stats[2].base_stat,
            //speed: e.stats[5].base_stat,
     
            
            
  /*     const getPoke = async () => {
    const Apik = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/'
        )

        let reApi = await Apik.data.results.map((el) =>  el.url)
            
    }
        
        const getPok = async () => {
                let Ap = await reApi.forEach((elem) => {
                return{
                    pikachu: axios.get(elem.data) }})
                    return getPok
                
       }
                  
 */
           
   







    
    const getAll = async () => {
        const allApi = await getApi();
        const allDb = await getDb();
        const total = allApi.concat(allDb);
        return total;
    }

module.exports = 
    getAll;
