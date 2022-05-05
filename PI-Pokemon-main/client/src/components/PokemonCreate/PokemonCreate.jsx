import React, {useEffect , useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'
export default function PokemonCreate(){


    const dispatch = useDispatch()
    const history = useHistory()
    const type = useSelector((state) => state.types)
    const [error, setError] = useState({required: true});

    const [input,setInput]= useState({
        name:"",
        attack:"",
        img:"",
        hp:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        type:[]

    })
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
       /*  let objError = Validation({...input, [e.target.name] : e.target.value})
        setError(objError) */
    }
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                type:[...input.type, e.target.value]
            })
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Pokemon Created")
        setInput({
            name:"",
            attack:"",
            img:"",
            hp:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            type:[]

        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes());
    },[]);

    return(
        <div className="containerRecipe" >
         <Link to= '/home'><button>Volver</button> </Link>
         <h1 className="titleCR">Pokemón Creation</h1>
         <form  onSubmit={(e) => handleSubmit(e)} className="list-item">
            <div >
             <label>Nombre:</label>
                <input
                type='text'
                value={input.name}
                name='name'
                onChange={(e) => handleChange(e)}
                />
                {!error.name ? null : (<span>{error.name}</span>)}
                </div>
            <div>
            <label>Attack:</label>
                <input
                type='number'
                value={input.attack} 
                name='attack'
                onChange={(e) => handleChange(e)}
                />
            {!error.attack ? null : (<span>{error.attack}</span>)}
            </div>
           
            <div>
            <label>Defense:</label>
                <input
                type='number'
                value={input.defense} 
                name='defense'
                onChange={(e) => handleChange(e)}
                />
            
            </div>
            <div>
            <label>Speed:</label>
                <input
                type='number'
                value={input.speed} 
                name='speed'
                onChange={(e) => handleChange(e)}
                />
            
            </div>
         
           
            <div>
            <label>Hp:</label>
                <input
                type='number'
                value={input.hp}
                name='hp'
                onChange={(e) => handleChange(e)}
                />
                 {!error.hp ? null : (<span>{error.hp}</span>)}
             </div>
             <div>
            <label>height:</label>
                <input
                type='number'
                value={input.height}
                name='height'
                onChange={(e) => handleChange(e)}
                />
                 {!error.height ? null : (<span>{error.height}</span>)}
             </div>
             <div>
            <label>Weight:</label>
                <input
                type='number'
                value={input.weight}
                name='weight'
                onChange={(e) => handleChange(e)}
                />
                 {!error.weight ? null : (<span>{error.weight}</span>)}
             </div>
             <div>
            <label>Imagen:</label>
                <input
                type='text'
                value={input.img} 
                name='img'
                onChange={(e) => handleChange(e)}
                />
            
            </div>
             <div>
                 <label>Types:</label>
              <label>
              <input  
              type='checkbox'
              name='fire'
              value='fire'
              onChange={(e) => handleCheck(e)}
              />Fire</label> 
               <label>
              <input  
              type='checkbox'
              name='water'
              value='water'
              onChange={(e) => handleCheck(e)}
              />Water</label>
               <label>
              <input  
              type='checkbox'
              name='bug'
              value='bug'
              onChange={(e) => handleCheck(e)}
              />Bug</label>
               <label>
              <input  
              type='checkbox'
              name='poison'
              value='poison'
              onChange={(e) => handleCheck(e)}
              />Poison</label>
               <label>
              <input  
              type='checkbox'
              name='electric'
              value='electric'
              onChange={(e) => handleCheck(e)}
              />Electric</label> 
               <label>
              <input  
              type='checkbox'
              name='rock'
              value='rock'
              onChange={(e) => handleCheck(e)}
              />Rock</label>
               <label>
              <input  
              type='checkbox'
              name='grass'
              value='grass'
              onChange={(e) => handleCheck(e)}
              />Grass</label> 
               <label>
              <input  
              type='checkbox'
              name='ice'
              value='ice'
              onChange={(e) => handleCheck(e)}
              />Ice</label>                                
                                                            
                                                           
                     <button type='submit'>Create Pokemón</button>                                      
                                                           
                                                           
          </div>

         </form>



        </div>
    )
}




