import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'
import {useParams } from 'react-router-dom';
import ProfileUser from './ProfileUser';
import ProfileUserAlias from './ProfileUserAlias';

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

const EmptyDiv =styled.div`
visibility:hidden
display:none;
overflow:hidden;
`

const ProfileContainer = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      let {alias} =useParams();
      const [loadingUserData, changeLoadingUserData] =useState(true)
      useEffect(()=>{
            const loadingProfiles = async() =>{
                  changeLoadingUserData(false) 
                  console.log(currentUserInfo)
             
            }
            loadingProfiles();    
      },[currentUserInfo, alias])

      return ( 

            <TimelineUserContainer className='timeline-user'>
            {!loadingUserData ?    
            <> 
            {currentUserInfo[0].alias === alias ?
            <ProfileUser
            user={user}
            currentUserInfo={currentUserInfo}
            showEditProfile={showEditProfile}
            changeShowEditProfile={changeShowEditProfile}
            alias={alias}/>
            :
            <>
            <ProfileUserAlias
                  user={user}
                  currentUserInfo={currentUserInfo}
                  changeShowEditProfile={changeShowEditProfile}
                  showEditProfile={showEditProfile}
                  loadingUserData={loadingUserData}
                  alias={alias}/>
            </>
            }
            </>  
            :
            ""
            }
            </TimelineUserContainer>

      );
}
 
export default ProfileContainer;
