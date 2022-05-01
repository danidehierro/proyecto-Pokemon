import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect } from "react";
import "./Details.css"


export default function Detail(props){
    const dispatch = useDispatch()
     
    useEffect(() =>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    console.log(props.match.params.id)
    const myPokemon = useSelector((state) => state.detail)
    
    return (
        <div className="detailContainer" >
            {
                myPokemon.name ?
                <div className="detail">
                    <h1>{myPokemon.name}</h1>
                    <img src={myPokemon.img}/>
                    <h2>id:{myPokemon.id}</h2>
                    <h2>attack: {myPokemon.attack}</h2>
                    <h2>Score: {myPokemon.score}</h2>
                    <h2>Health Score: {myPokemon.healthScore}</h2>
                    <h2>types: {!myPokemon.createdInDB?myPokemon.types.join(", "):myPokemon.types.map(e => e.name).join(", ")}</h2>
                    <h3>height: {myPokemon.height}</h3>
                    <h3>weight: {myPokemon.weight}</h3>
                    <h3>defense: {myPokemon.defense}</h3>
                    <h3>hp: {myPokemon.hp}</h3>
                    
                    </div> : <p className="loading">...Loading 
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gifss.com%2Fprofesiones%2Fcocineros%2Findex2.htm&psig=AOvVaw1ZMrMS7X1xrWmkmfSZ8Eko&ust=1649358187134000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCNDfn56QgPcCFQAAAAAdAAAAABAD" alt="not image" />
                    </p>
            }
            <Link to= '/home'>

                <button className="button">Volver</button>
            </Link>



        </div>
    )

    
    
    height:
    weight:
    hp: 
    
}


    
    
    