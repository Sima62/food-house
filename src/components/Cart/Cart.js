import "./cart.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const [isCheckout, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCxt.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };
  const orderHandler = () => {
    setIsCheckOut(true);
  };
  const SubmitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-2247f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCxt.items,
        }),
      }
    );
    setIsSubmitting(true);
    setDidSubmit(true);
    setIsSubmitting(false);
    cartCxt.clearCart();
  };
  const hasItems = cartCxt.items.length > 0;
  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;

  const cartItems = (
    <ul className="cart-items">
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalAction = (
    <div className="actions">
      <button className="button-alt" onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className="total">
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onCancel={props.onHideCart} onSubmit={SubmitOrderHandler} />
      )}
      {!isCheckout && modalAction}
    </Fragment>
  );
  const isSubmittingContent = (
    <fragment>
      <p>Successfully submitted the data...</p>
      <button className="button" onClick={props.onHideCart}>
        Close
      </button>
    </fragment>
  );
  return (
    <Modal onCloseCart={props.onHideCart}>
      {isSubmitting && <p>Submitting the data...</p>}
      {!isSubmitting && !didSubmit && cartModalContent}
      {!isSubmitting && didSubmit && isSubmittingContent}
    </Modal>
  );
};

export default Cart;
