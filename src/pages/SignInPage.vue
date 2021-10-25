<template>
  <div class="sign-in">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-10 col-lg-4 mx-auto">
          <div class="card text-center mx-auto">
            <div class="card-body">
              <h5 class="card-title">Чтобы использовать приложение, необходимо авторизоваться</h5>
              <a 
                href="https://github.com/login/oauth/authorize?client_id=75691eac3da77485bbef&redirect_uri=http://localhost:3000/auth/callback?path=/&scope=user:email"
                class="btn btn_sign_in"
              >
                SignIn with GitHub
                <font-awesome-icon :icon="['fab', 'github']" size="lg" />
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    redirectToMain() {
      window.location = 'http://localhost:8080/';
    }
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