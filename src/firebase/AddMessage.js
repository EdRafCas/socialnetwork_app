import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const AddMessage = ({message, uidUser, name, alias, date, likes, retweets, photoURL}) => {
      return addDoc(collection(db, "userTimeline"), {
            message:message,
            uidUser:uidUser,
            name: name,
            alias: alias,
            date: date,
            likes: likes,
            retweets: retweets,
            photoURL: photoURL
      })
}
 
export default AddMessage;