import React, { useEffect, useRef, useState } from "react"
import useToChatUserDetails from "../../hooks/useToChatUserDetails"
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import useGetMessages from "../../hooks/useGetMessages"
import moment from "moment/moment"
import InputEmoji from "react-input-emoji"
import "./messageContainer.css"
import { addMessage } from "../../api/api"
import { useMutation } from "@tanstack/react-query"

const MessageContainer = ({
  currentChat,
  userID,
  setSendMessage,
  receiveMessage,
}) => {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const scroll = useRef()

  const otherUser = currentChat?.members.find((id) => id !== userID)
  const { data } = useToChatUserDetails(otherUser)
  const { data: messagesData } = useGetMessages(currentChat?._id)

  const { mutate } = useMutation({
    mutationFn: (messageToDB) => addMessage(messageToDB),
    onSuccess: (data) => {
      setMessages([...messages, data])
      setNewMessage("")
    },
  })

  // const handleChange = (newMessage) => {
  //   setNewMessage(newMessage)
  // }

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    const messageToDB = {
      chatID: currentChat?._id,
      senderID: userID,
      text: newMessage,
    }
    mutate(messageToDB)
    setSendMessage({ ...messageToDB, otherUser })
  }

  /* eslint-disable */
  useEffect(() => {
    setUserData(data?.user)
  }, [currentChat, userID])

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatID === currentChat?._id) {
      console.log(receiveMessage)
      setMessages([...messages, receiveMessage])
    }
  }, [receiveMessage])

  useEffect(() => {
    setMessages(messagesData)
  }, [currentChat, messagesData])
  /* eslint-enable */
  return (
    <>
      <Group
        style={{ cursor: "pointer", marginLeft: "10px", marginTop: "10px" }}
      >
        <Avatar size={"45px"} src={userData?.picture} />
        <Text color="inherit" size={"inherit"}>
          {userData?.name}
        </Text>
      </Group>
      <Space h={"md"} />
      <Divider variant="dotted" />

      {messages === undefined ? (
        <div className="message_box">
          <Stack>
            <Space h="xl" />
            <Group justify="flex-end">
              <Skeleton mr={"md"} height={40} radius={"lg"} width={300} />
            </Group>
          </Stack>
          <Stack>
            <Space h="xl" />
            <Group>
              <Skeleton ml={"md"} height={40} radius={"lg"} width={300} />
            </Group>
          </Stack>
          <Stack>
            <Space h="xl" />
            <Group justify="flex-end">
              <Skeleton mr={"md"} height={40} radius={"lg"} width={300} />
            </Group>
          </Stack>
          <Stack>
            <Space h="xl" />
            <Group>
              <Skeleton ml={"md"} height={40} radius={"lg"} width={300} />
            </Group>
          </Stack>
          <Stack>
            <Space h="xl" />
            <Group justify="flex-end">
              <Skeleton mr={"md"} height={40} radius={"lg"} width={300} />
            </Group>
          </Stack>
        </div>
      ) : (
        <div className="message_box">
          {messages?.map((message) =>
            message?.senderID === userID ? (
              <div key={message?._id} ref={scroll}>
                <Group justify="flex-end">
                  <span className="my_message">{message?.text}</span>
                </Group>
                <Group justify="flex-end">
                  <span className="my_message_time">
                    {moment(message?.createdAt).fromNow()}
                  </span>
                </Group>
              </div>
            ) : (
              <div key={message?._id} ref={scroll}>
                <Group>
                  <span className="to_message">{message?.text}</span>
                </Group>
                <Group>
                  <span className="to_message_time">
                    {moment(message?.createdAt).fromNow()}
                  </span>
                </Group>
              </div>
            )
          )}
        </div>
      )}
      <Flex align="center">
        <Group w={'100%'} grow>
          <InputEmoji
          theme="light"
            borderRadius={10}
            keepOpened={true}
            cleanOnEnter
            placeholder="Type a message"
            value={newMessage}
            onChange={setNewMessage}
            onEnter={handleSend}
          />
        </Group>
        <Button mr={10} style={{ marginBottom: "5px" }} onClick={handleSend}>
          Send
        </Button>
      </Flex>
    </>
  )
}

export default MessageContainer
