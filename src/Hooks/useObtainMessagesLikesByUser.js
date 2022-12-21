import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, where,  query, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesLikesByUser = () => {
      const {user} =useAuth();
      const [messagesLikedByUser, changeMessagesLikedByUser] =useState([])
      const [lastMessageLikedByUser, changeLastMessageLikedByUser] =useState(null)
      const [thereAreMoreMessagesLikedByUser, changeThereAreMoreMessagesLikedByUser] =useState(null)

      const ObtainMoreMessagesLikedByUser = () =>{
            const consult =query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", user.uid),
                  where('type', 'in', ["like"]),
                  orderBy('date', 'desc'),
                  limit(20),
                  startAfter(lastMessageLikedByUser)
            );
            onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageLikedByUser(snapshot.docs[snapshot.docs.length -1])
                        changeMessagesLikedByUser(messagesLikedByUser.concat(snapshot.docs.map((message)=>{
                              /* console.log(message.data()) */
                              return{...message.data(), id:message.id}
                        })))
                  } else{
                        changeThereAreMoreMessagesLikedByUser(false)
                  }
            })
      }
            
      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", user.uid),
                  where('type', 'in', ["like"]),
                  orderBy('date', 'desc'),
                  limit(20)
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageLikedByUser(snapshot.docs[snapshot.docs.length -1])
                        changeThereAreMoreMessagesLikedByUser(true);
                  } else{
                        changeThereAreMoreMessagesLikedByUser(false)
                  }
                  changeMessagesLikedByUser(snapshot.docs.map((message)=>{
                        /* console.log(message.data()) */
                        return{...message.data(), id:message.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesLikedByUser, ObtainMoreMessagesLikedByUser, thereAreMoreMessagesLikedByUser];
}
 
export default useObtainMessagesLikesByUser;
