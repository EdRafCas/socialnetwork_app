import AddLike from "./AddLike";
import RemoveLike from "./RemoveLike";
import RemoveLikeSameUser from "./RemoveLikeSameUser";


const AddRemove = async({messageLikes,currentUserInfo, messageUidUser, id, uidUser, originalUidUser, likes, originalLikes, originalMessageId, currentUidUser, likeUidUser, newId, update, changeUpdate}) => {
      if(!messageLikes.includes(currentUserInfo[0].uidUser)){
            /* console.log("addlikeroute") */
            AddLike({id,
                  uidUser,
                  originalUidUser,
                  likes,
                  update,
                  changeUpdate})
      } else {
            if(messageUidUser === currentUserInfo[0].uidUser){
                  /* console.log("removelikesameuserroute") */
                  RemoveLikeSameUser({
                        currentUidUser,
                        originalLikes,
                        originalMessageId,
                        update,
                        changeUpdate})
            } else{
                  /* console.log("removelikeroute") */
                  RemoveLike({
                        currentUidUser,
                        originalLikes,
                        originalMessageId,
                        likeUidUser,
                        newId,
                        update,
                        changeUpdate})
            }
      }

}


export default AddRemove;