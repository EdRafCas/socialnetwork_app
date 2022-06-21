import { db } from "./FirebaseConfig";
import { collection, addDoc, updateDoc  } from "firebase/firestore";


const AddRetweet = async({id, message, uidUser, name, alias, date, likes, retweets, photoURL}) => {
      console.log(id,uidUser,likes)
      const document = doc(db, "userTimeline" , id); 

      try{
            await updateDoc(document, {
                  likes: [...likes, uidUser]})
                  try{
                        await addDoc(collection(db, "userTimeline"), {
                              message:message,
                              uidUser:uidUser,
                              name: name,
                              alias: alias,
                              date: date,
                              likes: likes,
                              retweets: retweets,
                              photoURL: photoURL
                        })
                  } catch(error){
                        console.log("Error adding new tweet")

                  }
      } catch(error){
            console.log("Error updating tweet")
      }

}
 
export default AddRetweet;