import './MealItem.css'
import MealItemForm from './MealItemForm'
import { useContext } from 'react'
import CartContext from '../../../store/cart-context'

const MealItem=(props)=>{

    const cartCxt=useContext(CartContext)

    const price=`$${props.price.toFixed(2)}`

    const addToCartHandler=(quantity)=>{

        cartCxt.addItem({
            id:props.id,
            name:props.name,
            quantity:quantity,
            price:props.price
        })

    }

    return <li className='meal'>
        <div>
        <h3>{props.name}</h3>
        <div className='description'>{props.description}</div>
        <div className='price'>{price}</div>
        </div>
        <div>
           <MealItemForm onAddToCart={addToCartHandler}/> 
        </div>
    </li>
}

export default MealItem;