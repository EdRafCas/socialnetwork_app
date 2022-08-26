import React from 'react';
import styled from 'styled-components';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';
import { useAuth } from '../Context/AuthContext';
import {HeaderUser,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton} from './../Elements/ElemenstProfile'

const BackgroundImageUser =styled.div`
      /* border:solid red 1px; */
      overflow:hidden;
      height:380px;
      width:100%;
            img{
            max-width:50rem;
            width:100%;
            height:auto;
            overflow:hidden;
            }
`


const HeaderUserProfile = ({currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {user} =useAuth();
      const {alias} =useParams();
      console.log("HeaderUserProfile")
      

      return ( 
            <HeaderUser>
                <BackgroundImageUser>
                  {currentUserInfo[0].backgroundURL ?
                  <img alt="userbackground" src={currentUserInfo[0].backgroundURL}/>
                  :
                  <img alt="userbackground" src={Starboy}/>
                  }
                </BackgroundImageUser>
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