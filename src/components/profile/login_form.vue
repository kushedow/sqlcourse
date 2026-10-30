<script lang="ts">

import {defineComponent} from "vue";
import {LOGIN_URL} from "../../config";
import {useProfileStore} from "../../stores/profile_store";

export default defineComponent({

  name: "LoginForm",

  emits: ["submit"],

  data() {
    return {
      email: "",

      sent: false,      // заявка отправлена, показываем окно подтверждения
      sending: false,   // запрос в процессе
      error: "",        // текст ошибки запроса
    };
  },

  computed: {
    // Корректно ли заполнена почта (минимальная проверка)
    isEmailValid(): boolean {
      const email = this.email.trim();
      return email.length > 0 && email.includes("@");
    },

    // Форма готова к отправке, когда почта заполнена
    isComplete(): boolean {
      return this.isEmailValid;
    },
  },

  methods: {
    async submit(): Promise<void> {
      if (!this.isComplete || this.sending) { return; }

      this.sending = true;
      this.error = "";

      const payload = {
        email: this.email.trim(),
      };

      try {
        const response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        // Сохраняем почту и способ входа в профиль
        const profile = useProfileStore();
        profile.setEmail(payload.email);
        profile.setAuthMethod("email");

        this.$emit("submit", payload);
        this.sent = true;

      } catch (err) {
        console.error("Ошибка при входе", err);
        this.error = "Не удалось отправить запрос. Попробуйте ещё раз.";
      } finally {
        this.sending = false;
      }
    },
  },

});

</script>

<template>
  <main class="login-form container md:mt-8 mx-auto xl:w-4/6 2xl:w-4/6">
    <section class="login-form__card md:rounded-3xl bg-white md:p-6 p-4">
      <button @click="$router.go(-1)" class="login-form__back mb-4 rounded-full bg-gray-200 pr-4 pl-3 py-1 text-black-300 text-sm cursor-pointer">← Назад</button>

      <!-- Экран 1: ввод почты -->
      <template v-if="!sent">
        <h1 class="login-form__title text-3xl font-semibold mb-2">Вход</h1>
        <p class="login-form__subtitle text-gray-700 mb-6">Введите почту — мы отправим на неё ссылку для входа.</p>

        <form class="login-form__form max-w-2xl" @submit.prevent="submit">

          <fieldset class="login-form__fieldset mb-8">
            <legend class="login-form__legend text-xl font-semibold mb-3">Почта</legend>
            <input
              v-model.trim="email"
              type="email"
              placeholder="you@example.com"
              class="login-form__email w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </fieldset>

          <p v-if="error" class="login-form__error mb-4 text-red-600">{{ error }}</p>

          <button
            type="submit"
            :disabled="!isComplete || sending"
            class="login-form__submit text-[#242952] cursor-pointer rounded-xl inline-block bg-[#4ade80] px-6 py-3 font-bold hover:bg-[#3fd473] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ sending ? "Отправляем..." : "Получить ссылку" }}
          </button>
        </form>
      </template>

      <!-- Экран 2: подтверждение -->
      <div v-else class="login-form__confirm max-w-2xl">
        <h1 class="login-form__title text-3xl font-semibold mb-2">Проверьте почту</h1>
        <p class="login-form__message text-gray-700 mb-2">
          Мы отправили ссылку для входа на вашу почту, нажмите её чтобы войти.
        </p>
        <p class="login-form__message text-gray-700">
          Если письма нет – подождите пару минут и проверьте папку спам.
        </p>
      </div>

    </section>
  </main>
</template>
