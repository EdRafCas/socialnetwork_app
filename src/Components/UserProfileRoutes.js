import React from 'react';
import {Route, Routes} from 'react-router-dom';
import TimelineUser from './TimelineUser';
import TimelineUserMessages from './TimelineUserMessages';
import TimelineLikesUser from './TimelineLikesUser';
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
                                  changeStateAlert={changeStateAlert}
                                  />
                </PrivateRoute>}/>
          <Route path={`/messages&comments`} exact={true}
                element={
                <PrivateRoute>
                    <TimelineUserMessages currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  />
                </PrivateRoute>}/>
          <Route path={`/likes`} exact={true}
                element={
                <PrivateRoute>
                  <TimelineLikesUser currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}/>
                </PrivateRoute>}/>
          
        </Routes>
      );
}
 
export default UserProfileRoutes;
