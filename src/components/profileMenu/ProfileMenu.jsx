import {
  Avatar,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from "@mantine/core"
import { IconLogout } from "@tabler/icons-react"
import React from "react"

const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu width={150} style={{ cursor: "pointer" }} withArrow trigger="hover">
      <MenuTarget>
        <Avatar src={user?.picture} alt="user" />
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Account Details</MenuLabel>
        <MenuItem leftSection={<IconLogout style={{color:'gray',width:'20px'}} />}
          onClick={() => {
            localStorage.clear()
            logout()
          }}
        >
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  )
}

export default ProfileMenu
