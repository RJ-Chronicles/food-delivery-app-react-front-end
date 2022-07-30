import { useContext,useEffect,useState } from 'react';

import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
const HeaderCartButton = (props)=>{
    const [btnIsHighLighted, setButtonIsHighLighted] = useState(false);
    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber+ item.amount;
    },0);
    const btnClasses =`${classes.button} ${ btnIsHighLighted? classes.bump :''}`
    const {items} = cartCtx;
    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setButtonIsHighLighted(true)
        const timer = setTimeout(()=>{
            setButtonIsHighLighted(false)
        },300)

        return()=>{
            clearTimeout(timer);
        }
    },[items])
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Card</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;