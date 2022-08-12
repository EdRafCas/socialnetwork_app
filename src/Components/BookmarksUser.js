import React, {useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'
import BookmarkTimelineContainer from './BookmarkTimelineContainer';
import { AuthContext } from '../Context/AuthContext';
import {Card} from '.././Elements/ElementsTimeline'

const TimelineUserContainer = styled.div`
  height:100%;
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


const BookmarksUser = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);
      return ( 
            <TimelineUserContainer className='timeline-user'>
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
