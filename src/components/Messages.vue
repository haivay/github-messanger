<template>
  <div class="messages">
    <div v-if="contact" class="messages__content mb-2">
      <div
        v-for="(message, index) in filtredMessages"
        :key="index" 
        class="message"
      >
        <div class="from">
          {{ message.from_login }}
        </div>
        <div class="content">
          {{ message.message }}
        </div>
      </div>
    </div>
    <div v-else class="messages__content empty">
      <div class="messages__content_empty_container">
        <font-awesome-icon class="users_icon" :icon="['fas', 'users']" size="3x" inverse/>
        <div class="select_contact_message">Please select contact</div>
      </div>
    </div>
    <div class="chat_input">
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
    const filtredMessages = null;
    const contact = null;
    return {
      newMessage, messages, filtredMessages, contact
    }
  },
  created() {
    bus.$on('selectContact', data => {
      this.contact = data.contact;
    })
  },
  beforeDestroy() {
    bus.$off('selectContact')
  },
  watch: {
    contact() {
      this.getFiltredMessages()
    },
    messages() {
      this.getFiltredMessages()
    }
  },
  methods: {
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
          to_id: this.contact.node_id,
          message: this.newMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.newMessage = null
        await addMessage(messageForm)
        this.$forceUpdate()
        // this.getMessagesForId();
      }
    }
  }
}
</script>

<style>
/* .messages {
  height: 600px;
} */
.messages__content {
  overflow: auto;
  width: 100%;
  height: 500px;
  background: #303133;
  /* border: 1px solid #6e6f72; */
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
  background: #663F7A;
  border-radius: 6px;
  color: #ffffff;
  margin: 2px 40px 2px 10px;
  padding: 6px;
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