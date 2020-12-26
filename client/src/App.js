import React from 'react';
import './App.scss';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Homepage} from './pages/homepage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx';
import Header from './components/header/header.jsx';
import SignInUp from './pages/sign-in-up/sign-in-up.jsx';
import CheckoutPage from './pages/checkout/checkout';
import {auth,createUserProfileDocument} from './firebase/firebase.utils.js';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';


class App extends React.Component{


  unsubscribeFromAuth = null;
  
  componentDidMount() {
  const {setCurrentUser} =this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {

      if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
      });
    }
    else{
      setCurrentUser(userAuth);
    }
  }
    );
  }
  

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch >
        <Route exact path='/'  component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' 
          render={() =>
            this.props.currentUser ?(
              <Redirect to='/' />) :
              (<SignInUp />)
          }
        />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps =  createStructuredSelector({
  currentUser:selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
