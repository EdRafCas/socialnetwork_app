import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import '../index.css'
import {RetweetInfoContainer, IconContainerRetweet, NameContainerRetweet, UserNameContainerQuoted, UserNameContainerLink, UserNameContainerLinkQuoted,} from './ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";



const RetweetLink = styled(Link)`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:end;
  color: ${theme.Text};
  font-size:1rem;
  font-weight:800;
  /* border:solid ${theme.BorderColor} 1px; */
  overflow:hidden;
  padding-left:5px;
  gap:5px;
  text-decoration:none;
  :hover{
    text-decoration:underline;
  }
`


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