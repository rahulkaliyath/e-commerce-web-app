import React from 'react';
import SignIn from '../../components/sign-in/sign-in.jsx';
import SignUp from '../../components/sign-up/sign-up.jsx';
import './sign-in-up.styles.scss';

const SignInUp = () => {
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInUp;