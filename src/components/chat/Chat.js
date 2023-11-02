import React, { useEffect, useState } from "react"
import useToChatUserDetails from "../../hooks/useToChatUserDetails"
import { Avatar, Divider, Flex, Group, Text } from "@mantine/core"
import "./chat.css"

const Chat = ({ chat, userID, online }) => {
  const [toChatUserData, setToChatUserData] = useState(null)

  const toChatUserID = chat.members.find((id) => id !== userID)
  const { data } = useToChatUserDetails(toChatUserID)

  useEffect(() => {
    setToChatUserData(data?.user)
  }, [data])
  return (
    <div>
      <Group
        gap={"5px"}
        style={{ cursor: "pointer", marginLeft: "10px", marginBottom: "10px" }}
      >
        <Avatar size={"40px"} src={toChatUserData?.picture} />
        <Flex direction={"column"} justify={"space-between"}>
          <Text className="fontSize" size={"inherit"}>
            {toChatUserData?.name}
          </Text>
          <Text mb={"4px"} size={"12px"}>
            {online ? (
              <span style={{ color: "#00cc00" }}>Online </span>
            ) : (
              <span style={{ color: "gray" }}>Offline </span>
            )}
          </Text>
        </Flex>
      </Group>
      <Divider variant="dotted" />
    </div>
  )
}

export default Chat
