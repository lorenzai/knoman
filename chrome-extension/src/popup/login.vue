<template lang="html">
  <div class="login">
    <v-layout row wrap>
      <v-flex xs12 class="login-message">
        <div>{{ message | capitalize }}</div>
      </v-flex>
      <v-layout v-if="login" row>
        <v-flex d-flex xs12>
          <v-text-field
            class="teal--text"
            flat
            single-line
            solo
            readonly
            :value="input.username"
            prepend-icon="fa fa-user-circle-o fa-2x"
            append-icon="fa fa-sign-out fa-2x"
            :append-icon-cb="logoutUser"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap class="px-3 py-3">
        <v-flex d-flex xs12 class="pb-3">
          <input class="input" type="email" v-model="input.username" placeholder="email" autofocus />
        </v-flex>
        <v-flex d-flex xs12 class="pb-3">
          <input class="input" type="password" v-model="input.password" placeholder="password" />
        </v-flex>
        <v-flex d-flex xs4>
          <button class="button is-primary is-outlined" v-on:click="loginUser()">Sign In</button>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex d-flex xs4 align-end>
          <button class="button is-danger is-outlined is-pulled-right" v-on:click="registerUser()">Register</button>
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
const REST_API_BASE = 'https://resorttransport.corp.ne1.yahoo.com:4443/knoman/api/v1'
axios.defaults.baseURL = REST_API_BASE + '/users'
export default {
  data () {
    return {
      login: false,
      message: 'Welcome',
      input: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    chrome.runtime.sendMessage({ mounted: true }, function (response) {
      this.message = 'Please sign in:'
      if (response.type === 'onMounted' && !response.isExpired) {
        this.input.username = response.user.username
        this.message = 'Welcome back'
        this.login = true
      }
    }.bind(this))
  },
  filters: {
    capitalize (v) {
      return v.charAt(0).toUpperCase() + v.slice(1)
    }
  },
  methods: {
    loginUser () {
      axios.post('/login', this.input, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(result => {
        chrome.runtime.sendMessage({
          login: true,
          user: {
            username: this.input.username
          },
          token: {
            content: result.data.token,
            exp: result.data.exp
          }
        })
        this.login = true
        this.message = 'Welcome back!'
      }, err => {
        this.login = false
        console.log(err.response)
        console.log(err.config)
        if (err.response && err.response.data && err.response.data.message) {
          this.message = err.response.data.message
        } else if (err.request) {
          this.message = 'No response from server. Try it later'
        } else {
          this.message = 'Login failed. Try it later.'
        }
      })
    },
    registerUser () {
      if (this.input.username === '') {
        this.message = 'Please specify a valid email address'
        return
      }
      if (this.input.password === '') {
        this.message = 'Please specify a valid password'
        return
      }
      axios.post('/register', this.input, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(result => {
        this.loginUser()
      }, err => {
        this.message = err.username
        console.log(err)
      })
    },
    logoutUser () {
      this.message = 'Please sign in:'
      this.login = false
      this.input.username = ''
      this.input.password = ''
      chrome.runtime.sendMessage({ logout: true, user: this.input, token: { content: '', exp: 0 } })
    }
  }
}
</script>

<style lang="css">
.login {
  padding: 16px 0 16px 0;
}
.login-message {
  padding: 16px 16px 0 16px;
}
</style>