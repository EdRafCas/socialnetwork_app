import {useState, useEffect} from 'react';
import { db } from '../firebase/FirebaseConfig';
import { collection, onSnapshot, where, limit, query } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';


const useObtainUserInfo = () => {
      const {user} =useAuth();
      const [currentUserInfo, changeCurrentUserInfo] =useState([])

      useEffect(()=>{
            const consult = query(
                  collection(db, 'userInfo'),
                  where('uidUser', "==", user.uid),
                  limit(10)
            );
            const unsuscribe = onSnapshot(consult, (snapshot)=>{
                  changeCurrentUserInfo(snapshot.docs.map((userData)=>{
                        /* console.log(userData.data()) */
                        return{...userData.data(), id:userData.id}
                  }))
            })

            return unsuscribe;
      }, [user])

      return [currentUserInfo];
}
 
export default useObtainUserInfo;
