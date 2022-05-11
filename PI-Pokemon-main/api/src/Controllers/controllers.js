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
const getApi = () =>{
   return(   axios.get( "https://pokeapi.co/api/v2/pokemon?limit=40").then(pokemonsApi => {
            const pk = pokemonsApi.data.results

            const res = pk.slice(0,10).map(e => axios.get(e.url))
       return res
      })
          .then(pokem => {
            let pokemons = Promise.all(pokem)
            return pokemons
              
          })
    
        
        .then(e => {
            let pokemon =e.map(e=> e.data)
            // console.log(pokemon)
            let allData = []
            pokemon.map(e => {
                // console.log(e.types[0].type.name)
                allData.push({
                        id: e.id,
                        name : e.name,
                        hp: e.stats[0].base_stat,
                        attack: e.stats[1].base_stat,
                        defense: e.stats[2].base_stat,
                        speed: e.stats[5].base_stat,
                        height: e.height,
                        weight: e.weight,
                        img: e.sprites.other.home.front_default,
                        types: e.types.length < 2 ? [e.types[0].type.name] : [e.types[0].type.name, e.types[1].type.name]

                })
            })
        
            return allData
        })
        

   )}


        
        const getpokemonid = async (id) => {
            let e= undefined;
          if(id.length > 10){
         e = await Pokemon.findOne({
               where: {
                   id 
               },
               include:{
                model:Types,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }   
        })
         

          } else{ 
         e = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          }  
          //console.log(e.dataValues) 
       let pok = {
            name: e.data ? e.data.name: e.dataValues.name,
            id:e.data ? e.data.id : e.dataValues.id,
            img:e.data ? e.data.sprites.versions["generation-v"]["black-white"].animated.front_default : e.dataValues.img,
            types:e.data ? e.data.types.map((e) => e.type.name).join(', '): e.dataValues.types,
            attack:e.data ? e.data.stats[1].base_stat: e.dataValues.attack,
            height:e.data ? e.data.height: e.dataValues.height,
            weight:e.data ? e.data.weight: e.dataValues.weight,
            hp:e.data ? e.data.stats[0].base_stat: e.dataValues.hp,
            defense:e.data ? e.data.stats[2].base_stat: e.dataValues.defense,
            speed:e.data ? e.data.stats[5].base_stat: e.dataValues.speed,
     
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

            

            const getpokemondb = async (name) => {
                let e= undefined;
              if(name){
             e = await Pokemon.findOne({
                   where: {
                       name
                   },
                   include:{
                    model:Types,
                    attributes:["name"],
                    through:{
                        attributes:[]
                    }
                }   
            })
              if(e){
             let poke = {

                    name: e.dataValues.name,
                    id:e.dataValues.id,
                    img:e.dataValues.img ,
                    types: e.dataValues.types,
                    attack:e.dataValues.attack,
                    height: e.dataValues.height,
                    weight: e.dataValues.weight,
                    hp: e.dataValues.hp,
                    defense:e.dataValues.defense,
                    speed: e.dataValues.speed,
                }
                    return poke
                }}
                return("error")
                    

            }
   





            

    
    const getAll = async () => {
       const allApi = await getApi().then(res => res);
        const allDb = await getDb();
        const total = allApi.concat(allDb);
       
        return total;
    }

module.exports = 
    {getAll , getpokemonid,getpokemonname,getpokemondb};
