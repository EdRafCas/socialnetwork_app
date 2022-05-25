import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Timeline from './Timeline';
import PrivateRoute from './PrivateRoute';
import MessageBox from './MessageBox';
import UserProfile from './UserProfile';


const MainPageRoutes = ({currentUserInfo, addToTimeline, message, handleChange}) => {
  
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                  <MessageBox currentUserInfo={currentUserInfo}
                              addToTimeline={addToTimeline}
                              message={message}
                              handleChange={handleChange} />
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
