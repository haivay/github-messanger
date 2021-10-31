<template>
  <div class="contact">
    <div class="row">
      <div class="col-auto">
        <div class="avatar" :style="getUserAvatarStyle"></div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col username">
            {{ username }}
          </div>
          <div class="col-auto">
            <a class="btn-add" @click="addChat">
              <font-awesome-icon class="user-plus-icon" :icon="['fas', 'user-plus']" inverse/>
            </a>
          </div>
        </div>
        <div class="name">
          {{ name }}
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
    name: String,
    username: String,
    lastMessage: String,
  },
  computed: {
    getUserAvatarStyle() {
      return 'background: url(' + this.avatar + '); background-size: cover; display:block; width: 50px; height: 50px; border-radius: 50px;';
    }
  },
  methods: {
    addChat() {
      this.$emit('addChat')
    }
  }
}
</script>

<style scoped>
.contact__container {
  padding: 5px;
}
.name {
  font-size: 12px;
  color: #e4e4e4;
}
.username {
  font-size: 16px;
  color: #e4e4e4;
  /* padding-right: 0; */
}
.btn-add {
  cursor: pointer;
}
.user-plus-icon:hover {
  color: #bdbdbd;
}
</style>