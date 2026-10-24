import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    optimizeDeps: {
        exclude: ['@electric-sql/pglite'],
    },
    resolve: {
        alias: [
            { find: /^highlight\.js$/, replacement: '/src/vendor/highlight-slim.js' },
        ],
    },
    plugins: [vue(),  tailwindcss(), ],
})