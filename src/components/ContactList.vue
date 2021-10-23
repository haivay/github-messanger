<template>
  <div class="contact-list">
    <div 
      class="contact"
      v-for="(contact, index) of contacts"
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
            :id="contact.id"
            :username="contact.username"
            :lastMessage="contact.lastMessage"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Contact from './Contact.vue'

export default {
  name: 'ContactList',
  components: {
    Contact
  },
  data() {
    return {
      selectedContact: {},
      contacts: [
        {
          id: 0,
          username: 'Evan You',
          profilePic: '',
          lastMessage: 'Bye!'
        },
        {
          id: 1,
          username: 'GitHubUser1',
          profilePic: '',
          lastMessage: 'Roger! bb!'
        },
        {
          id: 2,
          username: 'GitHubUser2',
          profilePic: '',
          lastMessage: 'Okey, I will do it..'
        },
      ]
    }
  },
  methods: {
    selectContact(index) {
      this.selectedContact = this.contacts[index];
    },
    checkSelectedContact(index) {
      return this.contacts.indexOf(this.selectedContact) == index ? true : false
    },
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
</style>
