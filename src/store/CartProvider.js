import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.quantity;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case "REMOVE_CART_ITEM":
      const removedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const itemTobeRemoved = state.items[removedItemIndex];
      const remainingAmount=state.totalAmount-itemTobeRemoved.price;
      let remainingItems;

      if (itemTobeRemoved.quantity > 1) {
        const remainingItem = {
          ...itemTobeRemoved,
          quantity: itemTobeRemoved.quantity - 1,
        };
        remainingItems = [...state.items];
        remainingItems[removedItemIndex] = remainingItem;
      } else {
        remainingItems = state.items.filter(
          (item) => item.id !== action.payload
        );
      }
      return {
        items:remainingItems,
        totalAmount:remainingAmount
      };

    case "CLEAR_CART":
      return defaultCartState;  
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", payload: id });
  };
  const clearCartHandler=()=>{
    dispatchCartAction({type:'CLEAR_CART'})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart:clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
