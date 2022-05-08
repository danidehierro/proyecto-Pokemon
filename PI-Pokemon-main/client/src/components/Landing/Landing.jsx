import {Link} from 'react-router-dom';
import './Landing.css'
export default function Landing(){
    return(
        <div className='landing'>
            
           <h1> App Pokemón </h1>
          <Link to='/home'>
              <button className='botton'>WELCOME</button>
          </Link>

        </div>
    )
}