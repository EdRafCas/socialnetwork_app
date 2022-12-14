import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import '../index.css'
import {RetweetInfoContainer, IconContainerRetweet, NameContainerRetweet, UserNameContainerQuoted, UserNameContainerLink, UserNameContainerLinkQuoted,} from './ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";



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
            console.log("loaded username Retweet")
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
        <UserNameContainerLinkQuoted to={`/user/${originalMessageUserInfo[0].alias}`}>
          @{originalMessageUserInfo[0].alias}
          </UserNameContainerLinkQuoted >
      </UserNameContainerQuoted>
    }
  </>
    )
}
 
export default CommentInfo;