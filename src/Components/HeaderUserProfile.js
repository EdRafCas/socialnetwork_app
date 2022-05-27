import React from 'react';
import styled from 'styled-components';
import {NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import theme from '../Theme';
import Starboy from '../img/starboy.png';
import ProfileImage from '../img/profile_img.png'


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
      justify-content:flex-start;
      width:10rem;
      flex-direction:column;
      overflow:hidden;
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
      display:flex;
      width:100%;
      height:4rem;
      font-size:1rem;
      font-weight:800;
      color:white;
`


const HeaderUserProfile = ({currentUserInfo}) => {
      return ( 
            <HeaderUser>
                <BackgroundImage>
                  <img alt="userbackground" src={Starboy}/>
                </BackgroundImage>
                <ProfilePicContainer>
                  <ProfilePic>
                        <img alt="userprofile" src={ProfileImage}/>
                  </ProfilePic>
                </ProfilePicContainer>
                

                <UserCard>
                  <NamesContainer>
                    <NameContainer>{currentUserInfo[0].name}</NameContainer>
                    <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
                    <Bio>This is a placeholder</Bio>
                  </NamesContainer>
                </UserCard>
              </HeaderUser>
       );
}
 
export default HeaderUserProfile;