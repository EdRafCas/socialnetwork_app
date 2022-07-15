import { db } from "./FirebaseConfig";
import { doc, deleteDoc} from "firebase/firestore";


const RemoveTweet = async({changeStateAlert,changeAlert, id, changeShowPopUp, showPopUp}) => {
            await changeShowPopUp(!showPopUp);
                  try{
                        await deleteDoc(doc(db, "userTimeline", id));
                              changeStateAlert(true);
                              changeAlert({
                              type:'success',
                              message: 'The message was deleted from your timeline'
                              })
                  }catch{
                        console.log("show error")
                  }

}

export default RemoveTweet;

