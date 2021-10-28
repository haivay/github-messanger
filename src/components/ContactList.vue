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
        @addContact="addContact"
      />
    </div>
    <div v-if="!searched && !searchContactError && contacts" class="contacts">
      <div 
        class="contact-item"
        v-for="(contact, index) of filtredContacts"
        :key="index"
      >
        <div class="list-group list-group-flush">
          <button 
            type="button" 
            class="list-group-item list-group-item-border list-group-item-action" 
            :class="checkSelectedContact(index) ? 'selected-contact' : ''"
            aria-current="true"
            @click="selectContact(index)"
            @mouseover="contactHoverIndex = index" @mouseleave="contactHoverIndex = -1"
          >
            <div class="row">
              <div class="col">
                <Contact 
                  :id="contact.contact.node_id"
                  :avatar="contact.contact.avatar_url"
                  :username="contact.contact.login"
                  :lastMessage="contact.contact.lastMessage"
                />    
              </div>
              <div class="col-auto">
                <font-awesome-icon v-if="contactHoverIndex === index" @click="deleteContact(index)" class="user-minus-icon" :icon="['fas', 'user-minus']" size="sm" inverse/>
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
import { addUser, useLoadUsers } from '@/firebase'
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
  },
  setup() {
    const search = null;
    const searched = null;
    const selectedContact = null;
    const contacts = useLoadUsers();
    const filtredContacts = null;
    const searchContactError = null;
    const contactHoverIndex = -1;
    return {
      search, 
      searched, 
      selectedContact, 
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
    contacts(newValue) {
      if (this.user) {
        this.filtredContacts = newValue.filter(el => el.id === this.user.node_id)
      }
    }
  },
  methods: {
    selectContact(index) {
      this.selectedContact = this.filtredContacts[index];
      bus.$emit('selectContact', this.selectedContact);
    },
    checkSelectedContact(index) {
      return this.contacts.indexOf(this.selectedContact) == index ? true : false
    },
    deleteContact(index) {
      // this.selectedContact = null;
      // bus.$emit('selectContact', this.selectedContact);
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
    async addContact() {
      if (this.searched != null) {
        const contactForm = {
          id: this.user.node_id,
          contact: this.searched,
          addedAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.search = null
        this.searched = null
        await addUser(contactForm)
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
