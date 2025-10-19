import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {

    state: () => ({
        isMenuVisible: true,
        isSchemaVisible: true,
    }),

    actions: {

        toggleMenu() {
            this.isMenuVisible = !this.isMenuVisible;
        },

        toggleSchema() {
            this.isSchemaVisible = !this.isSchemaVisible;
        },

        // Optional: Reset both to default
        resetVisibility() {
            this.isMenuVisible = true;
            this.isSchemaVisible = true;
        }
    },
});