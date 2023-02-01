import React,{useContext} from 'react';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import ProfileImage from '../img/profile_avatar.png';
import {HeaderUser,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton, BackgroundImageUser, BackgroundImageUserContainer, EmptyBackground, EmptyProfilePic} from './../Elements/ElemenstProfile'
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';


const HeaderUserProfileAlias = ({loadingUserData,userByAlias, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {alias} =useParams();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      return ( 
            <>
            {!loadingUserData ?
                  <HeaderUser >
                        <BackgroundImageUserContainer>
                              {userByAlias[0].backgroundURL ?
                              <BackgroundImageUser onClick={()=>receiveNotification({
                                    notification:"backgroundPicture",
                                    changeShowPopUp, 
                                    changePopUpAlert,
                                    backgroundPicture:userByAlias[0].backgroundURL})}>
                              <img alt="userbackground" src={userByAlias[0].backgroundURL}/>
                              </BackgroundImageUser>
                              :
                              <EmptyBackground/>
                              }
                        </BackgroundImageUserContainer>
                        <ProfilePicContainer>
                              {userByAlias[0].photoURL ?
                              <ProfilePic onClick={()=>receiveNotification({
                                    notification:"profilePicture",
                                    changeShowPopUp, 
                                    changePopUpAlert,
                                    profilePicture:userByAlias[0].photoURL})}>
                                    <img alt="UserAvatar" src={userByAlias[0].photoURL} />
                              </ProfilePic>
                              :
                              <EmptyProfilePic>
                                    <img alt="DefaultAvatar" src={ProfileImage}/>
                              </EmptyProfilePic>
                              }
                        {alias === currentUserInfo[0].alias &&
                        <EditButton onClick={()=>changeShowEditProfile(!showEditProfile)} >
                              <p>Edit Profile</p>
                        </EditButton>
                        }
                        </ProfilePicContainer>
                        <UserCard>
                        <NamesContainer>
                              <NameContainer>{userByAlias[0].name}</NameContainer>
                              <AliasContainer>@{userByAlias[0].alias}</AliasContainer>
                        </NamesContainer>
                        <Bio>
                              
                        {userByAlias[0].bio ? 
                        <span>{userByAlias[0].bio}</span>
                        :""}
                        </Bio>
                        </UserCard>
                  </HeaderUser>
            :
            <p>Error loading Header</p>
            }
            </>
       );
}
 
export default HeaderUserProfileAlias;