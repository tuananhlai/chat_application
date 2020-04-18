<template>
  <div id="login-view">
    <div id="login-form">
      <img
        id="login-form-illustration"
        alt="illustration"
        src="../assets/login-human-illustration.png"
      />
      <form @submit.prevent="onSignIn">
        <h1>Member Login</h1>
        <input type="text" placeholder="Email" v-model="email" required />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <button type="submit">Login</button>
        <router-link to="/register" id="login-form-create-account">Create an account</router-link>
        <!--        <a>Forgot your password?</a>-->
      </form>
    </div>
  </div>
</template>

<script>
import login from "../lib/login";
export default {
  name: "Login",
  data() {
    return {
      email: "Guest@email.com",
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
          alert("Wrong email/password or the server isn't available. :'(");
        });
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
form {
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  background-color: #35529c;
  color: white;
  border: none;
  padding: 8px 15px;
  margin-top: 10px;
  border-radius: 100px;
  font-size: 1em;
  width: 50%;
  cursor: pointer;
}

button:hover {
  background-color: #3a4561;
}

input[type="text"],
[type="password"] {
  width: 300px;
  margin: 6px 0;
  padding: 10px;
  background-color: whitesmoke;
  border: none;
  border-radius: 100px;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  outline: 0;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.03) inset;
}

#login-view {
  background-color: whitesmoke;
  height: 100%;
}

#login-form {
  padding: 60px 25px;
  display: flex;
  flex-direction: row;
  /*border: 1px solid rgba(0, 0, 0, 0.2);*/
  width: fit-content;
  margin: auto;
  position: relative;
  top: 10em;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
}

#login-form-illustration {
  width: 22em;
  margin-right: 2em;
}

#login-form-create-account {
  font-size: 0.8em;
  color: gray;
  display: block;
  text-decoration: none;
}

#login-form-create-account:hover {
  color: cadetblue;
  cursor: pointer;
}
</style>