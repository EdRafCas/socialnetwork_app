import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Timeline from './Timeline';
import PrivateRoute from './PrivateRoute';
import UserProfile from './UserProfile';


const MainPageRoutes = ({user, currentUserInfo,addToTimeline,message, handleChange, showEditProfile, changeShowEditProfile}) => {
  
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                  <Timeline user={user}
                            currentUserInfo={currentUserInfo}
                            addToTimeline={addToTimeline}
                            message={message}
                            handleChange={handleChange}/>
                </PrivateRoute>}/>

          <Route path="/user/:alias/*" exact={true} 
                  element={
                   
                  <PrivateRoute>
                    <UserProfile currentUserInfo={currentUserInfo}
                                  showEditProfile={showEditProfile}
                                  changeShowEditProfile={changeShowEditProfile}
                    />
                  </PrivateRoute>
                    
                }/>
        </Routes>
      );
}
 
export default MainPageRoutes;
