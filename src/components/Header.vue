<template>
  <div class="header">
    <div class="header__container d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-end">
          <div v-if="user" class="col-auto align-self-center">
            {{ user.login }}
          </div>
          <div class="col-auto align-self-center">
            <a v-if="user" :href="user.html_url" target="_blank">
              <div :style="getUserAvatarStyle"></div>
            </a>
          </div>
          <div class="col-auto align-self-center">
            <button
              v-if="user"
              class="btn btn-log-out"
              @click="logOut"
            >
              Log out
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" inverse/>
            </button>
            <button
              v-else
              class="btn btn-sign-in"
              @click="$router.push({ name: 'signIn' })"
            >
              SignIn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Header',
  props: {
    user: Object
  },
  data() {
    return {

    }
  },
  computed: {
    getUserAvatarStyle() {
      return 'background: url(' + this.user.avatar_url + '); background-size: cover; display:block; width: 38px; height: 38px; border-radius: 38px;';
    }
  },
  methods: {
    logOut() {
      this.user = null
      this.$router.push({ name: 'signIn' })
    }
  }
}
</script>

<style scoped>
.header__container {
  font-weight: 500;
  height: 50px;
  background: rgb(66, 66, 66);
  color: #cccccc;
  padding: 0 30px;
}
.user_login {
  text-decoration: none;
  color: #e9e9e9
}
.btn-sign-in {
  background: #9a31ca;
  color: #e9e9e9;
  /* border: 1px solid #cacaca; */
}
.btn-sign-in:hover {
  background: #b943f0;
  color: #e9e9e9;
}
.btn-log-out {
  background: rgb(39, 38, 43);
  color: #e9e9e9;
  /* border: 1px solid #cacaca; */
}
.btn-log-out:hover {
  background: rgb(32, 32, 36);
  color: #e9e9e9;
}
</style>
