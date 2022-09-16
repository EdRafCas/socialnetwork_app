import React,{useContext} from 'react';
import styled from 'styled-components';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';
import { useAuth } from '../Context/AuthContext';
import {HeaderUser,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton} from './../Elements/ElemenstProfile'
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';


const BackgroundImageUser =styled.div`
      /* border:solid red 1px; */
      overflow:hidden;
      height:380px;
      width:100%;
      cursor:pointer;
      display:flex;
      justify-content:center;
      img{
            max-width:55rem;
            width:100%;
            height:auto;
            overflow:hidden;
            }
`


const HeaderUserProfile = ({currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {user} =useAuth();
      const {alias} =useParams();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      console.log("HeaderUserProfile")
      

      return ( 
            <HeaderUser>
                <BackgroundImageUser onClick={()=>receiveNotification({
                        notification:"backgroundPicture",
                        changeShowPopUp, 
                        changePopUpAlert,
                        backgroundPicture:currentUserInfo[0].backgroundURL})}>
                  {currentUserInfo[0].backgroundURL ?
                  <img alt="userbackground" src={currentUserInfo[0].backgroundURL}/>
                  :
                  <img alt="userbackground" src={Starboy}/>
                  }
                </BackgroundImageUser>
                <ProfilePicContainer>
                  <ProfilePic onClick={()=>receiveNotification({
                        notification:"profilePicture",
                        changeShowPopUp, 
                        changePopUpAlert,
                        profilePicture:currentUserInfo[0].photoURL})}>
                        {user.photoURL ?
                        <img alt="UserAvatar" src={user.photoURL} />
                        :
                        <img alt="DefaultAvatar" src={ProfileImage}/>
                        }
                  </ProfilePic>
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
                  {currentUserInfo[0].bio ? currentUserInfo[0].bio
                  :""}
                  </Bio>
                </UserCard>
              </HeaderUser>
       );
}
 
export default HeaderUserProfile;