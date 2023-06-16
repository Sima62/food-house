import "./HeaderCartButton.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";


const HeaderCartButton = (props) => {
  const cartCtx=useContext(CartContext);
  const numberOfCartItems=cartCtx.items.reduce((currentNumber,item)=>{
   return currentNumber+item.quantity;
  },0);

  return (
    <button className="button" onClick={props.onClick}>
      <span>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
