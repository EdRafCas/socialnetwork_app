import React, {useContext} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link } from 'react-router-dom';
import '../index.css'
import BookmarkTimelineContainer from './BookmarkTimelineContainer';
import { AuthContext } from '../Context/AuthContext';
import {Card, RetweetInfo, IconContainerRetweet, NameContainerRetweet} from '.././Elements/ElementsTimeline'



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
const LinksContainer = styled.div`
  width:100%;
  background:black;
  margin:auto;
  display:flex;
  flex-direction:row;
  justify-content:center;
  margin:0;
  border: 3px solid ${theme.BorderColor};
  a{    
        text-decoration:none;
  }
  @media(max-width: 720px){ /* 950px */
    width: 100%;
    min-width:600px;
  }
  @media(max-width: 400px){ 
        width: 100%;
        min-width:400px;
        
  }
      
`
const RedirectLink =styled(Link)`
      /* border-bottom: 1px solid #FFFFFF; */
      box-sizing: content-box;
      font-size:1rem;
      display:inline-block;
      color:white;
      width:auto;
      padding:15px 5px;
      margin: 0.25rem 0.5rem;
      letter-spacing:1px;
      white-space: nowrap;
      border: none;
      
      
      :hover{
            color:#000000;
            background:#fff;
            
            :active{
                  border: 3px double #000;
                  font-size: 14px;
                  font-weight: 800;
            }   
      }
      @media(max-width: 400px){ 
            font-size:12px;
            padding:10px 2px;
           
            :hover{
            color:#000000;
            background:#fff;
            
                  :active{
                        border: 3px double #000;
                        font-size: 12px;
                        font-weight: 800;
                  }   
      }
    }
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
