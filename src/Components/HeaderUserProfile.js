import React from 'react';
import styled from 'styled-components';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import theme from '../Theme';
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_avatar.png';
import { useAuth } from '../Context/AuthContext';

const HeaderUser =styled.div`
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:0rem;
      width:100%;
      height:auto;
      border:solid red 1px;
`
const BackgroundImage =styled.div`
      border:solid red 1px;
      overflow:hidden;
      height:auto;
            img{
            max-width:50rem;
            width:100%;
            overflow:hidden;
            }
`
const ProfilePicContainer=styled.div`
      display:flex;
      width:100%;
      height:6rem;    
      position: relative;
      border: solid red 1px;
`
const ProfilePic =styled.div`
      border: solid red 1px;
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
      img{
      width:100%;
      }
`
const UserCard =styled.div`
      padding:1rem;
      height:10rem;
      display:flex;
      flex-direction:column;
      border:solid red 1px;

`
const NamesContainer=styled.div`
      display:flex;
      flex-direction:column;
      gap:5px;

`
const Bio=styled.div`
      padding:1rem 0rem;
      display:flex;
      width:100%;
      height:4rem;
      font-size:1rem;
      font-weight:800;
      color:white;
`
const EditButton=styled.button`
      position:absolute;
      top:1rem;
      right:1rem;
      display:flex;
      height:3rem;
      width:10rem;
      border-radius:9999px;
      padding:0rem;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:${theme.GradientBackround};
            p{
            font-size:1rem;
            font-weight:1000;
            color:white;
                  }
      :hover{
            background:${theme.RedDark}};
            }
      :active{
            border:solid black 3px;
            p{
                  color:black;

            }
      }

`

const HeaderUserProfile = ({currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {user} =useAuth();
      

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