<template>
  <div class="main">
    <div class="header mb-3">
      <Header 
        :user="user"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-5 col-lg-4">
          <ContactList 
            :user="user"
          />
        </div>
        <div class="col-sm-0 col-md-7 col-lg-8">
          <Messages 
            v-if="user"
            :id="user.node_id"
            :avatar="user.avatar_url"
            :username="user.login"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ContactList from '../components/ContactList.vue'
import Messages from '../components/Messages.vue'
import axios from 'axios'

export default {
  name: 'MainPage',
  components: {
    Header,
    ContactList,
    Messages
  },
  data() {
    return {
      user: null
    }
  },
  async created() {
    if (!this.user) {
      await this.getUserData()
      // console.log(this.user)
    }
  },
  methods: {
    async getUserData() {
      await axios.get('http://localhost:3000/api/me', {
        withCredentials: true,
      })
      .then((res) => this.user = res.data);
    }
  }
}
</script>

<style>
body {
  background: #303133;
  font-family: "Bliss Pro",Helvetica,Arial,sans-serif;
}
.form-control {
  color: #e2e2e2;
  background: #303133;
  border-color: #888888;
}
.form-control:focus {
  color: #e2e2e2;
  background: #303133;
  border-color: #888888;
  box-shadow: none;
}
</style>