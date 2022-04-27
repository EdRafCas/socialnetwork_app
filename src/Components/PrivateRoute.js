import React from 'react';
import { useAuth } from '../Context/AuthContext';
import {Navigate } from 'react-router-dom';



const PrivateRoute = ({children}) => {
      const {user} =useAuth();

     if(user){
           return children;
     } else{
            return <Navigate replace to="/LoginPage"/>;

     }
}
 
export default PrivateRoute;