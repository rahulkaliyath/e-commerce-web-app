import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';
import { connect } from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import {withRouter} from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.action';


const CartDropdown = ({cartItems,history,dispatch}) =>(
    <div className='cart-dropdown'>
        <div className='cart-items'>
            { 
            cartItems.length ?
                (cartItems.map(cartItem =>
                (<CartItem key={cartItem.id} item={cartItem}/>)))
            : (
                <span className='empty-message'> Your Cart is Empty</span>
            )
            }
        
        </div>
        { cartItems.length ?
        <CustomButton onClick={()=> 
            {history.push('/checkout')
            dispatch(toggleCartHidden())}}>GO TO CHECKOUT</CustomButton>
        :null
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));