import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconMoreOptions} from '../img/more_icon.svg';
import {ReactComponent as IconDelete} from '../img/delete_icon.svg';
import {ReactComponent as IconPin} from '../img/pin_icon.svg';
import {ReactComponent as IconBookmark} from '../img/bookmark_icon.svg';
import ClickAwayListener from '@mui/material/ClickAwayListener';
/* import { IconContainer } from './ElementsTimeline'; */
import RemoveTweet from '../firebase/RemoveTweet';
import receiveNotification from '../Components/ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';


const IconMore=styled.div`
  position: absolute;
  right: 5px;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:2.5rem;
  width:2.5rem;
  /* border:1px solid white; */
  fill:currentcolor;
  :hover{
    background:${(props)=> props.Reply ? `${theme.BlueReplyBackground}`
                         : props.Like ? `${theme.PinkLikeBackground}` 
                         : props.Retweet ? `${theme.GreenRetweetBackground}` 
                         : "auto"};
    svg{
      /* max-height:3rem; */
      stroke: ${(props)=> props.Reply ? `${theme.BlueReply}`
                         : props.Like ? `${theme.PinkLike}` 
                         : props.Retweet ? `${theme.GreenRetweet}` 
                         : "auto"};
    }
  }
  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
  :active{
    background:rgb(29,155,240, 0.2);
    fill:black;
  }
`
const OptionsCard =styled.div`
  right:5px;
  top:2rem;
  position:absolute;
  border:solid ${theme.BorderColor} 1px;
  width:auto;
  height:auto;
  padding:5px;
  padding-right:15px;
  background:black;
  
`
const Option =styled.div`
  width:auto;
  gap:10px;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  cursor: pointer;
  :hover{
    background:rgba(255,255,255, 0.2);
    }
  :active{
    background:rgba(255,255,255, 0.3)
  }
`
const IconContainer=styled.div`
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:2.5rem;
  width:2.5rem;
  /* border:1px solid white; */
  fill:currentcolor;
  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
  `

const ShowMoreMenu = ({changeAlert, changeStateAlert,messageUidUser, currentUserInfo, id}) => {
      const [open, setOpen] =useState(false)
      const {changeShowPopUp} =useContext(AuthContext);
      const {showPopUp} =useContext(AuthContext);
      const {popUpAlert} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      
      const handleClick = () => {
        setOpen((prev) => !prev);
      };

      const handleClickAway = () => {
        setOpen(false);
      };


      return ( 
        
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
          >
            <div>
              <IconMore Reply>
                <IconMoreOptions type="button" onClick={handleClick}/>
              </IconMore>
              {open ? (
                <OptionsCard >
                  {messageUidUser===currentUserInfo[0].uidUser ?
                  <Option onClick={()=>receiveNotification({
                    notification:"delete",
                    changeShowPopUp, 
                    changePopUpAlert,
                    id})}>
                    <IconContainer >
                      <IconDelete/>
                    </IconContainer>
                    <p>Delete Message</p>
                  </Option>
                  :""
                  }
                  {messageUidUser===currentUserInfo[0].uidUser ?
                  <Option onClick={()=>RemoveTweet({id})}>
                    <IconContainer >
                      <IconDelete/>
                    </IconContainer>
                    <p>Delete Message.</p>
                  </Option>
                  :""
                  }
                  {messageUidUser===currentUserInfo[0].uidUser ?
                  <Option onClick={()=>receiveNotification({
                  notification:"pinned", 
                  changeShowPopUp, 
                  changePopUpAlert,
                  userId:currentUserInfo[0].id, 
                  id })}>
                    <IconContainer>
                      <IconPin/>
                    </IconContainer>
                    <p>Pin Message</p>
                  </Option>
                  :""
                  }
                  <Option>
                    <IconContainer>
                      <IconBookmark/>
                    </IconContainer>
                    <p>Bookmark Tweet</p>
                  </Option>
                </OptionsCard>
              ) : null}
            </div> 
          </ClickAwayListener>  
        
        
       );
}
 
export default ShowMoreMenu;