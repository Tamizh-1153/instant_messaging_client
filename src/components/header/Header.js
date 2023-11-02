import { Avatar, Button, Group, Image } from "@mantine/core"
import React from "react"
import ProfileMenu from "../profileMenu/ProfileMenu"
import logo from "../../assets/chat_6328103.png"
import chatLogo from '../../assets/chat_8272973.png'
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import useUserDetails from "../../hooks/useUserDetails"
import { useQueryClient } from "@tanstack/react-query"

const Header = () => {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0()
  const refresh = useNavigate()
  const {isError}=useUserDetails()
  const queryclient = useQueryClient()

  if(isError){
    queryclient.invalidateQueries({queryKey:['userDetails']})
  }



  return (
    <div className="container">
      <Group justify="space-between" className="lp_navbar">
        <Group>
          <Image
            style={{ cursor: "pointer" }}
            h={50}
            w="auto"
            fit="contain"
            src={logo}
            onClick={() => refresh("/")}
          />
        </Group>
        <Group>
          {!isAuthenticated ? (
            <>
              <Button
                color="#474554"
                onClick={() => loginWithRedirect()}
                variant="default"
              >
                Log in
              </Button>
              <Button onClick={() => loginWithRedirect()}>Sign up</Button>
            </>
          ) : (
            <>
              <Avatar
                src={chatLogo}
                style={{ cursor: "pointer" }}
                color="blue"
                onClick={() => refresh("/chat")}
              />

              <ProfileMenu user={user} logout={logout} />
            </>
          )}
        </Group>
      </Group>
    </div>
  )
}

export default Header
