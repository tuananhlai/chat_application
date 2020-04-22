<template>
  <div id="registration-view">
    <div id="registration-form">
      <form @submit.prevent="onRegister">
        <h1>Register</h1>
        <input type="text" placeholder="Name" v-model="name" required />
        <input type="text" placeholder="Email" v-model="email" required />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <input
          type="password"
          placeholder="Retype Password"
          v-model="confirmPassword"
          required
        />
        <button type="submit" :disabled="password !== confirmPassword">
          Register
        </button>
        <!--        <a>Forgot your password?</a>-->
        <router-link to="/login">Already has an account?</router-link>
        <p>{{ registrationResultNotification }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import userAPI from "../lib/user";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      registrationResultNotification: ""
    };
  },
  methods: {
    onRegister() {
      console.log("Register");
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      userAPI
        .registerUser(newUser)
        .then(data => {
          console.log(data);
          this.registrationResultNotification =
            "Register Success. You will be directed to login page shortly.";
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch(err => {
          let e = {...err}.response.data;
          alert(e.message);
        });
    }
  }
};
</script>

<style scoped>
#registration-view {
  background-color: whitesmoke;
  height: 100%;
}

#registration-form {
  padding: 30px 25px;
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

button:disabled {
  background-color: lightgrey;
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
</style>
