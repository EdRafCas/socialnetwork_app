import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, limit, query } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainLikesInTweet = ({}) => {
      const {user} =useAuth();
      const [likesInTweet, changeLikesInTweet] =useState([])

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", user.uid),
                  /* orderBy('date', 'desc'), */
                  limit(30)
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  changeMessagesSent(snapshot.docs.map((message)=>{
                        /* console.log(message.data()) */
                        return{...message.data(), id:message.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [likesInTweet];
}
 
export default useObtainLikesInTweet;
