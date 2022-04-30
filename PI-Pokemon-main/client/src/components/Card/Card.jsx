import React from "react";
import './Card.css'

export default function Card({ name, img }){
    return (
        <div className="Card">
            <h3 className="cardTitle">{name}</h3>
    

            <img src={img} alt="img not found" className="image" />
        

        </div>
    )
}