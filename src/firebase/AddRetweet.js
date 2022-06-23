import { db } from "./FirebaseConfig";
import { collection, doc, addDoc, updateDoc  } from "firebase/firestore";


const AddRetweet = async({id, message, uidUser, name, alias, date, likes, retweets, photoURL}) => {
      console.log(id,uidUser,likes)
      const document = doc(db, "userTimeline" , id); 

      try{
            await updateDoc(document, {
                  retweets: [...retweets, uidUser]})
                  try{
                        await addDoc(collection(db, "userTimeline"), {
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