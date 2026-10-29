import {defineStore} from 'pinia';

const STORAGE_KEY = "profile";

interface ProfileState {
    email: string;
    auth_token: string;
    is_confirmed: boolean;
    auth_method: string;
    progress: number[];
}

// Значения по умолчанию
function defaultProfile(): ProfileState {
    return {
        email: "",
        auth_token: "",
        is_confirmed: false,
        auth_method: "",
        progress: [],
    };
}

// Загружаем профиль из localStorage при инициализации стора
function loadProfile(): ProfileState {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { return defaultProfile(); }

    try {
        const saved = JSON.parse(raw);
        return {
            email: saved.email ?? "",
            auth_token: saved.auth_token ?? "",
            is_confirmed: saved.is_confirmed ?? false,
            auth_method: saved.auth_method ?? "",
            progress: Array.isArray(saved.progress) ? saved.progress : [],
        };
    } catch (error) {
        console.error("Не удалось прочитать профиль из localStorage", error);
        return defaultProfile();
    }
}

export const useProfileStore = defineStore('profile', {

    state: (): ProfileState => loadProfile(),

    getters: {

        // Выполнен ли шаг
        isCompleted: (state) => (stepID: number): boolean => {
            return state.progress.includes(stepID);
        },

        completedCount: (state): number => {
            return state.progress.length;
        },

    },

    actions: {

        // Сохраняем текущее состояние профиля в localStorage
        persist(): void {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                email: this.email,
                auth_token: this.auth_token,
                is_confirmed: this.is_confirmed,
                auth_method: this.auth_method,
                progress: this.progress,
            }));
        },

        setEmail(email: string): void {
            this.email = email;
            this.persist();
        },

        setAuthToken(token: string): void {
            this.auth_token = token;
            this.persist();
        },

        setAuthMethod(method: string): void {
            this.auth_method = method;
            this.persist();
        },

        setConfirmed(isConfirmed: boolean): void {
            this.is_confirmed = isConfirmed;
            this.persist();
        },

        setProgress(progress: number[]): void {
            this.progress = progress;
            this.persist();
        },

        setAuth(email: string, token: string): void {
            this.email = email;
            this.auth_token = token;
            this.persist();
        },

        markCompleted(stepID: number): void {
            if (!this.progress.includes(stepID)) {
                this.progress.push(stepID);
                this.persist();
            }
        },

        reset(): void {
            this.email = "";
            this.auth_token = "";
            this.is_confirmed = false;
            this.auth_method = "";
            this.progress = [];
            this.persist();
        },

    },

});
