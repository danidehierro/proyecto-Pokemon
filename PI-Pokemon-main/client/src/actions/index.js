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