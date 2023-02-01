import React,{useState, useEffect} from 'react';
import '../index.css'
import {UserNameContainerQuoted,UserNameContainerLinkQuoted,} from './ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { query, collection, where, limit, onSnapshot } from "firebase/firestore";



const CommentInfo = ({originalUidUser, currentUidUser}) => {
    const [loadingInfo, changeLoadinInfo] =useState(true);
    const [originalMessageUserInfo, changeOriginalMessageUserInfo] =useState([{}])

    useEffect(()=>{
      const obtainOriginalMessageInfo = async() =>{
            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", originalUidUser),
              limit(10)
            );

            onSnapshot(consult, (snapshot)=>{
              changeOriginalMessageUserInfo(snapshot.docs.map((originalMessage)=>{
                return {...originalMessage.data(), id:originalMessage.id}
              }))
            })
            /* console.log("loaded username Retweet") */
            changeLoadinInfo(false)
      }
      obtainOriginalMessageInfo();

      /* By not calling changeLoadingRetweets in useEffect it keeps loading each time we update*/
      },[currentUidUser, originalUidUser])
      
    
return ( 
  <>
    {!loadingInfo &&
      <UserNameContainerQuoted>
        <p>Replying to</p>
        <UserNameContainerLinkQuoted onClick={(e)=>{e.stopPropagation();}} 
        to={`/user/${originalMessageUserInfo[0].alias}`}>
          @{originalMessageUserInfo[0].alias}
          </UserNameContainerLinkQuoted >
      </UserNameContainerQuoted>
    }
  </>
    )
}
 
export default CommentInfo;