import { Modal } from "@mantine/core"
import SearchBar from "../searchBar/SearchBar"
import './chatModal.css'

const ChatModal = ({ opened, close,chats,user }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="New Chat"
      radius={10}
      pos={'relative'}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <div className="modal_container">
        <SearchBar chats={chats} user= {user} />
      </div>
    </Modal>
  )
}

export default ChatModal
