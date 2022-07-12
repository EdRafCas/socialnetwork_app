import { db } from "./FirebaseConfig";
import { doc, deleteDoc} from "firebase/firestore";


const RemoveTweet = async({id}) => {
            await deleteDoc(doc(db, "userTimeline", id))

}

export default RemoveTweet;