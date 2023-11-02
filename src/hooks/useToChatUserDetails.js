
import { useQuery } from "@tanstack/react-query"
import { getToChatUser } from "../api/api"


const useToChatUserDetails = (toChatUserID) => {

    const {data}= useQuery({
        queryKey:['toChatUserDetails',toChatUserID],
        queryFn:()=>getToChatUser(toChatUserID)
    })

  return {data}
}

export default useToChatUserDetails