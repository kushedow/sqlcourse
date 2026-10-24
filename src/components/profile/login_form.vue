<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({

  name: "LoginForm",

  data() {
    return {
      email: "",
      message: "",
      isError: false,
      isLoading: false
    };
  },

  methods: {
    async submitLogin(): Promise<void> {
      this.message = "";
      this.isError = false;
      this.isLoading = true;

      try {
        const response = await fetch("https://8028296-lg653208.twc1.net/webhook/asql/send-auth-link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: this.email})
        });

        if (response.status === 200) {
          this.message = "Отправили ссылку для входа, проверяйте почту";
          return;
        }

        this.message = "Не удалось войти, обратитесь к разработчику";
        this.isError = true;
      } catch (error) {
        this.message = "Не удалось войти, обратитесь к разработчику";
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    }
  }

});

</script>

<template>
  <main class="container md:mt-8 mx-auto xl:w-4/6 2xl:w-4/6">
    <section class="md:rounded-3xl bg-white md:p-6 p-4">
      <h1 class="text-3xl font-semibold mb-3">Вход</h1>
      <p class="text-gray-700 mb-6">Введите свою почту, туда придет код для входа</p>

      <form class="max-w-md" @submit.prevent="submitLogin">
        <label class="block mb-2 font-medium" for="email">Электронная почта</label>
        <input
          id="email"
          v-model.trim="email"
          type="email"
          required
          class="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="you@example.com"
        />

        <button
          type="submit"
          :disabled="isLoading"
          class="text-[#242952] cursor-pointer rounded-xl inline-block bg-[#4ade80] px-6 py-3 font-bold hover:bg-[#3fd473] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? "Отправляем..." : "Войти" }}
        </button>
      </form>

      <p v-if="message" class="mt-4" :class="isError ? 'text-red-600' : 'text-green-700'">
        {{ message }}
      </p>
    </section>
  </main>
</template>
