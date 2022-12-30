import React,{useEffect, useState} from 'react';
import UserProfileRoutes from './UserProfileRoutes';
import '../index.css'
import HeaderUserProfile from './HeaderUserProfile';
import {LinksContainer, RedirectLink} from '../Elements/ElementsTimeline'



const ProfileUser = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile, alias}) => {

      const [loadingUserProfile, changeLoadingUserProfile] =useState(true)
      useEffect(()=>{
            const ObtainProfileUser = async() =>{
                  changeLoadingUserProfile(false)         
                  console.log("loading profileUser")
            }
            ObtainProfileUser();    
      },[currentUserInfo, showEditProfile, alias])

      return ( 
            <>
            {!loadingUserProfile ?
            <>
            <HeaderUserProfile 
                  currentUserInfo={currentUserInfo}
                  changeShowEditProfile={changeShowEditProfile}
                  showEditProfile={showEditProfile}/>
            <LinksContainer>
                  <RedirectLink to =""> 
                  Messages
                  </RedirectLink>
                  <RedirectLink to ={`/user/${alias}/messages&comments`}> 
                  Messages & Comments 
                  </RedirectLink>
                  <RedirectLink to ={`/user/${alias}/likes`}> 
                  Likes
                  </RedirectLink>
            </LinksContainer>
            <UserProfileRoutes 
                  currentUserInfo={currentUserInfo}
                  changeAlert={changeAlert} 
                  stateAlert={stateAlert} 
                  changeStateAlert={changeStateAlert} 
                  user={user}/>
            </>
            :
            ""}
            </>
            
      );
}
 
export default ProfileUser;
