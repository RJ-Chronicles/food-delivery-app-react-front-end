import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef, useState } from 'react';
const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountinputRef = useRef();
    const submitHandler = event =>{
        event.preventDefault();
        const enteredAmount = amountinputRef.current.value;
        const enteredAmountNumber = + enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return <form onSubmit={submitHandler} className={classes.form}>
        <Input 
            label='Amount' 
            ref={amountinputRef}
            input={{
                type: "number",
                id: "amount_"+props.id,
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} 
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1 to 5)</p>}
    </form>
}
export default MealItemForm;