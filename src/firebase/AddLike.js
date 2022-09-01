import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";
import getUnixTime from 'date-fns/getUnixTime';


/* const AddLike = async({id,uidUser,likes,update,changeUpdate}) => {
      console.log(id,uidUser,likes)
      console.log(update)
      changeUpdate(update+1)
      const document = doc(db, "userTimeline" , id);
      console.log(document) 
      
      return await updateDoc(document, {
            likes: [...likes, uidUser] 
      }); 
} */

const AddLike = async({originalUidUser, id, uidUser, likes, changeUpdate, update}) => {
      console.log(id,uidUser)
      const document = doc(db, "userTimeline" , id); 

      try{
            await updateDoc(document, {
                  likes: [...likes, uidUser]})
                  try{
                        await addDoc(collection(db, "userTimeline"), {
                              type:"like",
                              originalId: id,
                              originalUidUser:originalUidUser,
                              uidUser:uidUser,
                              date: getUnixTime(new Date())
                        })
                        console.log("like added")
                  } catch(error){
                        console.log("Error adding new Like Container")
                  }
      } catch(error){
            console.log("Error updating tweet")
      }
      changeUpdate(update+1)
}


export default AddLike;