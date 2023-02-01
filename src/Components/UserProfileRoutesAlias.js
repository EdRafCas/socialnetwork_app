import React,{useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import TimelineUserAlias from './TimelineUserAlias';
import TimelineUserAliasMessage from './TimelineUserAliasMessage';
import TimelineLikesAlias from './TimelineLikesAlias';
import PrivateRoute from './PrivateRoute';



const UserProfileRoutesAlias = ({userByAlias, changeAlert, stateAlert, changeStateAlert, user,currentUserInfo,alias}) => {
      const [loadingAliasRoute, changeLoadingAliasRoute] =useState(true)

      useEffect(()=>{
            const ObtainAliasRoutes = async() =>{
                  if(userByAlias[0].uidUser){
                       /*  console.log(userByAlias)     */
                        changeLoadingAliasRoute(false) 
                  } else{
                        console.log("user not found")
                  }
       
            }
            ObtainAliasRoutes();    
      },[currentUserInfo, alias, userByAlias])

      return ( 
            <>
            {!loadingAliasRoute ?
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
                                    userByAlias={userByAlias}/>
                  </PrivateRoute>}/>
            <Route path={`/messages&comments`} exact={true}
                  element={
                  <PrivateRoute>
                        <TimelineUserAliasMessage 
                                    currentUserInfo={currentUserInfo}
                                    user={user}
                                    changeAlert={changeAlert}
                                    stateAlert={stateAlert}
                                    changeStateAlert={changeStateAlert}
                                    userByAlias={userByAlias}/>
                  </PrivateRoute>}/>
            <Route path={`/likes`} exact={true}
                  element={
                  <PrivateRoute>
                        <TimelineLikesAlias currentUserInfo={currentUserInfo}
                                    user={user}
                                    changeAlert={changeAlert}
                                    stateAlert={stateAlert}
                                    changeStateAlert={changeStateAlert}
                                    userByAlias={userByAlias}/>
                  </PrivateRoute>}/>
            
            </Routes>
            :
            <p>Error loading routes</p>
            }
            </>
      );
}
 
export default UserProfileRoutesAlias;
