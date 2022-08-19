import classes from './Checkout.module.css'
import {useRef, useState} from 'react'
const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city:true,
        postalCode: true
    })


    const confirmHandler = (event) => {
        event.preventDefault();
        const name = nameInputRef.current.value;
        const city = cityInputRef.current.value;
        const street = streetInputRef.current.value;
        const postal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(name);
        const enteredCityIsValid = !isEmpty(city);
        const enteredStreetIsValid = !isEmpty(street);
        const enteredPostalCode = isFiveDigits(postal);

        setFormInputValidity(({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city : enteredCityIsValid,
            postalCode: enteredPostalCode
        }))
        const formIsValid = enteredCityIsValid 
                            && enteredNameIsValid 
                            && enteredStreetIsValid 
                            && enteredPostalCode
        
        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name,
            street,
            city,
            postal
        })
    }
    const isEmpty = (value) => value.trim() === '';
    const isFiveDigits = (value)=> value.trim().length ===5;

    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '': classes.invalid}`
    const streeControlClasses = `${classes.control} ${formInputValidity.street ? '': classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? '': classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputValidity.postalCode ? '': classes.invalid}`
    
    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name'  ref={nameInputRef}/>
                {!formInputValidity.name &&<p>Please entere valid name</p>}
            </div>
            <div className={streeControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputValidity.street &&<p>Please enter valid street</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal code</label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {!formInputValidity.postalCode &&<p>Please enter valid postalcode of 5 digits</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputValidity.city &&<p>Please enter valid city name</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;