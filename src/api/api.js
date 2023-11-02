import axios from "axios"
import { toast } from "react-toastify"

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVERURL}/api/v1`,
})

export const createUser = async (email, name, picture, token) => {
  try {
    await api.post(
      `/register`,
      { email, name, picture },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch (error) {
    toast.error("Error creating user")
  }
}

export const getUserChats = async (id) => {
  try {
    const chats = await api.get(`/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    return chats.data
  } catch (error) {
    console.log("Error retrieving chats")
  }
}

export const getUserInfo = async (email) => {
  try {
    const response = await api.post(
      `/user/info`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log("Error getting user info")
  }
}

export const getToChatUser = async (id) => {
  try {
    const response = await api.post(
      `/user/info/id`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log("Error getting toChatUser info")
  }
}

export const getMessages = async (id) => {
  try {
    const response = await api.get(`/message/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    return response.data
  } catch (error) {
    console.log("Error getting toChatUser info")
  }
}

export const addMessage = async ({ chatID, senderID, text }) => {
  try {
    const response = await api.post(
      `/message/add`,
      { chatID, senderID, text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    return response.data
  } catch (error) {
    toast.error("Error sending message")
  }
}

export const getAllUsers =async()=>{
  try {
    const response = await api.get(`/user/all`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

export const createChat = async({senderID,receiverID})=>{
  try {
    const response = await api.post(`/chat/create`,{
      senderID,receiverID
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}
