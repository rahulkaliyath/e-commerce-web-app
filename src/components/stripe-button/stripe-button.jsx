import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Hzn1hLLexBztCzgFt3t5R22e7Uf70b0hf2unyFTcFcJyV444s857m9nS7LZd1a4s7lo4bpUvVC4QfPp9mfgE6nP00B0dNlJ9O';

    const onToken = token => {
        console.log(token);
    };

    return (
        <StripeCheckout 
            label='Pay Now'
            name = 'E-Commerce Shop'
            billingAddress
            shippingAddress
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token = {onToken}
            stripeKey={publishableKey}

        />
    )
};

export default StripeCheckoutButton;