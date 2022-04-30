import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <div>
           <h1> App Pokemón </h1>
          <Link to='/pokemons'>
              <button>WELCOME</button>
          </Link>

        </div>
    )
}