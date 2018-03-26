<template lang="html">
  <div>
    <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
        <!--
          <img src="chrome-extension://__MSG_@@extension_id__/images/icon-128.png" alt="Knoman: manager for your web knowledge" width="112" height="28">
          <img src="chrome-extension://pkjiiacndminmhofjeggfkbheibkaeag/images/logo.png" alt="Knoman: manager for your web knowledge">
          <img src="../icons/logo.png" alt="Knoman: manager for your web knowledge">
          <img src="chrome-extension://jlcdpcbbndofcebdhbjdnknommfdabbc/icons/logo.png" alt="Knoman: manager for your web knowledge">
        -->
          <img src="../icons/logo.png" alt="Knoman: manager for your web knowledge">
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
          <a class="navbar-item"> End2</a>
          <a class="navbar-item">
              <span class="icon">
                  <i class="fa fa-user-circle fa-2x"></i>
              </span>
          </a>
        </div>
      </div>
    </nav>

    <div class="main">
    <div class="columns">
      <div class="column is-2 sidebar">
        <!-- 2/12 -->
        <aside class="menu">
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
              <router-link :to="{ name: 'display' }">
                <i class="fa fa-connectdevelop fa-fw"></i>
                knowledge Graph
              </router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <!-- This tile will take the rest: -->
        <router-view></router-view>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="css" scoped>
.menu {
  padding: 20px;
}
.sidebar {
  height: 100vh;
  background-color: #f7f7f7;
  border-right: 0.5px solid #f1f1f1;
}
</style>
