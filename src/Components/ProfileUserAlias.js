import React,{useEffect, useState} from 'react';
import UserProfileRoutesAlias from './UserProfileRoutesAlias';
import '../index.css'
import HeaderUserProfileAlias from './HeaderUserProfileAlias';
import { db } from "../firebase/FirebaseConfig";
import { collection, limit, query, where, onSnapshot} from "firebase/firestore";
import {LinksContainer, RedirectLink} from '../Elements/ElementsTimeline'




const ProfileUserAlias = ({changeAlert, stateAlert, changeStateAlert, user, currentUserInfo, showEditProfile, changeShowEditProfile, alias}) => {
      const [userByAlias, changeUserByAlias] = useState([{}])
      const [loadingUserData, changeLoadingUserData] =useState(true)
      useEffect(()=>{
            const ObtainUserByAlias = async() =>{
                  console.log(alias)
                  const consult = query(
                        collection(db, 'userInfo'),
                        where('alias', "==", alias),
                        limit(10)
                      );
                  onSnapshot(consult, (snapshot)=>{
                        changeUserByAlias(snapshot.docs.map((userAlias)=>{
                              return {...userAlias.data(), id:userAlias.id}
                        }))
                  });
                  changeLoadingUserData(false)
                  console.log(userByAlias)           
            }
            ObtainUserByAlias();    
      },[currentUserInfo, alias])

      return ( 
            <> 
            {!loadingUserData ?    
             <>
            <HeaderUserProfileAlias
                  currentUserInfo={currentUserInfo}
                  changeShowEditProfile={changeShowEditProfile}
                  showEditProfile={showEditProfile}
                  loadingUserData={loadingUserData}
                  userByAlias={userByAlias}/>
            <LinksContainer>
                  <RedirectLink to =""> 
                        Messages
                  </RedirectLink>
                  <RedirectLink to ={`/user/${alias}/messages&comments`}> 
                  Messages & Comments 
                  </RedirectLink>
                  <RedirectLink to ={`/user/${alias}/likes`}> 
                        Likes
                  </RedirectLink>
            </LinksContainer>
            <UserProfileRoutesAlias 
                  loadingUserData={loadingUserData}
                  currentUserInfo={currentUserInfo}
                  changeAlert={changeAlert} 
                  stateAlert={stateAlert} 
                  changeStateAlert={changeStateAlert} 
                  user={user}
                  userByAlias={userByAlias}/>
            </> 
            :
            ""
            }
            </>
            

      );
}
 
export default ProfileUserAlias;
