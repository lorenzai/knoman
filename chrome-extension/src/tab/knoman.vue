<template lang="html">
  <div>
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img :src="logo" alt="Knoman: manager for your web knowledge">
        </a>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-item is-expanded">
            <input class="input" id="navSearch" type="text" placeholder="Find your knowledge">
        </div>
        <div class="navbar-end">
          <a class="navbar-item"> End1</a>
          <a class="navbar-item">{{ user }}</a>
          <a class="navbar-item">
              <span class="icon">
                  <i class="fa fa-user-circle fa-2x"></i>
              </span>
          </a>
        </div>
      </div>
    </nav>

    <div class="main">
    <div class="columns" style="background-color: #f0f0f0;">
      <div class="column is-2">
        <!-- 2/12 -->
        <!-- <aside class="menu">
          <p class="menu-label">
            General
          </p>
          <ul class="menu-list">
            <li>
              <router-link :to="{ name: 'blacklists' }">
                <i class="fa fa-ban fa-fw"></i>
                Blacklists
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'cards' }">
                <i class="fa fa-connectdevelop fa-fw"></i>
                Websites 
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'graphs' }">
                <i class="fa fa-connectdevelop fa-fw"></i>
                knowledge Graph
              </router-link>
            </li>
          </ul>
        </aside> -->
        <div class="menu">
          <menus label="Administration">
            <menu-item icon="ban" :to="{ name: 'blacklists' }">Blacklists</menu-item>
              <!-- <menus slot="sub">
                <menu-item :to="{ path: '/components/menu/submenu1', query: { userId: 321 }}" icon="qq" :is-active="true">子子目录1</menu-item>
                <menu-item icon="google">
                  <span>子子目录2</span>
                  <menus slot="sub">
                    <menu-item icon="home">第三级1</menu-item>
                    <menu-item icon="home">第三级2</menu-item>
                    <menu-item icon="home">
                      <span>第三级3</span>
                      <menus slot="sub" type="float">
                        <menu-item icon="home">第四级1</menu-item>
                      </menus>
                    </menu-item>
                  </menus>
                </menu-item>
              </menus> -->
          </menus>
          <menus label="Contents">
            <menu-item icon="list">
              <span>Category</span>
              <menus slot="sub">
                <menu-item icon="object-group" :to="{ name: 'researches', params: { token: token.content } }">Researches</menu-item>
                <menu-item icon="search" :to="{ name: 'searches', params: { token: token.content } }">Searches</menu-item>
                <menu-item icon="internet-explorer" to="/">Websites</menu-item>
              </menus>
            </menu-item>
            <menu-item icon="connectdevelop" to="/graphs"><span>Knowledge Graphs</span></menu-item>
            <div class="divider"></div>
          </menus>
        </div>
      </div>
      <div class="column contents">
        <!-- This tile will take the rest: -->
        <router-view></router-view>
      </div>
    </div>
    </div> <!-- main -->
    <div class="foot">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      token: {},
      logo: '../icons/logo.png'
    }
  },
  created () {
    chrome.runtime.sendMessage({ from: 'knoman' }, function (response) {
      if (response && response.type === 'onKnoman') {
        this.user = response.user.username
        this.token = response.token
      }
    }.bind(this))
  },
  events: {
    loading () {
      console.log('loading is done')
    }
  }
}
</script>

<style lang="css" scoped>
.menu {
  height: 100%;
  min-height: 100vh;
}
.sidebar {
  height: 100%;
  background-color: #f7f7f7;
  border-right: 0.5px solid #f1f1f1;
}
.contents {
  padding: 20px;
  height: 100%;
  min-height: 100vh;
}
.foot {
  min-height: 100px;
  background-color: white;
}
</style>
