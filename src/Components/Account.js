import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import ProfileImage from '../img/profile_img.png'
import { PortraitContainer, NameContainer, AliasContainer} from '../Elements/ElementsFormulary'
import {ReactComponent as IconHome} from '../img/home_icon.svg';
import {ReactComponent as IconProfile} from '../img/profile_icon.svg';
import {ReactComponent as IconBookmark} from '../img/bookmark_icon.svg';

const AccountManagement=styled.div`
  display:flex;
  height:100%;
  width:100%;
  padding:0rem 0rem;
  flex-direction:column;
  justify-content:space-between;
  border:solid ${theme.BorderColor} 1px;
`
const GeneralMenu = styled.div`
  width:100%;
  /* height:500px; */
  padding:0rem 0rem;
  display:flex;
  flex-direction:column;
  align-content:center;
  gap:2rem;
  border:solid ${theme.BorderColor} 1px;
`
const MiniProfile=styled.div`
  display:flex;
  height:5rem;
  width:100%;
  border-radius:9999px;
  padding:1rem;
  flex-direction:row;
  justify-content:center;
  align-content:center;
  /* border:solid red 1px; */
  :hover{
    background:${theme.GradientBackround};
  }
`

const MiniUserNames =styled.div`
  display:flex;
  flex-direction:column;
  padding:0rem 1rem;
  gap:5px;
`

const MenuLink=styled(Link)`
  width:100%;
  padding:1rem;
  /* border:1px solid white; */
  border-radius:9999px;
  display:flex;
  flex-direction:row;
  align-items:center;
  height:4.5rem;
  gap:1rem;
  text-decoration:none;
  color:${theme.Text};
  p{
    font-size:1.5rem;
    font-weight:800;
  }
  :hover{
    background:${theme.GradientBackround};
  }
`

const IconContainer=styled.div`
  border-radius:50%;
  display:flex;
  align-items:center;
  height:2.5rem;
  /* border:1px solid white; */
  fill:currentcolor;
  
    svg{
      max-height:2rem;
      fill:white;
    }
  :active{
    background:white;;
    fill:black;
  }
`
const MessageButtonContainer=styled.div`
  display:flex;
  height:100%;
  flex-direction:column;
  justify-content:flex-start;
  /* border:solid red 1px; */
  padding:2rem 1rem;
`
const MessageButton=styled.button`
  display:flex;
  height:5rem;
  width:100%;
  border-radius:9999px;
  padding:1rem;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  /* border:solid red 1px; */
  background:${theme.GradientBackround};
  p{
    font-size:1.2rem;
    font-weight:1000;
    color:white;
    /* border:solid red 1px; */
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

const Account = ({currentUserInfo, showMessageBox, changeShowMessageBox}) => {
      return ( 
            <AccountManagement>
              <GeneralMenu>
                <MenuLink to="">
                  <IconContainer><IconHome/></IconContainer><p>HOME</p>
                </MenuLink>
                <MenuLink to={`/user/${currentUserInfo[0].alias}`}>
                  <IconContainer><IconProfile/></IconContainer><p>PROFILE</p>
                </MenuLink>
                <MenuLink to={`/user/${currentUserInfo[0].alias}`}>
                  <IconContainer><IconBookmark/></IconContainer><p>Bookmark</p>
                </MenuLink>
              </GeneralMenu>
              <MessageButtonContainer>
                <MessageButton onClick={()=>changeShowMessageBox(!showMessageBox)}><p>Message</p></MessageButton>
              </MessageButtonContainer>
              
              <MiniProfile>
                <PortraitContainer>
                  <img alt="userportrait" src={ProfileImage}/>
                </PortraitContainer>
                <MiniUserNames>
                  <NameContainer>{currentUserInfo[0].name}</NameContainer>
                  <AliasContainer>@{currentUserInfo[0].alias}</AliasContainer>
                </MiniUserNames>
                <LogoutButton/>
              </MiniProfile>
          </AccountManagement>
       );
}
 
export default Account;