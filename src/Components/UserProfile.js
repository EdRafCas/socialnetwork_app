import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {Link} from 'react-router-dom';
import UserProfileRoutes from './UserProfileRoutes';
import UserProfileRoutesAlias from './UserProfileRoutesAlias';
import '../index.css'
import HeaderUserProfileAlias from './HeaderUserProfileAlias';
import HeaderUserProfile from './HeaderUserProfile';
import {useParams } from 'react-router-dom';
import { db } from "../firebase/FirebaseConfig";
import { collection, limit, query, where, onSnapshot} from "firebase/firestore";

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
 /*  border-top: 1px solid ${theme.BorderColor}; */
  border-bottom: 1px solid ${theme.BorderColor};
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
      display:flex;
      justify-content:center;
      color:white;
      width:auto;
      min-width:7rem;
      padding:15px 5px;
      margin: 0.25rem 0.5rem;
      letter-spacing:1px;
      white-space: nowrap;
      border: none;
      
      
      :hover{
            color:#fff;
            background:${theme.BorderColor};
            
            :active{
                  border: 2px double #000;
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


const UserProfile = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile}) => {
      const {alias} =useParams();
      const [userByAlias, changeUserByAlias] = useState(currentUserInfo)
      const [loadingUserData, changeLoadingUserData] =useState(true)
      useEffect(()=>{
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
      },[currentUserInfo, alias])

      return ( 
            <TimelineUserContainer className='timeline-user'>
                  {currentUserInfo[0].alias === userByAlias[0].alias ?
                  <>
                  <HeaderUserProfile 
                        currentUserInfo={currentUserInfo}
                        changeShowEditProfile={changeShowEditProfile}
                        showEditProfile={showEditProfile}
                  />
                  <LinksContainer>
                        <RedirectLink to =""> 
                        Messages
                        </RedirectLink>
                        <RedirectLink to ={`/user/${alias}/likes`}> 
                        Likes
                        </RedirectLink>
                  </LinksContainer>
                  <UserProfileRoutes 
                        currentUserInfo={currentUserInfo}
                        changeAlert={changeAlert} 
                        stateAlert={stateAlert} 
                        changeStateAlert={changeStateAlert} 
                        user={user}
                  />
                  </>
                  :
                  <>
                  <HeaderUserProfileAlias
                        currentUserInfo={currentUserInfo}
                        changeShowEditProfile={changeShowEditProfile}
                        showEditProfile={showEditProfile}
                        loadingUserData={loadingUserData}
                        userByAlias={userByAlias}
                        />
                  <LinksContainer>
                        <RedirectLink to =""> 
                              Messages
                        </RedirectLink>
                        <RedirectLink to ={`/user/${alias}/likes`}> 
                              Likes
                        </RedirectLink>
                  </LinksContainer>
                  <UserProfileRoutesAlias 
                        currentUserInfo={currentUserInfo}
                        changeAlert={changeAlert} 
                        stateAlert={stateAlert} 
                        changeStateAlert={changeStateAlert} 
                        user={user}
                        userByAlias={userByAlias}
                  />
                  </>
                  }
            </TimelineUserContainer>
      );
}
 
export default UserProfile;
