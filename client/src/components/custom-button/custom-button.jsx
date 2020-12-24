import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({children, isGoogeleSignIn,inverted,...otherprops}) =>
(
    <button
     className={`${inverted ? 'inverted':''}  
                 ${isGoogeleSignIn ? 'google-sign-in':''} custom-button`} 
     {...otherprops}>
        {children}
    </button>
);

export default CustomButton;