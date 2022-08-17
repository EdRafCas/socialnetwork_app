import React from 'react';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';
import { useAuth } from '../Context/AuthContext';
import {HeaderUser,BackgroundImage,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton} from './../Elements/ElemenstProfile'


const HeaderUserProfile = ({currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {user} =useAuth();
      const {alias} =useParams();
      console.log("HeaderUserProfile")
      

      return ( 
            <HeaderUser>
                <BackgroundImage>
                  <img alt="userbackground" src={Starboy}/>
                </BackgroundImage>
                <ProfilePicContainer>
                  <ProfilePic>
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