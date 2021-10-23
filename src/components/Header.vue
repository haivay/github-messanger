<template>
  <div class="header">
    <div class="header__container d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-auto align-self-center">
            {{ user.name }}
          </div>
          <div class="col-auto align-self-center">
            <button
              class="btn btn-log-out"
              @click="$router.push({ name: 'signIn' })"
            >
              Log out
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" inverse/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: {
        name: 'Haivay',
      }
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
.btn-log-out {
  background: rgb(39, 38, 43);
  color: rgb(231, 231, 231);
  border: 1px solid #cacaca;
}
.btn-log-out:hover {
  background: rgb(32, 32, 36);
  color: rgb(231, 231, 231);
}
</style>
