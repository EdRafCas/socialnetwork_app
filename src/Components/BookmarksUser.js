import React, {useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'
import BookmarkTimelineContainer from './BookmarkTimelineContainer';
import { AuthContext } from '../Context/AuthContext';
import {Card} from '.././Elements/ElementsTimeline'
import {AliasContainer} from '../Elements/ElementsFormulary';

const TimelineUserContainer = styled.div`
      height:100%;
      width:700px;
      display:flex;
      flex-direction:column;
      padding:0rem;
      border:solid ${theme.BorderColor} 1px;
      gap:0rem;
      overflow:scroll;
      overflow-x:hidden;
      -ms-overflow-style: none;
      scrollbar-width: none;
`
const UserNameContainerMessage =styled.div`
      width:100%;
      height:auto;
      padding:0.5rem;
      position:relative;
      border-bottom:solid ${theme.BorderColor} 1px;
      /* border:solid red 1px; */
      display:flex;
      flex-direction:column;
      justify-content:flex-start;
      align-content:left;
      gap:2px;
      :hover{
            cursor:pointer
      }
`
const BookmarkTitle =styled.h1`
      width: fit-content;
      /* border-bottom:solid ${theme.BorderColor} 1px; */
      /* border:solid ${theme.BorderColor} 1px; */
      gap:5px;
      text-decoration:none;
      font-size:1.5rem;
      font-weight:1000;
      color:white;
      overflow:hidden;
      z-index:81;

`

const BookmarksUser = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);
      return ( 
            <TimelineUserContainer className='timeline-user'>
                  <UserNameContainerMessage>
                        <BookmarkTitle>
                              Bookmarks
                        </BookmarkTitle>
                        <AliasContainer>
                        @{currentUserInfo[0].alias}
                        </AliasContainer>
                  </UserNameContainerMessage>
                  {currentUserInfo[0].bookmarks.map((Bookmarks, index)=>{
                  return(
                        <Card key={index}>
                              <BookmarkTimelineContainer 
                              id={Bookmarks}
                              user={user}
                              currentUserInfo={currentUserInfo}
                              changeShowPopUp={changeShowPopUp}
                              changePopUpAlert={changePopUpAlert}
                              changeAlert={changeAlert}
                              changeStateAlert={changeStateAlert}
                              />
                        </Card>
                  )
                        })}
            </TimelineUserContainer>
      );
}
 
export default BookmarksUser;
