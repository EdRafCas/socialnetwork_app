import React from 'react';
import {Route, Routes} from 'react-router-dom';
import TimelineUserAlias from './TimelineUserAlias';
import TimelineLikesAlias from './TimelineLikesAlias';
import PrivateRoute from './PrivateRoute';


const UserProfileRoutesAlias = ({userByAlias, changeAlert, stateAlert, changeStateAlert, user,currentUserInfo}) => {
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                    <TimelineUserAlias 
                                  currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  userByAlias={userByAlias}
                                  />
                </PrivateRoute>}/>
          <Route path={`/likes`} exact={true}
                element={
                <PrivateRoute>
                  <TimelineLikesAlias currentUserInfo={currentUserInfo}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  userByAlias={userByAlias}
                                  />
                </PrivateRoute>}/>
          
        </Routes>
      );
}
 
export default UserProfileRoutesAlias;
