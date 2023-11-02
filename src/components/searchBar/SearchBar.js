import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { createChat, getAllUsers } from "../../api/api"
import { Avatar, Flex, Group, Space, Text } from "@mantine/core"

const SearchBar = ({ chats, user }) => {
  const queryclient = useQueryClient()
  const { data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(),
  })

  const removedMeFromAllUsers = data?.filter((datum) => datum._id !== user._id)

  const allCurrentMembers = chats?.map((chat) => {
    return chat?.members?.find((member) => member !== user._id)
  })
  // eslint-disable-next-line
  const newUsers = removedMeFromAllUsers?.filter((user) => {
    if (!allCurrentMembers?.includes(user._id)) {
      return user
    }
  })

  const { mutate } = useMutation({
    mutationFn: (id) => createChat({ senderID: user?._id, receiverID: id }),
    onSuccess: (data) => {
      queryclient.invalidateQueries({ queryKey: ["chats"] })
      queryclient.invalidateQueries({ queryKey: ["allUsers"] })
    },
  })

  return (
    <div className="chat_left">
      <Flex justify="flex-start" align="flex-start" direction="column">
        {newUsers?.length === 0 ? (
          <Text>You're connected with all users</Text>
        ) : (
          newUsers?.map((newUser) => (
            <Group
              style={{ cursor: "pointer" }}
              onClick={() => mutate(newUser?._id)}
            >
              <Avatar src={newUser?.picture} />
              <Text>{newUser?.name}</Text>
              <Space />
            </Group>
          ))
        )}
      </Flex>
    </div>
  )
}

export default SearchBar
