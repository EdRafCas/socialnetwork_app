import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, orderBy, limit, query, where, startAfter } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainMessagesByUser = () => {
      const {user} =useAuth();
      const [messagesSentByUser, changeMessagesSentByUser] =useState([])
      const [lastMessageByUser, changeLastMessageByUser] =useState(null)
      const [thereAreMoreMessagesByUser, changeThereAreMoreMessagesByUser] =useState(null)

      const ObtainMoreMessagesByUser = () =>{
            const consult =query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  where('uidUser', "==", user.uid),
                  orderBy('date', 'desc'),
                  limit(20),
                  startAfter(lastMessageByUser)
            );
            
            onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageByUser(snapshot.docs[snapshot.docs.length -1])
                        changeMessagesSentByUser(messagesSentByUser.concat(snapshot.docs.map((messageUser)=>{
                              /* console.log(message.data()) */
                              return{...messageUser.data(), id:messageUser.id}
                        })))
                  } else{
                        changeThereAreMoreMessagesByUser(false)
                  }
            })
      }

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userTimeline'),
                  where('type', 'in', ['message', "retweet", "comment"]),
                  where('uidUser', "==", user.uid),
                  orderBy('date', 'desc'),
                  limit(20)
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  if(snapshot.docs.length > 0) {
                        changeLastMessageByUser(snapshot.docs[snapshot.docs.length -1])
                        changeThereAreMoreMessagesByUser(true);
                  } else{
                        changeThereAreMoreMessagesByUser(false)
                  }
                  changeMessagesSentByUser(snapshot.docs.map((messageUser)=>{
                        /* console.log(messageUser.data()) */
                        return{...messageUser.data(), id:messageUser.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [messagesSentByUser, ObtainMoreMessagesByUser, thereAreMoreMessagesByUser];
}
 
export default useObtainMessagesByUser;
