<template>
  <div class="sign-in">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-10 col-lg-4 mx-auto">
          <div class="card text-center mx-auto">
            <div class="card-body">
              <h5 class="card-title">Для использования приложения, необходимо авторизоваться</h5>
              <button 
                type="button" 
                class="btn btn_sign_in"
                @click="signIn('github')"
              >
                SignIn with GitHub
                <font-awesome-icon :icon="['fab', 'github']" size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'SignIn',
  props: {
    user: String
  },
  data() {
    return {
      isAuthorased: false,
    }
  },
  methods: {
    logIn() {
      console.log('logIn()')
      // this.$emit('logIn')
    },
    redirectToMain() {
      window.location = 'http://localhost:8080/';
    },
    signIn(provider) {
      this.$auth.authenticate(provider).then((response) => {
        console.log(response.data)
      })
    },
    // signIn(provider) {
    //   let self = this;
    //   this.$auth.authenticate(provider).then(function() {
    //     let token = self.$auth.getToken();
    //     self.$axios
    //       .get("auth/github", {
    //         params: { token: token, driver: provider }
    //       })
    //       .then(function(response) {
    //         this.$router.push({ name: 'main' });
    //         self.$root.closeDrawer();
    //         self.$root.signin(response.data);
    //       });
    //   })
    // },
  }
}
</script>

<style>
.main {
  background: rgb(48, 49, 51);
}
.card {
  margin-top: 50px;
  width: 100%;
  background: rgb(38, 39, 41);
  color: white;
}
.btn_sign_in {
  padding: 0.375rem 2rem;
  margin-top: 20px;
  font-size: 14px;
  background: rgb(39, 38, 43);
  color: rgb(231, 231, 231);
  border: 1px solid #cacaca;
}
.btn_sign_in:hover {
  background: rgb(32, 32, 36);
  color: rgb(231, 231, 231);
}
</style>