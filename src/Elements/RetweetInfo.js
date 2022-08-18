import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import '../index.css'
import {RetweetInfoContainer, IconContainerRetweet, NameContainerRetweet} from './ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";



const RetweetButton=styled.button`
  background:none;
  border-radius:50%;
  border:none;
  display:flex;
  align-items:center;
  justify-content:center;
  height:2.5rem;
  width:2.5rem;
  gap:5px;
  :hover{
   /*  border:solid ${theme.BorderColor} 1px; */
  }
`

const RetweetInfo = ({retweetUidUser, currentUserInfo}) => {
    const [loadingInfo, changeLoadinInfo] =useState(true);
    const [retweeterInfo, changeRetweeterInfo] =useState([])

    useEffect(()=>{
      const obtainRetweeterInfo = async() =>{
            const consult = query(
              collection(db, 'userInfo'),
              where('uidUser', "==", retweetUidUser),
              limit(10)
            );

            onSnapshot(consult, (snapshot)=>{
              changeRetweeterInfo(snapshot.docs.map((retweeterUser)=>{
                return {...retweeterUser.data(), id:retweeterUser.id}
              }))
            })
            console.log(retweeterInfo)

            changeLoadinInfo(false)
      }
      obtainRetweeterInfo();

      /* By not calling changeLoadingRetweets in useEffect it keeps loading each time we update*/
      },[currentUserInfo, retweetUidUser])
      
    
return ( 
        <>
        {!loadingInfo &&
          <RetweetInfoContainer>
            <IconContainerRetweet Retweet >
              <IconRetweet/>
            </IconContainerRetweet>
            <NameContainerRetweet>
              {retweeterInfo[0].name}<p>Retweeted</p> 
            </NameContainerRetweet>
          </RetweetInfoContainer>
        }
        </>
    )
}
 
export default RetweetInfo;