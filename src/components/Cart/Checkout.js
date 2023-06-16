import "./checkout.css";
import { useRef, useState } from "react";

//helper funtions

const isEmpty = (value) => value.trim() === "";
const isNotFiveChar = (value) => value.trim().length !== 5;
const isNotTenDigit = (value) => Number(value.trim()).length !== 10;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
    mobileNum: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputref = useRef();
  const cityInputref = useRef();
  const mobileNumInputref = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputref.current.value;
    const enteredCity = cityInputref.current.value;
    const enteredMobileNum = mobileNumInputref.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isNotFiveChar(enteredPostalCode);
    const enteredMobileNumIsValid = isNotTenDigit(enteredMobileNum);

    console.log(enteredPostalCode);
    console.log(enteredPostalCodeIsValid);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      mobileNum: enteredMobileNumIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredMobileNumIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    console.log(props.onSubmit);
    props.onSubmit({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postalCode:enteredPostalCode,
        phoneNumber:enteredMobileNum
    });
  };
  return (
    <form className="checkOutForm" onSubmit={confirmHandler}>
      <div className={`control ${formInputsValidity.name ? "" : "invalid"}`}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>please enter a valid name.</p>}
      </div>
      <div className={`control ${formInputsValidity.street ? '':'invalid'}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && <p>please enter a street name.</p>}
      </div>
      <div className={`control ${formInputsValidity.postalCode? '':'invalid'}`}>
        <label htmlFor="pincode">Postal Code</label>
        <input type="text" id="pincode" ref={postalCodeInputref}></input>
        {!formInputsValidity.postalCode && (
          <p>Postal code must be of 5 digit.</p>
        )}
      </div>
      <div className={`control ${formInputsValidity.city ? '':'invalid'}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputref}></input>
        {!formInputsValidity.city && <p>please enter a valid city name.</p>}
      </div>
      <div className={`control ${formInputsValidity.mobileNum ? '':'invalid'}`}>
        <label htmlFor="mobile">Phone No.</label>
        <input type="number" id="mobile" ref={mobileNumInputref}></input>
        {!formInputsValidity.mobileNum && (
          <p>please enter a valid mobile number.</p>
        )}
      </div>
      <div className="actions">
        <button>Confirm</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
