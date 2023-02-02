import { getDownloadURL, ref, uploadBytes  } from "firebase/storage"
import { db, storage } from "./FirebaseConfig";
import { doc, updateDoc} from "firebase/firestore";


const UpdateProfileImageBackground = async({file, user ,changeLoading, id, newName, newBio}) => {
      const fileRefBackground= ref(storage, user.uid+"_Background")
      
      changeLoading(true);
      const snapshot = await uploadBytes(fileRefBackground, file);

      const newPhotoBackgroundURL = await getDownloadURL(fileRefBackground); 

      const document = doc(db, "userInfo" , id)
      updateDoc(document, {
            name:newName,
            bio:newBio,
            backgroundURL:newPhotoBackgroundURL}); 

            changeLoading(false);
      console.log("upload done")
}
export default UpdateProfileImageBackground;