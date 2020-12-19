import React from 'react';
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingCart} from '../../assets/shopping-bag.svg';
import {connect} from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({cartItemsCount,toggleCartHidden}) =>(
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingCart className='shopping-icon'/>
        <span className='item-count'>{cartItemsCount}</span>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItemsCount: selectCartItemsCount
});

const mapPropsToDispatch = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});



export default connect(mapStateToProps,mapPropsToDispatch)(CartIcon);