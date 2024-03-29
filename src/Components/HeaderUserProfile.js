import React,{useContext} from 'react';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_avatar.png';
import { useAuth } from '../Context/AuthContext';
import {HeaderUser,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton, EmptyProfilePic, BackgroundImageUser, BackgroundImageUserContainer, EmptyBackground} from './../Elements/ElemenstProfile'
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';


const HeaderUserProfile = ({currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {user} =useAuth();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      /* console.log("HeaderUserProfile") */
      return ( 
            <HeaderUser>
                  <BackgroundImageUserContainer>
                        {currentUserInfo[0].backgroundURL ?
                        <BackgroundImageUser onClick={()=>receiveNotification({
                                          notification:"backgroundPicture",
                                          changeShowPopUp, 
                                          changePopUpAlert,
                                          backgroundPicture:currentUserInfo[0].backgroundURL})}>
                              <img alt="userbackground" src={currentUserInfo[0].backgroundURL}/>
                        </BackgroundImageUser>
                        :
                        <EmptyBackground/>
                        }
                  </BackgroundImageUserContainer>
                  <ProfilePicContainer>
                  {user.photoURL ?
                        <ProfilePic onClick={()=>receiveNotification({
                                    notification:"profilePicture",
                                    changeShowPopUp, 
                                    changePopUpAlert,
                                    profilePicture:currentUserInfo[0].photoURL})}>
                              <img alt="UserAvatar" src={user.photoURL} />
                        </ProfilePic>
                        :
                        <EmptyProfilePic>
                              <img alt="DefaultAvatar" src={ProfileImage}/>
                        </EmptyProfilePic>
                        }
                        <EditButton onClick={()=>changeShowEditProfile(!showEditProfile)} >
                              <p>Edit Profile</p>
                        </EditButton>
                  </ProfilePicContainer>
                  <UserCard>
                        <NamesContainer>
                        <NameContainer>{currentUserInfo[0].name}</NameContainer>
                        <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
                        </NamesContainer>
                        <Bio>
                              
                        {currentUserInfo[0].bio ?
                        <span>{currentUserInfo[0].bio}</span> 
                        :""}
                        </Bio>
                  </UserCard>
              </HeaderUser>
       );
}
 
export default HeaderUserProfile;