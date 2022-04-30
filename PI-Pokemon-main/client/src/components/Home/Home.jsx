import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../../actions";
import Card from "../Card/Card";
////import Card from "./Card";
//import Pagin from "./Pagin";
//import Search from "./Search"

export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    
    useEffect (() =>{
        dispatch(getPokemons())
    },[])


return (
    <div className="container">

  <Link to= '/pokemon'>
      <button>Crear Pokemon</button>
  </Link>
  
  <fragment >
             <div className="container">
            {
                allPokemons?.map((e, index) =>{
                    console.log(e.name)
                    return (
                       
                            <div className= 'cardContainer'  key={index}>
                            <Link to={'/Home/'}>
                                 <Card name={e.name}
                                 
                                 img={e.img} 
                                 

                                 />
                             </Link>
                             </div>
                       
                    );
                })
        
        }
        </div>
        </fragment>
     </div>
      
  )

};