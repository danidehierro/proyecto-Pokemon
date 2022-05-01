import axios from 'axios';

export const POKEMONS = "POKEMONS";


export function getPokemons(){
    return async function(dispatch){
        const res = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: POKEMONS,
            payload:res.data
        });
    }
}
export function getTypes(){
    return async function(dispacth){
        var json = await axios.get("http://localhost:3001/types",{
            
        });console.log(json)
        return dispacth({
            type:"GET_TYPES",
            payload: json.data
        });           
    }}

    export function postPokemon(payload){
        return async function(dispacth){
            console.log("soy un tipo de pokemon",payload)
            var data = await axios.post("http://localhost:3001/pokemons",payload);
            return data;
        }
    }


export function filterPokemonsByTypes(payload){
    //console.log(payload)
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}

export function orderByName(payload){
    return{
        type:"ORDER_BY_NAME",
        payload
    }
}
export function orderByAttack(payload){
    return{
        type:"ORDER_BY_ATTACK",
        payload
    }
}

export function getNamePokemons(name){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
            console.log(json)
            return dispatch({
                type:"GET_NAME_POKEMONS",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getDetail(id){
    return async function (dispacth){
        try {
            var json = await axios.get("http://localhost:3001/pokemons/" + id);
            return dispacth({
                type:"GET_DETAILS",
                payload: json.data
            })
            } catch (error) {
            console.log(error)
            
        }
    }
}