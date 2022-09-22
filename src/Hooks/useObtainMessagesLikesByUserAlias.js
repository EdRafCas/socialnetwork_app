import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, where,  query } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesLikesByUserAlias = (uidUserbyalias) => {
      const {user} =useAuth();
      const [messagesLikedByUser, changeMessagesLikedByUser] =useState([])

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
                  changeMessagesLikedByUser(snapshot.docs.map((message)=>{
                        /* console.log(message.data()) */
                        return{...message.data(), id:message.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesLikedByUser];
}
 
export default useObtainMessagesLikesByUserAlias;
