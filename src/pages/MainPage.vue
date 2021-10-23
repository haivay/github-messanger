<template>
  <div class="main">
    <div class="header mb-3">
      <Header />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-5 col-lg-4">
          <ContactList></ContactList>
        </div>
        <div class="col-sm-0 col-md-7 col-lg-8">
          <div class="messages">
            messages
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ContactList from '../components/ContactList.vue'

export default {
  name: 'MainPage',
  components: {
    Header,
    ContactList
  },
  data() {
    return {
      user: {
        name: 'haivay'
      },
    }
  }
}
</script>

<style>
body {
  background: #303133;
  font-family: "Bliss Pro",Helvetica,Arial,sans-serif;
}
.messages {
  width: 100%;
  height: 100%;
  background: #303133;
  border: 1px solid #6e6f72;
  border-radius: 6px;
}
</style>