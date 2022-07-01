import React from 'react';
import {Route, Routes } from 'react-router-dom';
import TimelineUser from './TimelineUser';
import TimelineLikes from './TimelineLikes';
import PrivateRoute from './PrivateRoute';


const UserProfileRoutes = ({changeAlert, stateAlert, changeStateAlert, user,currentUserInfo}) => {
  
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                  <TimelineUser currentUserInfo={currentUserInfo}
                                user={user}
                                changeAlert={changeAlert}
                                stateAlert={stateAlert}
                                changeStateAlert={changeStateAlert}/>
                </PrivateRoute>}/>
          
          <Route path={`/likes`} exact={true}
                element={
                <PrivateRoute>
                  <TimelineLikes currentUserInfo={currentUserInfo}/>
                </PrivateRoute>}/>
          
        </Routes>
      );
}
 
export default UserProfileRoutes;
