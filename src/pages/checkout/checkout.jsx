import {React} from "react";
import './checkout.styles.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartTotal,selectCartItems} from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

const CheckoutPage = ({cartItems, cartTotal}) => {
    return(
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/> 
            ))}
            <div className='total'>Total: ${cartTotal}</div>
            <StripeCheckoutButton price={cartTotal} />
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartTotal: selectCartTotal,
    cartItems: selectCartItems
})



export default connect(mapStateToProps)(CheckoutPage);