import React, {useContext, useState} from 'react';
import {Route, Routes, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'
import BookmarkTimelineContainer from './BookmarkTimelineContainer';
import { AuthContext } from '../Context/AuthContext';
import {Card} from '../Elements/ElementsTimeline'

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


const StatusMessage = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {alias} =useParams();
      const {id} =useParams();
      const {changeShowPopUp} =useContext(AuthContext);
      const {changePopUpAlert} =useContext(AuthContext);
      const [userByAlias, changeUserByAlias] = useState(currentUserInfo)
      const [loadingUserData, changeLoadingUserData] =useState(true)

     /*  useEffect(()=>{
            const ObtainUserByAlias = async() =>{
                  const consult = query(
                        collection(db, 'userInfo'),
                        where('alias', "==", alias),
                        limit(10)
                      );
                      
                  onSnapshot(consult, (snapshot)=>{
                        changeUserByAlias(snapshot.docs.map((userAlias)=>{
                              return {...userAlias.data(), id:userAlias.id}
                        }))
                  })
                  changeLoadingUserData(false)
                  console.log("ObtainUserByAlias"+" "+ userByAlias[0].uidUser+" "+ currentUserInfo[0].alias)
            }
            ObtainUserByAlias();
      },[currentUserInfo, alias]) */
      return ( 
            <TimelineUserContainer className='timeline-user'>
                  <Card >
                        <div>{id}</div>
                        <div>{alias}</div>
                  </Card>
            </TimelineUserContainer>
      );
}
 
export default StatusMessage;
