import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy,where, query } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessages = () => {
      const {user} =useAuth();
      const [messagesSent, changeMessagesSent] =useState([])

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  orderBy('date', 'desc'),
                  /* limit(30) */
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  changeMessagesSent(snapshot.docs.map((message)=>{
                        /* console.log(message.data()) */
                        return{...message.data(), id:message.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesSent];
}
 
export default useObtainMessages;
