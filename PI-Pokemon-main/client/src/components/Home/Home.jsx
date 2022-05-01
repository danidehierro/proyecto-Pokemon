import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, orderByName, orderByAttack,filterPokemonsByTypes } from "../../actions/index";
import Card from "../Card/Card";
import './Home.css'
import Pagin from "../Pagin/Pagin";
import Search from "../Search/Search.jsx"

export default function Home (){
    const dispatch = useDispatch()
    const allPokemon = useSelector((state) => state.pokemons)
    
    const [orden, setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setpokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 6
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemons = allPokemon.slice(indexOfFirstPokemon,indexOfLastPokemon)
    console.log(currentPokemons)
    const types = currentPokemons.map(el => el.type.map(ele => ele))
     console.log(types)
    const pagin =(pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect (() =>{
        dispatch(getPokemons())
    },[dispatch])
  
    
  
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }
  
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
        //console.log(filterRecipesByDiets(e.target.value))
        dispatch(filterPokemonsByTypes(e.target.value))
    }

return (
    <div className="navcontainer">

  <Link to= '/pokemon'>
      <button>Crear Pokemon</button>
  </Link>
  <h1 className="titlehome"> HEALTHY FOOD </h1>
    
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
          {/*  <select onChange={e => handleFilterTypes(e)}>            
           <option value="all">Filter by Types</option>
                             {types?.map((d) => (
                                <option key={d.name} value={d.name}>
                                            {" "}
                                    {d.name[0].toUpperCase() + d.name.slice(1)}
                                </option>
                              ))};

             </select> */}
           
  </div>
         
         
         <Search/>
            </div>
            <Pagin
            pokemonsPerPage={pokemonsPerPage}
            allPokemon={allPokemon.length}
            pagin={pagin} />



             <div className="container">
            {
               currentPokemons.length >0 ? currentPokemons.map((e, index) =>{
                    console.log(e.name)
                  return (
                       
                            <div className= 'cardContainer'  key={index}>
                            <Link className="linkpokemon" to={'/Home/'}>
                                 <Card name={e.name}
                                 
                                 img={e.img} 
                                 type={e.type.map(e => e)}

                                 />
                             </Link>
                             </div>
                       
                    );
                }):<div><h1 className="LOADING">ESPERANDO A LOS OTROS POKEMONS...</h1>
                <img src='https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/charmander.gif'></img>
                <img src='https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/af/latest/20200102034804/Arcanine_EpEc.gif/180px-Arcanine_EpEc.gif'></img>
                <img src='https://c.tenor.com/SxdB4i4FgQwAAAAC/charmander-marshmallows.gif'></img>
                </div>
        
        }
        </div>
        
     </div>
      
 
)
};