<template>
  <p v-if="userNotFound" class="error">
    The user with this email was not found. Please double check and try again.
  </p>

  <p v-else-if="wrongPassword" class="error">
    Seems like you've entered an incorrect email or password.
  </p>

  <p v-else-if="tooManyAttempts" class="error">
    Access to this account has been temporarily disabled due to many failed
    login attempts. Please try again later.
  </p>
</template>

<script>
import {LoginResult} from "@/domain/repository/AuthRepository"

export default {
  props: {
    result: LoginResult
  },
  computed: {
    userNotFound() { return this.result == LoginResult.UserNotFound },
    wrongPassword() { return this.result == LoginResult.WrongPassword },
    tooManyAttempts() { return this.result == LoginResult.TooManyAttempts },
  }
}
</script>
