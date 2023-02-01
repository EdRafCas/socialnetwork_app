import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconMoreOptions} from '../img/more_icon.svg';
import {ReactComponent as IconDelete} from '../img/delete_icon.svg';
import {ReactComponent as IconPin} from '../img/pin_icon.svg';
import {ReactComponent as IconBookmark} from '../img/bookmark_icon.svg';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import receiveNotification from '../Components/ReceiveNotification';
import { AuthContext } from '../Context/AuthContext';
import { RemoveFromBookMark } from '../firebase/UpdateProfile';

const IconMore=styled.div`
  position: absolute;
  right: 1rem;
  top:-0.5rem;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  height:2.2rem;
  width:2.2rem;
  /* border:1px solid white; */
  fill:currentcolor;
  z-index:200;
  :hover{
    cursor:pointer;
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
    max-height:1.5rem;
    stroke: ${theme.BorderColor};
  }
  :active{
    background:rgb(29,155,240, 0.2);
    fill:black;
  }
`
const OptionsCard =styled.div`
  right:5px;
  top:-0.5rem;
  position:absolute;
  overflow:hidden;
  border:solid ${theme.BorderColor} 1px;
  border-radius:8px;
  background:black;
  width:auto;
  height:auto;
  padding:0px;
  background:#000;
  opacity:1;
  color:${theme.Text};
  z-index:300;
`
const Option =styled.div`
  height:fit-content;
  width:auto;
  gap:2px;
  padding:2px;
  padding-right:5px;
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  z-index:400;
   background:#000;
  /*border:solid ${theme.BorderColor} 1px; */
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
  height:1.8rem;
  width:1.8rem;
  /* border:1px solid white; */
  fill:currentcolor;
  z-index:500;
  svg{
    max-height:1.2rem;
    stroke: ${theme.BorderColor};
  }
  `

const ShowMoreMenu = ({messageUidUser, currentUserInfo, id, pinnedMenu, changeAlert, changeStateAlert, retweetSameUser, bookmarkTimeline, commentInnerMenu, originalId, originalMessageComments,originalUidUser, update, changeUpdate}) => {
      const [open, setOpen] =useState(false)
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);

      
      const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
          <IconMore Reply onClick={handleClick}>
            <IconMoreOptions type="button" />
          </IconMore>
          {open ? (
          <OptionsCard >
            {messageUidUser===currentUserInfo[0].uidUser ?
            <>
              {pinnedMenu===true ?
                <Option onClick={(e)=>{e.stopPropagation();
                  e.preventDefault(); 
                  receiveNotification({
                  notification:"deleteAndRemove",
                  changeShowPopUp, 
                  changePopUpAlert,
                  userId:currentUserInfo[0].id,
                  id})}}>
                  <IconContainer >
                    <IconDelete/>
                  </IconContainer>
                  <p>Delete Pinned Message</p>
                </Option>
              : 
                <>
                {commentInnerMenu===true ?
                <Option onClick={(e)=>{
                  e.stopPropagation();
                  e.preventDefault(); 
                  receiveNotification({
                  notification:"deleteComment",
                  changeShowPopUp, 
                  changePopUpAlert,
                  id,
                  originalId,
                  originalUidUser, 
                  originalMessageComments})}}>
                  <IconContainer >
                    <IconDelete/>
                  </IconContainer>
                  <p>Delete Message</p>
                </Option>
                :
                <Option onClick={(e)=>{e.stopPropagation();
                  e.preventDefault(); 
                  receiveNotification({
                  notification:"delete",
                  changeShowPopUp, 
                  changePopUpAlert,
                  id})}}>
                  <IconContainer >
                    <IconDelete/>
                  </IconContainer>
                  <p>Delete Message</p>
                </Option>
                }
                </> 
              }
            </>
            :
              ""
            }
            {messageUidUser===currentUserInfo[0].uidUser ?
            <>
              {pinnedMenu===true ?
                <Option onClick={(e)=>{e.stopPropagation();
                  e.preventDefault(); 
                  receiveNotification({
                  notification:"unPin", 
                  changeShowPopUp, 
                  changePopUpAlert,
                  userId:currentUserInfo[0].id, 
                  id })}}>
                  <IconContainer>
                    <IconPin/>
                  </IconContainer>
                  <p>UnPin Message</p>
                </Option>
                :
                <Option onClick={(e)=>{e.stopPropagation();
                  e.preventDefault(); 
                  receiveNotification({
                  notification:"pinned", 
                  changeShowPopUp, 
                  changePopUpAlert,
                  userId:currentUserInfo[0].id, 
                  id })}}>
                  <IconContainer>
                    <IconPin/>
                  </IconContainer>
                  <p>Pin Message</p>
                </Option>
              }
            </>
            :""
            }
            {!currentUserInfo[0].bookmarks.includes(id)?
            <Option onClick={(e)=>{e.stopPropagation();
              e.preventDefault(); 
              receiveNotification({
              notification:"bookmark", 
              changeShowPopUp, 
              changePopUpAlert,
              changeAlert, 
              changeStateAlert,
              userId:currentUserInfo[0].id,
              bookmarks:currentUserInfo[0].bookmarks,
              id })}}>
            <IconContainer>
              <IconBookmark/>
            </IconContainer>
            <p>Bookmark Message</p>
            </Option>
            :
            <>
            {!bookmarkTimeline === true ?
              <Option onClick={(e)=>{e.stopPropagation();
                e.preventDefault(); 
                receiveNotification({
                notification:"alreadyBookmark",
                changeShowPopUp, 
                changePopUpAlert,
                changeAlert, 
                changeStateAlert})}}>
              <IconContainer>
                <IconBookmark/>
              </IconContainer>
              <p>Bookmark Message</p>
              </Option>
              :
              ""
              }
            </>
            }
            {bookmarkTimeline &&
              <Option onClick={(e)=>{e.stopPropagation();
              e.preventDefault(); 
              RemoveFromBookMark({
              changeShowPopUp, 
              changePopUpAlert,
              changeAlert, 
              changeStateAlert,
              update,
              changeUpdate,
              userId:currentUserInfo[0].id,
              bookmarks:currentUserInfo[0].bookmarks,
              id})}}>
            <IconContainer>
              <IconBookmark/>
            </IconContainer>
            <p>Remove from Bookmark</p>
            </Option>
            }
          </OptionsCard>
          ) : null}
        </div> 
      </ClickAwayListener>  
       );
}
 
export default ShowMoreMenu;