import React from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import App from './App'
import Login from './features/login/Login'
import { useSelector} from 'react-redux';

import ProtectedRoute from './features/routing/ProtectedRoute';

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.user.auth);

    return(
        <BrowserRouter>
            <Route path='/login'><Login/></Route> 
            <ProtectedRoute path='/home' component={App} isAuth={isAuthenticated}/>

            {isAuthenticated ?(<Redirect to='/home'/>): (<Redirect to='/login'/>)}
            
        </BrowserRouter>
      
)};

export default AppRouter; 