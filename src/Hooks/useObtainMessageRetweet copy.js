import { useEffect, useState } from "react";
import { db } from "../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useObtainMessagesRetweet = ({loadingRetweets}) => {
      const [messageForRetweet, changeMessageForRetweet] = useState('')

      useEffect(()=>{
            const obtainMessage = async() =>{
                  const document = await getDoc(doc(db, 'userTimeline', "c12MatKDeB1sJfUkaSSf" ));
                   if(document.exists){
                        changeMessageForRetweet(document) 
                   }else{
                        console.log("id no existe")
                   }
      
            }
            obtainMessage();
      },[])
      
      return[messageForRetweet]

      
}
 
export default useObtainMessagesRetweet;