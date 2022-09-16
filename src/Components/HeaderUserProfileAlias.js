import React,{useContext} from 'react';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';
import {HeaderUser,BackgroundImage,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton} from './../Elements/ElemenstProfile'
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';

const HeaderUserProfileAlias = ({loadingUserData,userByAlias, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {alias} =useParams();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      return ( 
            <>
            {!loadingUserData &&
                  <HeaderUser >
                        <BackgroundImage onClick={()=>receiveNotification({
                        notification:"backgroundPicture",
                        changeShowPopUp, 
                        changePopUpAlert,
                        backgroundPicture:userByAlias[0].backgroundURL})}>
                        {userByAlias[0].backgroundURL ?
                        <img alt="userbackground" src={userByAlias[0].backgroundURL}/>
                        :
                        <img alt="userbackground" src={Starboy}/>
                        }
                        </BackgroundImage>
                        <ProfilePicContainer>
                        <ProfilePic onClick={()=>receiveNotification({
                        notification:"profilePicture",
                        changeShowPopUp, 
                        changePopUpAlert,
                        profilePicture:userByAlias[0].photoURL})}>
                              {userByAlias[0].photoURL ?
                              <img alt="UserAvatar" src={userByAlias[0].photoURL} />
                              :
                              <img alt="DefaultAvatar" src={ProfileImage}/>
                              }
                        </ProfilePic>
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
                        {userByAlias[0].bio ? userByAlias[0].bio
                        :""}
                        </Bio>
                        </UserCard>
                  </HeaderUser>
            }
            </>
       );
}
 
export default HeaderUserProfileAlias;