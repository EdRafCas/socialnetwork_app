import React from 'react';
import {Route, Routes } from 'react-router-dom';
import TimelineUser from './TimelineUser';
import Timeline from './Timeline';
import PrivateRoute from './PrivateRoute';


const UserProfileRoutes = ({currentUserInfo}) => {
  
      return ( 
        <Routes>
          <Route path="/" exact={true}
                element={
                <PrivateRoute>
                  <TimelineUser currentUserInfo={currentUserInfo}/>
                </PrivateRoute>}/>
          
          <Route path={`/likes`} exact={true}
                element={
                <PrivateRoute>
                  <Timeline currentUserInfo={currentUserInfo}/>
                </PrivateRoute>}/>
          
        </Routes>
      );
}
 
export default UserProfileRoutes;
