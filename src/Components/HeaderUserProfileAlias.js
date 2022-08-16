import React from 'react';
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';

import {HeaderUser,BackgroundImage,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton} from './../Elements/ElemenstProfile'


const HeaderUserProfileAlias = ({userByAlias,loadingUserData, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {alias} =useParams();
      return ( 
            <>
            {!loadingUserData &&
                  <HeaderUser >
                        <BackgroundImage>
                        <img alt="userbackground" src={Starboy}/>
                        </BackgroundImage>
                        <ProfilePicContainer>
                        <ProfilePic>
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