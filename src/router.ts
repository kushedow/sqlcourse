import { createRouter, createWebHashHistory } from 'vue-router'

import Promo from './components/promo.vue'
import Content_step from './components/content_step.vue'
import {useAppStore} from "./stores/app_store";
import {useStepStore} from "./stores/step_store";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Promo
    },

    {
        path: '/step_:stepID',
        name: 'Step',
        component: Content_step
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Smooth scroll to top
        return {
            top: 0,
            behavior: 'smooth'
        }
    }
})

router.beforeEach(async (to, from, next) => {

    const store = useAppStore();

    // Сохранение данных после авторизации
    if (to.query.auth && to.query.hash ) {
            store.setUserData({userID: String(to.query.auth),userHash: String(to.query.hash) });
     }

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