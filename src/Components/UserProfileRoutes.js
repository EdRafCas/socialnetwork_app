import React from 'react';
import {Route, Routes, useParams } from 'react-router-dom';
import TimelineUser from './TimelineUser';
import TimelineUserAlias from './TimelineUserAlias';
import TimelineLikes from './TimelineLikes';
import PrivateRoute from './PrivateRoute';


const UserProfileRoutes = ({userByAlias, changeAlert, stateAlert, changeStateAlert, user,currentUserInfo}) => {
  const {alias} =useParams();
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                    {currentUserInfo[0].alias===alias ?
                    <TimelineUser currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  />
                    :
                    <TimelineUserAlias currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  userByAlias={userByAlias}
                                  />
                    }
                </PrivateRoute>}/>
          
          <Route path={`/likes`} exact={true}
                element={
                <PrivateRoute>
                  <TimelineLikes currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}/>
                </PrivateRoute>}/>
          
        </Routes>
      );
}
 
export default UserProfileRoutes;
