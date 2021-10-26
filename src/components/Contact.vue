<template>
  <div class="contact">
    <div class="row">
      <div class="col-auto">
        <div class="avatar" :style="getUserAvatarStyle"></div>
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
</template>

<script>
export default {
  name: 'Contact',
  props: {
    id: String,
    avatar: String,
    username: String,
    lastMessage: String,
  },
  computed: {
    getUserAvatarStyle() {
      return 'background: url(' + this.avatar + '); background-size: cover; display:block; width: 50px; height: 50px; border-radius: 50px;';
    }
  },
}
</script>

<style scoped>
/* .contact__container {
  padding: 2px;
} */
.username {
  font-size: 16px;
  color: #e4e4e4;
}
.last-message {
  font-size: 12px;
  color: #a5a5a5;
}

</style>