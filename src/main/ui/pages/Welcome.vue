<template>
  <div class="container">
    <h1>Welcome to Tweeter</h1>
    <p class="intro">Please login or sign up to continue.</p>
    <div class="links">
      <RouterLink class="link" to="/login">Login</RouterLink>
      <RouterLink class="link" to="/signup">Sign Up</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  margin-bottom: 10px;
}

.links {
  margin-top: 5px;
}

.container {
  text-align: center;
}

.link {
  display: block;
  width: 320px;
  margin: 15px auto;
  padding: 9px 0;
  text-align: center;
  border: 1px solid #000;
  border-radius: 100px;
  color: #000;
  text-decoration: none;

  &:hover, &:focus {
    background: #ddd;
  }
}
</style>
