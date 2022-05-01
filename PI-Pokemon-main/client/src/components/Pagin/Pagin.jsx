import React from 'react';
import './Pagin.css'

export default function Pagin ({pokemonsPerPage,allPokemon,pagin}){
    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(allPokemon/pokemonsPerPage); i++ ){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className='pagin'>
                    {pageNumbers && pageNumbers.map(number =>(
                        <li className='number' key={number}>
                        <a onClick={() => pagin(number)}>{number}</a>
                        </li>
                    ))}
           </ul>
       </nav>


    )
}