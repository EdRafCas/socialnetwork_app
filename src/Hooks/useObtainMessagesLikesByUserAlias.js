import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, where,  query, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesLikesByUserAlias = (uidUserbyalias) => {
      const {user} =useAuth();
      const [messagesLikedByUserAlias, changeMessagesLikedByUserAlias] =useState([])
      const [lastMessageLikedByUserAlias, changeLastMessageLikedByUserAlias] =useState(null)
      const [thereAreMoreMessagesLikedByUserAlias, changeThereAreMoreMessagesLikedByUserAlias] =useState(null)

      const ObtainMoreMessagesLikedByUserAlias = () =>{
            const consult =query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", user.uid),
                  where('type', 'in', ["like"]),
                  orderBy('date', 'desc'),
                  limit(20),
                  startAfter(lastMessageLikedByUserAlias)
            );
            onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageLikedByUserAlias(snapshot.docs[snapshot.docs.length -1])
                        changeMessagesLikedByUserAlias(messagesLikedByUserAlias.concat(snapshot.docs.map((message)=>{
                              /* console.log(message.data()) */
                              return{...message.data(), id:message.id}
                        })))
                  } else{
                        changeThereAreMoreMessagesLikedByUserAlias(false)
                  }
            })
      }

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", uidUserbyalias),
                  where('type', "==", "like"),
                  /* where('uidUser', "!==", null), */ 
                  orderBy('date', 'desc'),
                  /* limit(30) */
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageLikedByUserAlias(snapshot.docs[snapshot.docs.length -1])
                        changeThereAreMoreMessagesLikedByUserAlias(true);
                  } else{
                        changeThereAreMoreMessagesLikedByUserAlias(false)
                  }
                  changeMessagesLikedByUserAlias(snapshot.docs.map((message)=>{
                        /* console.log(message.data()) */
                        return{...message.data(), id:message.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesLikedByUserAlias, ObtainMoreMessagesLikedByUserAlias, thereAreMoreMessagesLikedByUserAlias];
}
 
export default useObtainMessagesLikesByUserAlias;
