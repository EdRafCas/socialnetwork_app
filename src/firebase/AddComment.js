import { db } from "./FirebaseConfig";
import { collection, doc, setDoc, addDoc, updateDoc  } from "firebase/firestore";



const AddComment = async({originalUidUser, id, uidUser, name, alias, date, message, comments}) => {
      /* console.log(id,uidUser) */
      const document = doc(db, "userTimeline" , id); 

      try{  const docRef = doc(collection(db, "userTimeline"))
            await updateDoc(document, {
                  comments: [...comments, {date: date, commentId:docRef.id, uidUser:uidUser}]})
                  try{
                        await setDoc(docRef, {
                              type:"comment",
                              originalId: id,
                              originalUidUser:originalUidUser,
                              uidUser:uidUser,
                              name: name,
                              alias: alias,
                              date: date,
                              message:message,
                              comments:[],
                              likes:[], 
                              retweets:[]
                        })
                        
                  } catch(error){
                        console.log("Error adding new tweet")
                  }
      } catch(error){
            console.log("Error updating tweet")
      }

}

 
export default AddComment;