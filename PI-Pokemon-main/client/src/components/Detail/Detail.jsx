import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect } from "react";
import "./Detail.css"


export default function Detail(props){
    const [loading , setLoading] = useState(false)
    const myPokemon = useSelector(state => state.detail);
    const dispatch = useDispatch()
    const {id} = props.match.params;
    console.log("soy el detalle", myPokemon)
    useEffect(() =>{
        dispatch(getDetail(id))
        setLoading(true)
    },[id, dispatch])

    
    return (
        <div className="detailContainer" >
            {loading && myPokemon.name?

                <div className="detail">
                    {/* {console.log(myPokemon.types.map(el => el.name))} */}
                    <h1>{myPokemon.name}</h1>
                    <img className="imgdetail" src={myPokemon.img}/>
                    <h2>attack: {myPokemon.attack}</h2>
                   <h2>types:  {`${myPokemon.id.length > 10 ?myPokemon.types.map(el => el.name).join(', ')  : myPokemon.types}`}</h2>
                    <h3>height: {myPokemon.height}</h3>
                    <h3>weight: {myPokemon.weight}</h3>
                    <h3>defense: {myPokemon.defense}</h3>
                    <h3>hp: {myPokemon.hp}</h3>
                    
                    </div> : <p className="loading">...Loading
                    
                                                          </p>
            }
            <Link to= '/home'>

                <button className="button">Volver</button>
            </Link>



        </div>
    )

    
    
    
}


    
    
    