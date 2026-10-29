<script lang="ts">

import {defineComponent} from "vue";
import {SIGNUP_URL} from "../../config";
import {useProfileStore} from "../../stores/profile_store";

// Варианты ответов анкеты
const GOALS = [
  { value: "interview", label: "Подготовка к собеседованию" },
  { value: "work", label: "Нужно на работе" },
  { value: "study", label: "Нужно для учебы" },
  { value: "self", label: "Для саморазвития" },
];

const PROFILES = [
  { value: "analyst", label: "Аналитик данных / продуктовый аналитик" },
  { value: "developer", label: "Разработчик" },
  { value: "qa", label: "Тестировщик (QA)" },
  { value: "product", label: "Продакт-маркетолог" },
  { value: "student", label: "Студент" },
  { value: "other", label: "Другое" },
];

const LEVELS = [
  { value: "none", label: "Никогда не писал(а) SQL" },
  { value: "beginner", label: "Новичок: знаю SELECT, WHERE" },
  { value: "basic", label: "Базовый: JOIN, GROUP BY, подзапросы" },
  { value: "advanced", label: "Уверенный: оконные функции, CTE, работа с датами" },
];

export default defineComponent({

  name: "SignupForm",

  emits: ["submit"],

  data() {
    return {
      GOALS,
      PROFILES,
      LEVELS,

      goal: "",
      profile: "",
      otherProfile: "",
      level: "",
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

    // Анкета готова к отправке, когда все вопросы отвечены и почта заполнена
    isComplete(): boolean {
      if (!this.goal || !this.profile || !this.level) { return false; }
      if (this.profile === "other" && !this.otherProfile.trim()) { return false; }
      if (!this.isEmailValid) { return false; }
      return true;
    },
  },

  methods: {
    async submit(): Promise<void> {
      if (!this.isComplete || this.sending) { return; }

      this.sending = true;
      this.error = "";

      const payload = {
        email: this.email.trim(),
        goal: this.goal,
        profile: this.profile,
        profile_other: this.profile === "other" ? this.otherProfile.trim() : "",
        level: this.level,
      };

      try {
        const response = await fetch(SIGNUP_URL, {
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
        console.error("Ошибка при регистрации", err);
        this.error = "Не удалось отправить заявку. Попробуйте ещё раз.";
      } finally {
        this.sending = false;
      }
    },
  },

});

</script>

<template>
  <main class="signup-form container md:mt-8 mx-auto xl:w-4/6 2xl:w-4/6">
    <section class="signup-form__card md:rounded-3xl bg-white md:p-6 p-4">
      <button @click="$router.go(-1)" class="signup-form__back mb-4 rounded-full bg-gray-200 pr-4 pl-3 py-1 text-black-300 text-sm cursor-pointer">← Назад</button>

      <!-- Экран 1: анкета -->
      <template v-if="!sent">
        <h1 class="signup-form__title text-3xl font-semibold mb-2">Расскажите о себе</h1>
        <p class="signup-form__subtitle text-gray-700 mb-6">Эти ответы помогут подобрать программу под ваши цели.</p>

        <form class="signup-form__form max-w-2xl" @submit.prevent="submit">

          <!-- 1. Цель обучения -->
          <fieldset class="signup-form__fieldset mb-8">
            <legend class="signup-form__legend text-xl font-semibold mb-3">1. Цель обучения</legend>
            <div class="signup-form__options space-y-2">
              <label
                v-for="option in GOALS"
                :key="option.value"
                class="signup-form__option flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 cursor-pointer hover:border-emerald-400 transition-colors"
                :class="goal === option.value ? 'border-emerald-500 bg-emerald-50' : ''"
              >
                <input
                  type="radio"
                  name="goal"
                  :value="option.value"
                  v-model="goal"
                  class="signup-form__radio accent-emerald-600"
                />
                <span class="signup-form__option-label text-gray-800">{{ option.label }}</span>
              </label>
            </div>
          </fieldset>

          <!-- 2. Какой у вас профиль -->
          <fieldset class="signup-form__fieldset mb-8">
            <legend class="signup-form__legend text-xl font-semibold mb-3">2. Какой у вас профиль</legend>
            <div class="signup-form__options space-y-2">
              <label
                v-for="option in PROFILES"
                :key="option.value"
                class="signup-form__option flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 cursor-pointer hover:border-emerald-400 transition-colors"
                :class="profile === option.value ? 'border-emerald-500 bg-emerald-50' : ''"
              >
                <input
                  type="radio"
                  name="profile"
                  :value="option.value"
                  v-model="profile"
                  class="signup-form__radio accent-emerald-600"
                />
                <span class="signup-form__option-label text-gray-800">{{ option.label }}</span>
              </label>
            </div>

            <input
              v-if="profile === 'other'"
              v-model.trim="otherProfile"
              type="text"
              placeholder="Уточните ваш профиль"
              class="signup-form__other mt-2 w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </fieldset>

          <!-- 3. Самооценка уровня -->
          <fieldset class="signup-form__fieldset mb-8">
            <legend class="signup-form__legend text-xl font-semibold mb-3">3. Самооценка уровня</legend>
            <div class="signup-form__options space-y-2">
              <label
                v-for="option in LEVELS"
                :key="option.value"
                class="signup-form__option flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 cursor-pointer hover:border-emerald-400 transition-colors"
                :class="level === option.value ? 'border-emerald-500 bg-emerald-50' : ''"
              >
                <input
                  type="radio"
                  name="level"
                  :value="option.value"
                  v-model="level"
                  class="signup-form__radio accent-emerald-600"
                />
                <span class="signup-form__option-label text-gray-800">{{ option.label }}</span>
              </label>
            </div>
          </fieldset>

          <!-- 4. Почта -->
          <fieldset class="signup-form__fieldset mb-8">
            <legend class="signup-form__legend text-xl font-semibold mb-3">4. Почта</legend>
            <input
              v-model.trim="email"
              type="email"
              placeholder="you@example.com"
              class="signup-form__email w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </fieldset>

          <p v-if="error" class="signup-form__error mb-4 text-red-600">{{ error }}</p>

          <button
            type="submit"
            :disabled="!isComplete || sending"
            class="signup-form__submit text-[#242952] cursor-pointer rounded-xl inline-block bg-[#4ade80] px-6 py-3 font-bold hover:bg-[#3fd473] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ sending ? "Отправляем..." : "Отправить" }}
          </button>
        </form>
      </template>

      <!-- Экран 2: подтверждение -->
      <div v-else class="signup-form__confirm max-w-2xl">
        <h1 class="signup-form__title text-3xl font-semibold mb-2">Проверьте почту</h1>
        <p class="signup-form__message text-gray-700 mb-2">
          Вам на почту была отправлена ссылка с подтверждением, нажмите её чтобы завершить регистрацию.
        </p>
        <p class="signup-form__message text-gray-700 mb-2">
          Это ваша вечная ссылка и вы сможете переходить по ней всегда.
        </p>
        <p class="signup-form__message text-gray-700">
          Если письма нет – подождите пару минут и проверьте папку спам.
        </p>
      </div>

    </section>
  </main>
</template>
