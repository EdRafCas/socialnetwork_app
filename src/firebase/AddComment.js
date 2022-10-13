import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";



const AddComment = async({originalUidUser, id, uidUser, name, alias, date, retweets}) => {
      console.log(id,uidUser)
      const document = doc(db, "userTimeline" , id); 

      try{
            await updateDoc(document, {
                  retweets: [...retweets, uidUser]})
                  try{
                        await addDoc(collection(db, "userTimeline"), {
                              type:"comment",
                              originalId: id,
                              originalUidUser:originalUidUser,
                              uidUser:uidUser,
                              name: name,
                              alias: alias,
                              date: date,
                              likes:[]
                        })
                  } catch(error){
                        console.log("Error adding new tweet")
                  }
      } catch(error){
            console.log("Error updating tweet")
      }

}

 
export default AddComment;