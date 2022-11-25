import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../Theme';
import {ReactComponent as IconRetweet} from '../img/retweet_icon.svg';
import '../index.css'
import {RetweetInfoContainer, IconContainerRetweet, NameContainerRetweet} from './ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";



const RetweetLink = styled(Link)`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  color: ${theme.Text};
  font-size:1rem;
  font-weight:800;
  /* border:solid ${theme.BorderColor} 1px; */
  overflow:hidden;
  padding-left:0px;
  gap:5px;
  text-decoration:none;
  :hover{
    text-decoration:underline;
  }
`


const RetweetInfo = ({retweetUidUser, currentUidUser}) => {
    const [loadingInfo, changeLoadinInfo] =useState(true);
    const [retweeterInfo, changeRetweeterInfo] =useState([{}])

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
            console.log("loaded username Retweet")
            changeLoadinInfo(false)
      }
      obtainRetweeterInfo();

      /* By not calling changeLoadingRetweets in useEffect it keeps loading each time we update*/
      },[currentUidUser, retweetUidUser])
      
    
return ( 
  <>
    {!loadingInfo &&
      <RetweetInfoContainer>
          <IconContainerRetweet Retweet >
            <IconRetweet/>
          </IconContainerRetweet> 
          <RetweetLink to={`/user/${retweeterInfo[0].alias}`}>
            {retweetUidUser===currentUidUser?
            <p>You Retweeted</p> 
            :
            <p>{retweeterInfo[0].name+" "}Retweeted</p> 
            }
          </RetweetLink>
      </RetweetInfoContainer>
    }
  </>
    )
}
 
export default RetweetInfo;