import "./MealItemform.css";
import Input from "../../UI/Input";
import { useRef,useState } from "react";

const MealItemForm = (props) => {
  const[quantityIsValid,setQuantityIsValid]=useState(true); 
  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = quantityInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmount.trim().length===0||enteredAmountNumber<1||enteredAmountNumber>5){
       setQuantityIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: "quantity" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button> + Add</button>
      {!quantityIsValid &&<p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
