import React from "react";
import './Card.css'

export default function Card({ name, img, type }){
    
    return (
        <div className="Card">
            <h3 className="cardTitle">{name}</h3>
              

            <img src={img} alt="img not found" className="image" />
            <h3 className="types">{typeof type[0] === "string" ? type.join(', '): type.map(el => el.name).join(', ')}</h3>
              
        </div>
    )
}