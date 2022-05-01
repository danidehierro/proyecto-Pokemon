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
                p.img = url.data.sprites.versions["generation-v"]["black-white"].animated.front_default
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
        
        const getpokemonid = async (id) => {
        const e = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            
       let pok = {
            name:e.data.name,
            id: e.data.id,
            img: e.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
            types: e.data.types.map((e) => e.type.name).join(', '),
            attack: e.data.stats[1].base_stat,
            height: e.data.height,
            weight: e.data.weight,
            hp: e.data.stats[0].base_stat,
            defense: e.data.stats[2].base_stat,
            speed: e.data.stats[5].base_stat,
     
            }
            return pok
        }


        const getpokemonname = async (name) => {
            const e = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
           let poke = {
                name:e.data.name,
                id: e.data.id,
                img: e.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                types: e.data.types.map((e) => e.type.name).join(', '),
                attack: e.data.stats[1].base_stat,
                height: e.data.height,
                weight: e.data.weight,
                hp: e.data.stats[0].base_stat,
                defense: e.data.stats[2].base_stat,
                speed: e.data.stats[5].base_stat,
         
                }
                return poke
            }

       
   







    
    const getAll = async () => {
        const allApi = await getApi();
        const allDb = await getDb();
        const total = allApi.concat(allDb);
        return total;
    }

module.exports = 
    {getAll , getpokemonid,getpokemonname};
