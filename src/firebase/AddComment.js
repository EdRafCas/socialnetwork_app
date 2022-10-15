import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";



const AddComment = async({originalUidUser, id, uidUser, name, alias, date, message, comments,retweets}) => {
      console.log(id,uidUser)
      const document = doc(db, "userTimeline" , id); 

      try{
            await updateDoc(document, {
                  comments: [...comments, uidUser]})
                  try{
                        await addDoc(collection(db, "userTimeline"), {
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