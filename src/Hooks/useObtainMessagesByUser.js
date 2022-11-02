import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, limit, query, where } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesByUser = () => {
      const {user} =useAuth();
      const [messagesSentByUser, changeMessagesSentByUser] =useState([])

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  where('uidUser', "==", user.uid),
                  orderBy('date', 'desc')
                  /* limit(30) */
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  changeMessagesSentByUser(snapshot.docs.map((messageUser)=>{
                        /* console.log(messageUser.data()) */
                        return{...messageUser.data(), id:messageUser.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesSentByUser];
}
 
export default useObtainMessagesByUser;
