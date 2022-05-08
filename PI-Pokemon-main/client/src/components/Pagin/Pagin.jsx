import React from 'react';
import './Pagin.css'

export default function Pagin ({pokemonsPerPage,allPokemon,pagin,currentPage}){
    const pageNumbers = [];
    
    for(let i =1; i <= Math.ceil(allPokemon/pokemonsPerPage); i++ ){
        pageNumbers.push(i);
    }
    const nextPage = () => {
        if(currentPage < allPokemon/pokemonsPerPage){
      pagin(currentPage +1)}
    } 
    const prevPage = () => {
        if(currentPage - 1){
            pagin(currentPage -1)
        }
    }   
  
    return(
        <nav>
            <ul className='pagin'>
            <button className='number' onClick={() => prevPage()}>prev</button>
                    {pageNumbers && pageNumbers.map(number =>(
                        <li className='number' key={number}>
                        <button onClick={() => pagin(number)}>{number}  </button>
                        
                        
                        </li>
                       
                    ))}
                    <button className='number' onClick={() => nextPage()}>next</button>
           </ul>
           
       </nav>


    )
}