<template>
  <div class="contact-list">
    <div class="form-group mb-2">
      <input 
        type="text" 
        class="form-control search-input"
        placeholder="Search for GitHub user..."
        v-model="search"
      >
    </div>
    <div v-if="searched" class="contact_preview">
      <ContactPreview
        :id="searched.node_id"
        :avatar="searched.avatar_url"
        :name="searched.name ? searched.name : ''"
        :username="searched.login"
        :lastMessage="''"
        @addChat="addChat"
      />
    </div>
    <div v-if="!searched && !searchContactError && chats.value" class="contacts">
      <div 
        class="contact-item"
        v-for="(chat, index) of chats.value"
        :key="index"
      >
        <div class="list-group list-group-flush">
          <button 
            type="button" 
            class="list-group-item list-group-item-border list-group-item-action" 
            :class="checkSelectedChat(index) ? 'selected-contact' : ''"
            aria-current="true"
            @click="selectChat(index)"
            @mouseover="contactHoverIndex = index" @mouseleave="contactHoverIndex = -1"
          >
            <div class="row">
              <div class="col">
                <Contact 
                  :id="chat.membersIDS.filter(memberID => memberID != user.node_id)[0].node_id"
                  :avatar="chat.members.filter(member => member.node_id != user.node_id)[0].avatar_url"
                  :username="chat.members.filter(member => member.node_id != user.node_id)[0].login"
                  :lastMessage="chat.lastMessage"
                />    
              </div>
              <div class="col-auto">
                <font-awesome-icon v-if="contactHoverIndex === index" @click="deleteChat(index)" class="user-minus-icon" :icon="['fas', 'user-minus']" size="sm" inverse/>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-if="searchContactError" class="contacts_error">
      {{ searchContactError }}
    </div>
  </div>
</template>

<script>
import ContactPreview from './ContactPreview.vue'
import Contact from './Contact.vue'
import axios from 'axios'
import firebase from "firebase/compat/app";
import { addChat, useLoadUsers } from '@/firebase'
import 'firebase/firestore'
import { bus } from '../main'

export default {
  name: 'ContactList',
  components: {
    ContactPreview,
    Contact
  },
  props: {
    user: Object,
    chats: [Object, Array]
  },
  setup() {
    const search = null;
    const searched = null;
    const selectedChat = null;
    const contacts = useLoadUsers();
    const filtredContacts = null;
    const searchContactError = null;
    const contactHoverIndex = -1;
    return {
      search, 
      searched, 
      selectedChat, 
      contacts, 
      filtredContacts, 
      searchContactError, 
      contactHoverIndex
    }
  },
  watch: {
    search(newValue) {
      this.searched = newValue ? this.searchGitHubUser(newValue) : null
    },
    // contacts(newValue) {
    //   if (this.user) {
    //     this.filtredContacts = newValue.filter(el => el.id === this.user.node_id)
    //   }
    // }
  },
  methods: {
    selectChat(index) {
      this.selectedChat = this.chats.value[index];
      bus.$emit('selectedChat', this.selectedChat);
    },
    checkSelectedChat(index) {
      return this.chats.value.indexOf(this.selectedChat) == index ? true : false
    },
    deleteChat(index) {
      // this.selectedContact = null;
      // bus.$emit('selectChat', this.selectedContact);
      console.log(index)
    },

    searchGitHubUser(login) {
      axios.get(`https://api.github.com/users/${login}`)
      .then((response) => {
        
        this.searched = response.data
        this.searchContactError = null;
      })
      .catch(err => { 
        if (err.response) { 
          // client received an error response (5xx, 4xx)
          this.searchContactError = 'User not found...'
        } else if (err.request) { 
          // client never received a response, or request never left 
          this.searchContactError = 'Request error :('
        } else { 
          // anything else 
          this.searchContactError = 'Search error!'
        } 
      })
    },
    async addChat() {
      if (this.searched != null) {
        const chatForm = {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          membersIDS: [this.user.node_id, this.searched.node_id],
          members: [this.user, this.searched],
          lastMessage: ''
        }
        this.search = null
        this.searched = null
        await addChat(chatForm)
      }
    }
  }
}
</script>

<style scoped>
.list-group-item {
  /* background: rgb(77, 77, 77); */
  background: #303133;
}
.list-group-item:hover {
  background: rgb(87, 87, 87);
}
.list-group-item-border {
  border-bottom: 1px solid #7c7c7c !important;
}
.selected-contact {
  background: rgb(119, 119, 119) !important;
}
.contacts_error {
  color: #e4e4e4;
  font-size: 14px;
}
</style>
