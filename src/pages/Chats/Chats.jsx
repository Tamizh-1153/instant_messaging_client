import React, { useEffect, useRef, useState } from "react"
import "./chats.css"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import useUserChats from "../../hooks/useUserChats"
import { useSelector } from "react-redux"
import Chat from "../../components/chat/Chat"
import { ActionIcon, Group, LoadingOverlay, Skeleton, Space, Stack, Text } from "@mantine/core"
import MessageContainer from "../../components/messageContainer/MessageContainer"
import { io } from "socket.io-client"
import { IconMessagePlus } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import ChatModal from "../../components/chatModal/ChatModal"

const Chats = () => {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const { isAuthenticated, isLoading } = useAuth0()
  const refresh = useNavigate()
  const { user } = useSelector((store) => store.user)
  const { data } = useUserChats(user?._id)
  const socket = useRef()
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    socket.current = io("http://localhost:6060")
    socket.current.emit("new-user-add", user?._id)
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users)
    }) 
  }, [user])

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage)
      console.log(sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data)
      console.log(data)
    })
  }, [])

  /* eslint-disable */
  useEffect(() => {
    setChats(data)
  }, [data])
  /* eslint-enable */

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user?._id)
    const online = onlineUsers.find((user) => user?.userID === chatMember)
    return online ? true : false
  }

  if (isLoading) {
    return (
      <LoadingOverlay
      visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur:1 }}
        loaderProps={{ color: "blue", type: "dots" ,size:'lg' }}
      />
    )
  }

  if (!isAuthenticated) {
    refresh("/")
  }

  if(chats.length===0){
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
        loaderProps={{ color: "blue", type: "dots", size: "lg" }}
      />
    )
  }

  return (
    <div className="container fontSize chat_container ">
      <div className=" chat_left">
        <Group className="people_container" justify="space-between">
          <Text className="people_heading">People</Text>
          <ChatModal opened={opened} close={close} chats={chats} user={user} />
          <ActionIcon
            className="add_icon"
            onClick={open}
            radius={"xs"}
            size={"25px"}
            variant="gradient"
            gradient={{ from: "cyan", to: "violet", deg: 182 }}
          >
            <IconMessagePlus />
          </ActionIcon>
        </Group>
        <div className="chats">
          {chats === undefined ? (
            <>
              <Group ml={10}>
                <Skeleton height={60} circle />
                <Skeleton height={8} width={90} radius={"sm"} />
              </Group>
              <Space h="xl" />
              <Group ml={10}>
                <Skeleton height={60} circle />
                <Skeleton height={8} width={90} radius={"sm"} />
              </Group>
              <Space h="xl" />
              <Group ml={10}>
                <Skeleton height={60} circle />
                <Skeleton height={8} width={90} radius={"sm"} />
              </Group>
            </>
          ) : (
            <Stack>
              {chats?.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Chat
                    key={user?._id}
                    chat={chat}
                    userID={user?._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </Stack>
          )}
        </div>
      </div>

      <div className="chat_right">
        {currentChat ? (
          <MessageContainer
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            key={user?._id}
            currentChat={currentChat}
            userID={user?._id}
          />
        ) : (
          <div className="start_msg">Tap on chat to start messaging</div>
        )}
      </div>
    </div>
  )
}

export default Chats
