import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Timeline from './Timeline';
import PrivateRoute from './PrivateRoute';
import UserProfile from './UserProfile';


const MainPageRoutes = ({currentUserInfo}) => {
  
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                  <Timeline currentUserInfo={currentUserInfo}/>
                </PrivateRoute>}/>

          <Route path="/user/:alias/*" exact={true} 
                  element={
                   
                  <PrivateRoute>
                    <UserProfile currentUserInfo={currentUserInfo}/>
                  </PrivateRoute>
                    
                }/>
        </Routes>
      );
}
 
export default MainPageRoutes;
