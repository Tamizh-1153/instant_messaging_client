
import { useQuery } from "@tanstack/react-query"
import { getMessages } from "../api/api"


const useGetMessages = (id) => {
    const {data,isLoading,isError}= useQuery({
        queryKey:['getMessages',id],
        queryFn:()=>getMessages(id)
    })
  return {data,isError,isLoading}
}

export default useGetMessages