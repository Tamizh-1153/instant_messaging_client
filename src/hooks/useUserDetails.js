import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../features/user/userSlice"
import { getUserInfo } from "../api/api"
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"


const useUserDetails = () => {
  const dispatch = useDispatch()
  const { user: User} = useAuth0()
  const { user} = useSelector((store) => store.user)
  const { data, isError, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserInfo(User?.email),
    enabled:!!User
    
  })
  if (!isError && !isLoading) {
    if (user == null) {
      dispatch(updateUser(data?.user))
    }
  }
  return { data, isError, isLoading }
}

export default useUserDetails
