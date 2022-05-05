import { POKEMONS } from "../actions"






const initialState = {
    pokemons : [],
    allPokemons: [],
    types: [],
    detail:[]

}


function rootReducer (state= initialState, action ) {
    switch(action.type) {
        case POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
      }
      case 'GET_NAME_POKEMONS':
      return{
          ...state,
          pokemons: action.payload
         
      }
  case 'FILTER_BY_TYPES':
      let allPokemons = state.allPokemons;
      let typesFiltered = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.types[0] === action.payload || el.types[1] === action.payload)
      console.log(typesFiltered)
       
      return{
          ...state,
          pokemons: typesFiltered
      }
      case 'FILTER_CREATED':
        const createdFilter = action.payload === 'created' ? state.allPokemons.filter(e => e.createdInDb) : state.allPokemons.filter(e => !e.createdInDb)
           console.log('soy el reducer',createdFilter)
        return{
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
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