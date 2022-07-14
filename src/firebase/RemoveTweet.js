import { db } from "./FirebaseConfig";
import { doc, deleteDoc} from "firebase/firestore";


const RemoveTweet = async({id, changeShowPopUp, showPopUp}) => {
            await changeShowPopUp(!showPopUp);
                  try{
                        await deleteDoc(doc(db, "userTimeline", id));
                  }catch{
                        console.log("show error")
                  }

}

export default RemoveTweet;

