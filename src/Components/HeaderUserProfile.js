import React from 'react';
import styled from 'styled-components';
import {PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import theme from '../Theme';
import Starboy from '../img/starboy.png'


const HeaderUser =styled.div`
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:1rem;
      width:100%;
      height:30rem;
      border:solid red 1px;
`

const BackgroundImage =styled.div`
      border:solid red 1px;
      overflow:hidden;
      img{
      max-width:50rem;
      width:100%;
      overflow:hidden;
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