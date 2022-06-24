import { useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useObtainMessagesRetweet = (id) => {
      const [messageForRetweet, changeMessageForRetweet] = useState("")

      useEffect(()=>{
            /* need this  function so it can be async */
            const obtainMessage = async() =>{
                  const document = await getDoc(doc(db, 'userTimeline', id ));
                   if(document.exists){
                        changeMessageForRetweet(document) 
                   }else{
                        console.log("id no existe")
                   }
            }


            obtainMessage();
      },[id])
      
      return[messageForRetweet]
}
 
export default useObtainMessagesRetweet;