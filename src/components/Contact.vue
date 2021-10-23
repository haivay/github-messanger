<template>
  <div class="contact">
    <div class="contact__container">
      <div class="row">
        <div class="col-auto">
          <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" inverse/>
        </div>
        <div class="col">
          <div class="username">
            {{ username }}
          </div>
          <div class="last-message">
            {{ lastMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    id: Number,
    username: String,
    lastMessage: String
  }
}
</script>

<style scoped>
.contact__container {
  padding: 5px;
}
.username {
  font-size: 16px;
  color: #e4e4e4;
}
.last-message {
  font-size: 12px;
  color: #a5a5a5;
}

</style>