import React,{useState, useEffect} from 'react';
import '../index.css'
import {UserNameContainerQuoted, UserNameContainerLinkQuoted,EmptyDiv} from './ElementsTimeline'
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc, query, collection, where, limit, onSnapshot } from "firebase/firestore";



const CommentInfoTimeline = ({originalUidUser, currentUidUser, originalId}) => {
    const [loadingInfo, changeLoadinInfo] =useState(true);
    const [messageForComment, changeMessageForComment] = useState('')
    const [originalMessageUserInfo, changeOriginalMessageUserInfo] =useState([{}])
    

    useEffect(()=>{
      const obtainOriginalMessageInfo = async() =>{
        const document = await getDoc(doc(db, 'userTimeline', originalId));
        changeMessageForComment(document) 
        /* if(document.exists()){
          console.log(originalId +" existe")
        } else{
          console.log(originalId +" no existe")
        } */
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
    <>
      {messageForComment.data().type === "comment" ?
        <UserNameContainerQuoted>
          <p>Replying to</p>
          <UserNameContainerLinkQuoted 
           onClick={(e)=>{e.stopPropagation();}} to={`/user/${originalMessageUserInfo[0].alias}`}>
            @{originalMessageUserInfo[0].alias}
            </UserNameContainerLinkQuoted >
        </UserNameContainerQuoted>
      :
      <EmptyDiv/>  
      }
    </>
    }
  </>
    )
}
 
export default CommentInfoTimeline;