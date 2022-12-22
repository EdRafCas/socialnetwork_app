import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, query, where, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesByUserAlias = (uidUserbyalias) => {
      const {user} =useAuth();
      const [messagesSentByUserAlias, changeMessagesSentByUserAlias] =useState([])
      const [lastMessageByUserAlias, changeLastMessageByUserAlias] =useState(null)
      const [thereAreMoreMessagesByUserAlias, changeThereAreMoreMessagesByUserAlias] =useState(null)

      const ObtainMoreMessagesByUserAlias = () =>{
            const consult =query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  where('uidUser', "==", uidUserbyalias ),
                  orderBy('date', 'desc'),
                  limit(20),
                  startAfter(lastMessageByUserAlias)
            );

            onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageByUserAlias(snapshot.docs[snapshot.docs.length -1])
                        changeMessagesSentByUserAlias(messagesSentByUserAlias.concat(snapshot.docs.map((messageUser)=>{
                              /* console.log(message.data()) */
                              return{...messageUser.data(), id:messageUser.id}
                        })))
                  } else{
                        changeThereAreMoreMessagesByUserAlias(false)
                  }
            })
      }

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('uidUser', "==", uidUserbyalias ),
                  orderBy('date', 'desc'),
                  limit(20)
            );
            /* console.log(uidUserbyalias) */
            
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageByUserAlias(snapshot.docs[snapshot.docs.length -1])
                        changeThereAreMoreMessagesByUserAlias(true);
                  } else{
                        changeThereAreMoreMessagesByUserAlias(false)
                  }
                  changeMessagesSentByUserAlias(snapshot.docs.map((messageUser)=>{
                        /* console.log(messageUser.data()) */
                        return{...messageUser.data(), id:messageUser.id}
                  }))
            })

            return unsuscribe;
      }, [user, uidUserbyalias])

      return [messagesSentByUserAlias, ObtainMoreMessagesByUserAlias, thereAreMoreMessagesByUserAlias ];
}
 
export default useObtainMessagesByUserAlias;
