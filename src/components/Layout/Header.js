import { Fragment } from "react"
import mealsImg from '../../assets/meals.jpeg'
import './header.css'
import HeaderCartButton from './HeaderCartButton'
const Header=(props)=>{
    return (
        <Fragment>
         <header className='header'>
            <h1>Reactmeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
         </header>
         <div className='main-image'>
            <img src={mealsImg} alt='A table full of food'></img>
         </div>
        </Fragment>
    )
}
export default Header;