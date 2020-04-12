<template>
  <div id="login" class="bg-paper">
    <form @submit.prevent="onSignIn">
      <h1>Sign in</h1>
      <input type="text" placeholder="Email" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <button type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import login from "../lib/login";
export default {
  name: "Login",
  data() {
    return {
      email: "Lizeth39@hotmail.com",
      password: "password",
      errorMsg: ""
    };
  },
  methods: {
    onSignIn() {
      login
        .authorize(this.email, this.password)
        .then(({ data }) => {
          console.log(data);
          this.$store.commit("setUser", data.data.user);
          this.$store.commit("setToken", data.data.token);
          this.$router.push("/home");
        })
        .catch(err => {
          let error = { ...err };
          alert(error.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input[type="text"],
[type="password"] {
  width: 200px;
  margin: 5px;
}
[type="submit"] {
  width: 95px;
  margin-top: 10px;
}
#login {
  padding: 40px 90px;
}
</style>
