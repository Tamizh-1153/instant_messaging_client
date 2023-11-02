import React, {  useEffect } from "react"
import Header from "../header/Header"
import { Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { createUser } from "../../api/api"
import { useDispatch, useSelector } from "react-redux"
import { updateToken } from "../../features/user/userSlice"
import { useMutation } from "@tanstack/react-query"


const Layout = () => {
  
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0()
  const { user: userr } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) =>
      createUser(user?.email, user?.nickname, user?.picture, token),
  })
  /* eslint-disable */
  useEffect(() => {

    const getTokenAndRegister = async () => {
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: process.env.REACT_APP_SERVERURL,
          scope: "openid profile email",
        },
      })
      localStorage.setItem("access_token", token)
      if (userr?.token == null) {
        dispatch(updateToken(token))
      }
      mutate(token)
      console.log();
    }
    isAuthenticated && getTokenAndRegister()
    
  }, [isAuthenticated])
  /* eslint-enable */

  

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
