import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy,where, query, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessages = () => {
      const {user} =useAuth();
      const [messagesSent, changeMessagesSent] =useState([])
      const [lastMessage, changeLastMessage] =useState(null)
      const [thereAreMoreMessages, changeThereAreMoreMessages] =useState(null)

      const ObtaineMoreMessages = () =>{
            const consult =query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  orderBy('date', 'desc'),
                  limit(20),
                  startAfter(lastMessage)
            );

            onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessage(snapshot.docs[snapshot.docs.length -1])
                        changeMessagesSent(messagesSent.concat(snapshot.docs.map((message)=>{
                              /* console.log(message.data()) */
                              return{...message.data(), id:message.id}
                        })))
                  } else{
                        changeThereAreMoreMessages(false)
                  }
            })
      }

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  orderBy('date', 'desc'),
                  limit(20)
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessage(snapshot.docs[snapshot.docs.length -1])
                        changeThereAreMoreMessages(true);
                  } else{
                        changeThereAreMoreMessages(false)
                  }
                  changeMessagesSent(snapshot.docs.map((message)=>{
                        /* console.log(message.data()) */
                        return{...message.data(), id:message.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesSent, ObtaineMoreMessages, thereAreMoreMessages];
}
 
export default useObtainMessages;
