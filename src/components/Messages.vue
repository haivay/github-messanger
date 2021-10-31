<template>
  <div class="messages">
    <div v-if="contact" class="contact_info">
      {{ contact.login }}
    </div>
    <div v-if="contact" ref="messagesContainer" class="messages__content mb-2">
      <div
        v-for="(message, index) in filtredMessages"
        :key="index" 
        class="message"
      >
        <div class="row">
          <div class="col-auto">
            <div class="avatar">
              <div class="avatar" :style="getMessageAvatarStyle(message, index)"></div>
            </div>
          </div>
          <div class="col">
            <div class="from" v-if="!checkMessageFromRepeat(index)">
              {{ message.from_login }}
            </div>
            <div class="content">
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="messages__content empty">
      <div class="messages__content_empty_container">
        <font-awesome-icon class="users_icon" :icon="['fas', 'users']" size="3x" inverse/>
        <div class="select_contact_message">Please select contact</div>
      </div>
    </div>
    <div v-if="contact" class="chat_input">
      <div class="row">
        <div class="col">
          <input v-model="newMessage" @keydown.enter="sendMessage" type="text" class="form-control" placeholder="Text message...">
        </div>
        <div class="col-auto align-self-center btn-send">
          <a @click="sendMessage">
            <font-awesome-icon class="paper-plane" :icon="['fas', 'paper-plane']" size="lg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { addMessage, useLoadMessages } from '@/firebase'
import 'firebase/firestore'
import { bus } from '../main'

export default {
  props: {
    id: String,
    avatar: String,
    username: String,
  },
  setup() {
    const newMessage = null;
    const messages = useLoadMessages();
    const filtredMessages = [];
    const contact = null;

    function getMessagesById() {
      if (this.contact) {
        return useLoadMessages(this.contact.node_id, this.id)
      }
    }

    return {
      newMessage, 
      messages, 
      filtredMessages, 
      contact, 
      getMessagesById
    }
  },
  created() {
    bus.$on('selectedChat', data => {
      this.contact = data;
    })
  },
  beforeDestroy() {
    bus.$off('selectedChat')
  },
  // computed: {
  //   getUserAvatarStyle(message) {
  //     let avatarUrl = this.checkMessageStyle(message) ? this.avatar : message.avatar_url
  //     return 'background: url(' + avatarUrl + '); background-size: cover; display:block; width: 50px; height: 50px; border-radius: 50px;';
  //   }
  // },
  watch: {
    contact() {
      this.getFiltredMessages()
      this.scrollToEnd()
    },
    messages() {
      this.getFiltredMessages()
      this.$forceUpdate()
    },
    filtredMessages() {
      // console.log('fil')
      // this.scrollToEnd({behavior: 'smooth'});
    }
  },
  methods: {
    // getMessagesById() {
    //   if (this.contact) {
    //     return useLoadMessages(this.contact.node_id, this.id)
    //   }
    // },
    scrollToEnd() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer
        // console.log(messagesContainer.scrollHeight)
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      })
      
    },
    getMessageAvatarStyle(message, index) {
      if (this.checkMessageFromRepeat(index)) {
        return 'background-size: cover; display:block; width: 40px;  border-radius: 40px;'
      } else {
        return this.checkMessageAvatar(message)
      }
    },
    checkMessageFromRepeat(index) {
      if (index === 0) {
        return false
      }

      if (this.filtredMessages[index].from_id === this.filtredMessages[index-1].from_id) {
        return true
      } else {
        return false 
      }
    },
    checkMessageAvatar(message) {
      let avatarUrl = message.from_id === this.id ? this.avatar : message.from_avatar
      return 'background: url(' + avatarUrl + '); background-size: cover; display:block; width: 40px; height: 40px; border-radius: 40px;';
    },
    getFiltredMessages() {
      if (this.contact) {
        this.filtredMessages = this.messages.filter(el => 
          (el.from_id === this.id || el.from_id === this.contact.node_id) &&
          (el.to_id === this.contact.node_id || el.to_id === this.id)
        )
      }
    },
    async sendMessage() {
      if (this.newMessage != null) {
        const messageForm = {
          from_id: this.id,
          from_login: this.username,
          from_avatar: this.avatar,
          to_id: this.contact.node_id,
          message: this.newMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.newMessage = null
        await addMessage(messageForm)
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style>
.contact_info {
  /* width: 100%; */
  background: rgb(66, 66, 66);
  height: 50px;

}
.messages__content {
  overflow: auto;
  width: 100%;
  height: 500px;
  background: #303133;
  border: 1px solid #6e6f72;
  border-radius: 0.25rem;
}
.messages__content::-webkit-scrollbar {
  width: 6px;
  background-color: #303133;
}
.messages__content::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #663F7A;
}
.empty {
  display: flex;
}
.messages__content_empty_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.users_icon {
  color: #9e9e9e;
  margin: 0 auto;
}
.select_contact_message {
  color: #9e9e9e;
  font-size: 20px;
  margin: 0 auto;
}
.message {
  background: #303133;
  border-radius: 6px;
  font-size: 14.5px;
  color: #9b9b9b;
  margin: 4px 10px 4px 10px;
  padding: 6px;
}
.message:hover {
  background: #5b5c5e;
}
.content {
  font-size: 15px;
  color: #ffffff;
}
.not-my-message {
  /* background: rgb(189, 189, 189); */
  /* background: #663F7A; */
  /* margin: 4px 40px 4px 10px; */
  /* margin: 2px 10px 2px 40px; */
}
.btn-send {
  padding-left: 0;
  margin-right: 5px;
  cursor: pointer;
}
.paper-plane {
  color: #ffffff;
}
.paper-plane:hover {
  color: #afafaf !important;
}
</style>