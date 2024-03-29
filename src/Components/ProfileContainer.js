import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import '../index.css'
import {useParams } from 'react-router-dom';
import ProfileUser from './ProfileUser';
import ProfileUserAlias from './ProfileUserAlias';

const TimelineUserContainer = styled.div`
  height:100%;
  /* max-width:700px; */
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

const ProfileContainer = ({changeAlert,changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      let {alias} =useParams();
      const [loadingUser, changeLoadingUser] =useState(true)
      useEffect(()=>{
            const loadingProfiles = async() =>{
                  console.log("loading Alias")

                  changeLoadingUser(false) 
                  console.log("Alias loaded= " + alias)
            }
            loadingProfiles();    
      },[currentUserInfo, alias])

      return ( 

            <TimelineUserContainer >
            {!loadingUser ?    
            <> 
            {currentUserInfo[0].alias === alias ?
            <ProfileUser
                  user={user}
                  currentUserInfo={currentUserInfo}
                  showEditProfile={showEditProfile}
                  changeShowEditProfile={changeShowEditProfile}
                  changeAlert={changeAlert}
                  changeStateAlert={changeStateAlert}
                  alias={alias}/>
            :
            <>
            <ProfileUserAlias
                  user={user} 
                  currentUserInfo={currentUserInfo}
                  changeShowEditProfile={changeShowEditProfile}
                  showEditProfile={showEditProfile}
                  changeAlert={changeAlert}
                  changeStateAlert={changeStateAlert}
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
