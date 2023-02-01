import React from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import ProfileImage from '../img/profile_avatar.png'
import {ReactComponent as IconHome} from '../img/home_icon.svg';
import {ReactComponent as IconProfile} from '../img/profile_icon.svg';
import {ReactComponent as IconBookmark} from '../img/bookmark_icon.svg';
import {ReactComponent as IconMessage} from '../img/sendMessage_icon.svg';

const AccountManagement=styled.div`
  display:flex;
  height:100%;
  min-height:500px;
  width:auto;
  /* max-width:375px; */
  min-width:275px;
  overflow:hidden;
  padding:0rem 0rem;
  padding-bottom:0.5rem;
  flex-direction:column;
  align-self:right;
  justify-content:space-between;
  /* border:solid ${theme.BorderColor} 1px; */
  @media(max-width: 960px){ 
    min-width:4rem;
}
`
const GeneralMenu = styled.div`
  width:100%;
  padding:1rem 0rem;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  gap:1rem;
  /* border:solid ${theme.BorderColor} 1px; */
  @media(max-width: 760px){ 
    align-content:center;
}
`
const MiniProfile=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-content:center;
  height:auto;
  width:fit-content;
  width:auto;
  max-width:300px;
  min-width:4rem;
  border-radius:9999px;
  /* padding:0.5rem; */
  padding:0.5rem;
  gap:1px;
  :hover{
    background:${theme.GradientBackround};
  }
  @media(max-width: 760px){ 
    justify-content:center;
    :hover{
    background:#000;
  }
    
}
`
const PortraitContainer =styled.div`
  /* border: solid red 1px; */
  padding:0;
  border-radius:50%;
  height:auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:3rem;
  height:3rem;
  min-width:3rem;
  flex-direction:column;
  overflow:hidden;
  img{
    width:100%;
  }
  @media(max-width: 760px){ 
    display:none;
}
`
const NameContainer =styled.h1`
  /* border:solid ${theme.BorderColor} 1px; */
  font-size:1rem;
  font-weight:1000;
  color:white;
  overflow:hidden;
  max-height:1.2rem;
`
const AliasContainer = styled.p`
  /* border:solid ${theme.BorderColor} 1px; */
  max-height:1.1rem;
  color:${theme.Text};
`
const MiniUserNames =styled.div`
  display:flex;
  flex-direction:column;
  padding:0rem 0rem;
  gap:5px;
  overflow:hidden;
  width:stretch;
  min-width:4rem;
  @media(max-width: 760px){ 
  display:none;
}

`
const MenuLink=styled(Link)`
  display:flex;
  margin:auto;
  margin-left:0px;
  padding-left:0.5rem;
  padding-right:1rem;
  /* border:solid white 1px; */
  border-radius:9999px;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  height:3rem;
  gap:0.5rem;
  text-decoration:none;
  color:${theme.Text};
  p{
    font-size:1.5rem;
    font-weight:800;
  }
  :hover{
    background:rgba(255,255,255, 0.2);
  }
  @media(max-width: 760px){ 
  p{
    display:none;
  }
  max-width:3rem;
  margin:auto;
  padding:0;
  justify-content:center;
}
`

const IconContainer=styled.div`
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:3rem;
  width:3rem;
 /*  border:1px solid white; */
  fill:currentcolor;
    svg{
      max-height:2rem;
      fill:white;
    }
  :active{
    /* background:white;;
    fill:black; */
  }
`
const MessageButtonContainer=styled.div`
  display:flex;
  height:auto;
  width:100%;
  flex-direction:row;
  justify-content:center;
  align-content:center;
  /* border:solid red 1px; */
  padding:0;
  margin:auto;
  @media(max-width: 760px){ 
    padding:0;
    margin:none;
  }
`
const MessageButton=styled.button`
  display:flex;
  height:3rem;
  width:10rem;
  min-width:4rem;
  max-width:20rem;
  border-radius:9999px;
  padding:1rem;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  /* border:solid red 1px; */
  border:none;
  background:${theme.BluePinned};
  p{
    font-size:1.2rem;
    font-weight:1000;
    color:white;
    /* border:solid red 1px; */
  }
  :hover{
    background:${theme.GradientBackround}};
    cursor:pointer;
  }
  :active{
    border:solid black 2px;
    p{
      color:black;
    }
  }
  @media(max-width: 760px){ 
    padding:0;
    border-radius:50%;
    border:none;
    width:auto;;
   p{
    display:none;
   }
  }
  height:3rem;
  min-width:3rem;
 
  @media(min-width: 760px){ 
   div{
    display:none;
   }
  }
`

const Account = ({ user, currentUserInfo, showMessageBox, changeShowMessageBox}) => {

      return ( 
            <AccountManagement>
              <GeneralMenu>
                <MenuLink to="">
                  <IconContainer>
                    <IconHome/>
                  </IconContainer>
                  <p>HOME</p>
                </MenuLink>
                <MenuLink to={`/user/${currentUserInfo[0].alias}`}>
                  <IconContainer>
                    <IconProfile/>
                  </IconContainer>
                  <p>PROFILE</p>
                </MenuLink>
                <MenuLink to={`/user/Bookmarks`}>
                  <IconContainer>
                    <IconBookmark/>
                  </IconContainer>
                  <p>Bookmark</p>
                </MenuLink>
              <MessageButtonContainer>
                <MessageButton onClick={()=>changeShowMessageBox(!showMessageBox)}>
                  <IconContainer>
                    <IconMessage/>
                  </IconContainer>
                  <p>Message</p>
                </MessageButton>
              </MessageButtonContainer>    
              </GeneralMenu>
              <MiniProfile>
                <PortraitContainer>
                  {user.photoURL ?
                    <img alt="UserAvatar" src={user.photoURL} />
                    :
                    <img alt="DefaultAvatar" src={ProfileImage}/>
                  }
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