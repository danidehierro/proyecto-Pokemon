import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, orderByName, orderByAttack,filterPokemonsByTypes, filterCreated } from "../../actions/index";
import Card from "../Card/Card";
import './Home.css'
import Pagin from "../Pagin/Pagin";
import Search from "../Search/Search.jsx"
import gif from '../image/charmander-marshmallows-unscreen.gif';

export default function Home (){
    const dispatch = useDispatch()
    const allPokemon = useSelector((state) => state.pokemons)
    const [orden,setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage] = useState(3)
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 6
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemons = Array.isArray(allPokemon)? allPokemon.slice(indexOfFirstPokemon,indexOfLastPokemon):[allPokemon]
    
    const pagin =(pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() =>{
        dispatch(getPokemons())
    },[dispatch])

  
    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`orden ${e.target.value}`);
    }
    function handleSort2 (e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`);
    }
  
    function handleFilterTypes(e){
        console.log(filterPokemonsByTypes(e.target.value))
        dispatch(filterPokemonsByTypes(e.target.value))
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

return (
    <div className="navcontainer">

  <Link to= '/pokemons'>
      <button className="my_button">Crear Pokemon</button>
  </Link>
  <h1 className="titlehome"> APP POKEMÓN </h1>
    
    <div>
        <div className="search">
        <select onChange={e => handleSort(e)}>
           <option value= 'asc'> A to Z  </option>
           <option value= 'des'> Z to A </option>
           </select>
           <select onChange={e => handleSort2(e)}>
           <option value= 'low'> For Low Attack </option>
           <option value= 'high'> BY High Attack </option>
           </select>
           <select onChange={e => handleFilterCreated(e)}>
            <option value= 'All'> All pokemons </option>
            <option value= 'api'> Existing </option>
            <option value= 'created'> Created  </option>
           </select>
           <select onChange={e => handleFilterTypes(e)}>
           <option value="All">All types</option>
                    <option value= 'poison'> poison</option>
                    <option value= 'fire'> fire</option>
                    <option value= 'water'> water </option>
                    <option value= 'electric'> electric </option>
                    <option value= 'psychic'> psychic </option>
                    <option value= 'ice'> ice </option>
                    <option value= 'dragon'> dragon </option>
                    <option value= 'normal'> normal </option>
                    <option value= 'dark'> dark </option>
                    <option value= 'fairy'> fairy </option>
                    <option value= 'unknown'> unknown </option>
                    <option value= 'shadow'> shadow </option>
                    <option value= 'fighting'> fighting </option>
                    <option value= 'flying'> flying </option>
                    <option value= 'ground'> ground </option>
                    <option value= 'rock'> rock </option>
                    <option value= 'bug'> bug </option>
                    <option value= 'ghost'> ghost </option>
                    <option value= 'steel'> steel </option>
                    <option value= 'grass'> grass </option>
             
                  {/*   {
                      
                        type?.map(el => {
                            return(
                                <option key={el.id} value={el.name}>{el.name}</option>
                            )
                        }) 
                    } */}
                </select>
           
  </div>
         
         
         <Search/>
            </div>
            <Pagin
            currentPage={currentPage}
            pokemonsPerPage={pokemonsPerPage}
            allPokemon={allPokemon.length}
            pagin={pagin} />



             <div className="container">
            {
               currentPokemons.length >0 ? currentPokemons.map((e, index) =>{
                    
                  return (
                       
                            <div className= 'cardContainer'  key={index}>
                            <Link className="linkpokemon" to={'/detail/'+ e.id}>
                                 <Card name={e.name}
                                 
                                 img={e.img} 
                                 type={Array.isArray(e.types)?e.types.map(e => e):e.types.split(', ')}

                                 />
                             </Link>
                             </div>
                       
                    );
                }):<div><h1 className="LOADING">Loading...</h1>
                <img src='https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/charmander.gif' alt="not found"></img>
                
                <img src= {gif} 
                alt="not found"></img>
                </div>
        
        }
        </div>
        
     </div>
      
 
)
};