<template lang="html">
  <div class="all">
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
            <menu-item icon="list" :is-active="true">
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
    <div class="footer">
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
    show (item) {
      console.log('loading is done:' + JSON.stringify(item))
    }
  }
}
</script>

<style lang="css" scoped>
.all {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
}
.menu {
  height: 100%;
  min-height: calc(100vh - 20px);
  flex-grow: 1;
  flex-shrink: 0;
}
.contents {
  margin-left: 0px;
  padding-left: 0px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  /* min-height: 100%; */
  flex-grow: 1;
  flex-shrink: 0;
}
.footer {
  min-height: 10px;
  background-color: grey;
  flex-shrink: 0;
}
</style>
