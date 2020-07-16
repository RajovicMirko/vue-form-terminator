<template>
  <div id="app">
    <div class="nav">
      <div class="banner">
        <h2>{{ title }}</h2>
      </div>
      <div class="links">
        <router-link
          class="link"
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          >{{ route.name }}</router-link
        >
      </div>
    </div>
    <router-view class="page" />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      title: "NPM vue-form-terminator SAMPLES",
    };
  },

  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
};
</script>

<style lang="scss">
$primary: #2185d0;
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: Arial, Helvetica, sans-serif !important;
}

#app {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100vw;
  height: 100vh;

  & .nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
    background-color: $primary;
    color: white !important;

    & .banner {
      flex: 1;
    }

    & .links {
      position: relative;
      display: flex;
      justify-content: space-evenly;
      flex: 1;

      & .link {
        color: white;
      }
    }
  }

  .page {
    color: $primary;

    & .git-link {
    }
  }
}

@media (max-width: 930px) {
  .nav {
    flex-direction: column;

    & .banner {
      text-align: center;
    }

    & .links {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
}
</style>
