import { createRouter, createWebHashHistory } from 'vue-router'

import StepPromo from './components/steps/step_promo.vue'
import Roadmap from './components/roadmap.vue'
import Content_step from './components/content_step.vue'
import SignupForm from './components/profile/signup_form.vue'
import LoginForm from './components/profile/login_form.vue'
import {useAppStore} from "./stores/app_store";
import {useStepStore} from "./stores/step_store";
import {useProfileStore} from "./stores/profile_store";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: StepPromo
    },

    {
        path: '/step_:stepID',
        name: 'Step',
        component: Content_step
    },

    {
        path: '/map',
        name: 'Roadmap',
        component: Roadmap
    },

    {
        path: '/signup',
        name: 'Signup',
        component: SignupForm
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginForm
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        // Smooth scroll to top
        return {
            top: 0,
            behavior: 'smooth'
        }
    }
})

// Достаём токен из search-части адреса (до #) — для диплинков вида /?auth=...
function getAuthFromSearch(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("auth");
}

router.beforeEach(async (to, from, next) => {

    // Диплинк входа: ?auth=... — применяем токен из адреса
    const queryAuth = to.query.auth;
    const authToken = (Array.isArray(queryAuth) ? queryAuth[0] : queryAuth) || getAuthFromSearch();

    if (authToken) {
        useProfileStore().applyAuthToken(authToken);

        // Убираем auth из адресной строки, чтобы токен не оставался в URL
        if (to.query.auth) {
            const restQuery = {...to.query};
            delete restQuery.auth;
            return next({path: to.path, query: restQuery, replace: true});
        }
        if (window.location.search) {
            const url = new URL(window.location.href);
            url.searchParams.delete("auth");
            window.history.replaceState({}, "", url.toString());
        }
    }

    const store = useAppStore();

    // Редирект для старых адресов с решеткой
    if (to.hash) {
        const routeName = to.hash.replace('#', '');
        return next(`/${routeName}`); // Return to stop further execution
    }

    if (to.params.stepID) {
        store.setCurrentStep(Number(to.params.stepID));
    } else {
        return next();
    }

    if (store.status !== "ready") {
        console.log("Waiting for store to be ready...");
        while (store.status !== "ready") {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log("Setting up exercise after store ready");
    const stepStore = useStepStore();
    stepStore.setExercise(store.currentStep);

    if (store.currentStep.type == "practice"){
         stepStore.runExample();
    }

    next();
});

export default router
