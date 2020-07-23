<template>
  <div id="home">
    <div class="welcome">
      <h1 class="spacing">WELCOME</h1>
      <h1 class="spacing">TO</h1>
      <h1 class="bolder">NPM PACKAGE</h1>
      <h1 class="bolder">vue-form-terminator</h1>
      <h1 class="spacing">SAMPLE</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss">
$primary: #2185d0;
#home {
  display: grid;
  place-items: center;
  text-align: center;
  color: $primary;

  & .bolder {
    font-weight: bolder;
    font-size: 4rem;
  }

  & .spacing {
    letter-spacing: 5px;
  }
}
</style>
