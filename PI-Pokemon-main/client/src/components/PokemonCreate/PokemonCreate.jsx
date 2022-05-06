import React, {useEffect , useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'
export default function PokemonCreate(){

    const dispatch = useDispatch()
    const history = useHistory()
    const type = useSelector((state) => state.types)
    const [error, setError] = useState({required: false});
    console.log(type)


    function Validation(input){

        let error = {required: false};
        if(!input.name){
            error.name = 'Please enter the name of the Pokemon'
            error.name= true;
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(input.name)){
            error.name = 'invalid name';
            error.required = true
        }
        if(input.attack <= 0 || input.attack > 150){
            error.attack = 'attack must be between 0 and 150'
            error.required = true
        }
        if(input.defense <= 0 || input.defense > 100){
            error.defense = 'defense must be between 0 and 100'
            error.require = true
        }
        if(input.speed <= 0 || input.speed > 200){
            error.speed = 'speed  must be between 0 and 200'
            error.required = true
        }
        if(input.hp <= 0 || input.hp > 180){
            error.hp = 'hp must be between 0 and 180'
            error.required = true
        }
        if(input.height <= 0 || input.height > 100){
            error.height = 'height score must be between 0 and 100'
            error.required = true
        }if(input.weight <= 0 || input.weight > 1000){
            error.weight = 'weight must be between 0 and 1000'
            error.required = true
        }
        if(input.speed <= 0 || input.speed > 200){
            error.speed = 'speed score must be between 0 and 200'
            error.required = true
        }
        if(!input.img){
            error.img = 'Please enter image png or jpg'
            error.img= true;
        } else if (!/(https?:\/\/.*\.(?:png|jpg))/i.test(input.img)){
            error.img = 'invalid image';
            error.required = true
        }

        return error;
    }

   
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
        let objError = Validation({...input, [e.target.name] : e.target.value})
        setError(objError)
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
        <div className="containerPokemon" >
         <Link to= '/home'><button>Volver</button> </Link>
         <h1 className="titleCR">Pokemón Creation</h1>
         <form  onSubmit={(e) => handleSubmit(e)} className="list-item">
            <div >
             <label>Name:</label>
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
             {!error.defense ? null : (<span>{error.defense}</span>)}
            </div>
            <div>
            <label>Speed:</label>
                <input
                type='number'
                value={input.speed} 
                name='speed'
                onChange={(e) => handleChange(e)}
                />
             {!error.speed ? null : (<span>{error.speed}</span>)}
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
                 {!error.height ? null : (<span className="height">{error.height}</span>)}
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
            {!error.img ? null : (<span>{error.img}</span>)}
            </div>
             <div className="typescheck">
                 <h2>Types:</h2>

                { type.map((e,x) => { 
                    return(
                        <label key={x} className= " maptypes">
              <input  
              type='checkbox'
              name= {e.name}
              value= {e.name}
              onChange={(e) => handleCheck(e)}
              />{e.name}</label> 
                    )
                 })}

            


          
                                                            
                                                           
                     <button type='submit'  disabled = {error.required} >Create Pokemón</button>                                      
                                                           
                     {console.log(typeof error.required) }            
                     {console.log( error.required) }                      
          </div>

         </form>



        </div>
    )
}




