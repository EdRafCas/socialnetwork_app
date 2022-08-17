import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesByUserAlias = (uidUserbyalias) => {
      const {user} =useAuth();
      const [messagesSentByUserAlias, changeMessagesSentByUserAlias] =useState([])

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", uidUserbyalias ),
                  orderBy('date', 'desc')
                  /* limit(30) */
            );
            console.log(uidUserbyalias)
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  changeMessagesSentByUserAlias(snapshot.docs.map((messageUser)=>{
                        /* console.log(messageUser.data()) */
                        return{...messageUser.data(), id:messageUser.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesSentByUserAlias];
}
 
export default useObtainMessagesByUserAlias;
