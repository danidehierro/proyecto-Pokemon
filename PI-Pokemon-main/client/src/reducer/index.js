import { POKEMONS } from "../actions"






const initialState = {
    pokemons : [],
    allPokemons: [],
    allPokemons2:[],
    types: [],
    detail:[]

}


function rootReducer (state= initialState, action ) {
    
    switch(action.type) {
        case POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                allPokemons2:action.payload
      }
      case 'GET_NAME_POKEMONS':
          
          
      return{
          ...state,
          pokemons: action.payload
         
      }

  case 'FILTER_BY_TYPES':
        state.pokemons = state.allPokemons2
      console.log(state.allPokemons2)
      let typesFiltered = action.payload === 'All' ?  state.allPokemons2 :  state.allPokemons2.filter(el => el.types.map(e =>  {
          if(typeof e === "string") return e;
          else{ return e.name }}).includes(action.payload))
        while(typesFiltered.length !== 0){
        
       
      return{
          ...state,
          pokemons: typesFiltered
          
      }}
      alert("I don't know found the type of Pokemón")
      case 'FILTER_CREATED':
        const createdFilter = action.payload === 'created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
           console.log('soy el reducer',createdFilter)
        return{
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter,
                allPokemons2: action.payload === 'All' ? state.allPokemons : createdFilter
            }
  
        case 'GET_TYPES':
      return {
          ...state,
          types: action.payload
      }
  case 'POST_POKEMON':
      return{
          ...state,
      }
  case 'ORDER_BY_NAME':
      console.log(state.pokemons)
      
      let sortArr = action.payload === 'asc' ?
      state.pokemons.sort(function (a,b){
          if (a.name > b.name) {
              return 1;
          }
          if (b.name > a.name){
              return -1;
          }
          return 0;
      }) :
      state.pokemons.sort(function (a,b){
          if(a.name > b.name){
              return -1;
          }
          if (b.name > a.name){
              return 1;
          }
          return 0;
      })
      return {
          ...state,
          pokemons: sortArr
      }
      case "ORDER_BY_ATTACK":
        if (state.pokemons.length > 0){
          let sortArre = action.payload === 'low' ?
          
          state.pokemons.sort(function (a,b){
              if (a.attack > b.attack) {
                  return 1;
              }
              if (b.attack > a.attack){
                  return -1;
              }
              return 0;
          }) :
          state.pokemons.sort(function (a,b){
              if(a.attack > b.attack){
                  return -1;
              }
              if (b.attack > a.attack){
                  return 1;
              }
              return 0;
          })
          return {
              ...state,
              pokemons: sortArre
          }
          }  

      case "GET_DETAILS":
          console.log(" soy el reducer ",action.payload)
          return{
              ...state,
              detail: action.payload
          }

       default:
          return state;

}   
              
    
};


            export default rootReducer;