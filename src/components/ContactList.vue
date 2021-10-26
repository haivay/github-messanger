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
    <div v-if="!searched && contacts" class="contacts">
      <div 
        class="contact"
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
          >
            <Contact 
              :id="contact.contact.node_id"
              :avatar="contact.contact.avatar_url"
              :username="contact.contact.login"
              :lastMessage="contact.contact.lastMessage"
            />
          </button>
        </div>
      </div>
    </div>
    <div v-if="filtredContacts === null" class="contacts_empty">
      Contacts list is empty :(
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
    return {
      search, searched, selectedContact, contacts, filtredContacts
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
    searchGitHubUser(login) {
      axios.get(`https://api.github.com/users/${login}`)
      .then((response) => {
        this.searched = response.data
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
  background: rgb(77, 77, 77);
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
.contacts_empty {
  color: #e4e4e4;
  font-size: 14px;
}
</style>
