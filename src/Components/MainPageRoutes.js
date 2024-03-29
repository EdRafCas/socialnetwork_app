import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Timeline from './Timeline';
import PrivateRoute from './PrivateRoute';
import ProfileContainer from './ProfileContainer';
import BookmarksUser from './BookmarksUser';
import StatusMessage from './StatusMessage';



const MainPageRoutes = ({changeAlert, messageAlert, stateAlert, changeStateAlert, user, currentUserInfo,addToTimeline,message, handleChange, showEditProfile, changeShowEditProfile}) => {
  
      return ( 
        <Routes>
          <Route path="" exact={true}
                element={
                <PrivateRoute>
                  <Timeline user={user}
                            currentUserInfo={currentUserInfo}
                            addToTimeline={addToTimeline}
                            message={message}
                            handleChange={handleChange}
                            messageAlert={messageAlert}
                            changeAlert={changeAlert}
                            stateAlert={stateAlert}
                            changeStateAlert={changeStateAlert}
                            />
                </PrivateRoute>}/>
          <Route path="/user/:alias/*" exact={true} 
                  element={
                  <PrivateRoute>
                    <ProfileContainer  currentUserInfo={currentUserInfo}
                                  showEditProfile={showEditProfile}
                                  changeShowEditProfile={changeShowEditProfile}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  />
                  </PrivateRoute>
                }/>
          <Route path="/user/:alias/status/:id" exact={true} 
                  element={
                  <PrivateRoute>
                    <StatusMessage currentUserInfo={currentUserInfo}
                                  showEditProfile={showEditProfile}
                                  changeShowEditProfile={changeShowEditProfile}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  />
                  </PrivateRoute>
                }/>
          <Route path="/user/Bookmarks" exact={true} 
                  element={
                  <PrivateRoute>
                    <BookmarksUser  currentUserInfo={currentUserInfo}
                                  showEditProfile={showEditProfile}
                                  changeShowEditProfile={changeShowEditProfile}
                                  user={user}
                                  changeAlert={changeAlert}
                                  stateAlert={stateAlert}
                                  changeStateAlert={changeStateAlert}
                                  />
                  </PrivateRoute>
                }/>
        </Routes>
      );
}
 
export default MainPageRoutes;
