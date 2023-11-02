
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../api/api"



const useUserChats = (id) => {
    const { data,isError,isLoading } = useQuery({
      queryKey: ["chats",id],
      queryFn: () => getUserChats(id),
    })

  return { data, isLoading, isError }

}

export default useUserChats