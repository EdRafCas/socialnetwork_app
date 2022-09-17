import React,{useContext} from 'react';
import styled from 'styled-components'
import {useParams } from 'react-router-dom';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';
import {HeaderUser,BackgroundImage,ProfilePicContainer, ProfilePic, UserCard, NamesContainer, Bio, EditButton} from './../Elements/ElemenstProfile'
import receiveNotification from './ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';

const EmptyBackground =styled.div`
      /* border:solid red 1px; */
      overflow:hidden;
      height:380px;
      width:100%;
      cursor:pointer;
      display:flex;
      justify-content:center;
      background:#000;
      /* img{
            max-width:55rem;
            width:100%;
            height:auto;
            overflow:hidden;
            } */
`

const EmptyProfilePic =styled.div`
      /* border: solid red 1px; */
      position: absolute;
      top:-5rem;
      left:1rem;
      padding:0;
      border-radius:50%;
      height:auto;
      display:flex;
      flex-direction:column;
      justify-content:center;
      width:10rem;
      height:10rem;
      flex-direction:column;
      overflow:hidden;
      background:#000;
      cursor:pointer;
      /* img{
            width:100%;
      } */
`

const HeaderUserProfileAlias = ({loadingUserData,userByAlias, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {alias} =useParams();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      return ( 
            <>
            {!loadingUserData &&
                  <HeaderUser >
                        {userByAlias[0].backgroundURL ?
                        <BackgroundImage onClick={()=>receiveNotification({
                              notification:"backgroundPicture",
                              changeShowPopUp, 
                              changePopUpAlert,
                              backgroundPicture:userByAlias[0].backgroundURL})}>
                        <img alt="userbackground" src={userByAlias[0].backgroundURL}/>
                        </BackgroundImage>
                        :
                        <EmptyBackground/>
                        }
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