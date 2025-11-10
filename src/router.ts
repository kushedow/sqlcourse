import { createRouter, createWebHistory } from 'vue-router'

import Promo from './components/promo.vue'
import Content_step from './components/content_step.vue'
import {useAppStore} from "./stores/app_store";
import {useStepStore} from "./stores/step_store";

function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

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
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const store = useAppStore();


    if (to.params.stepID) {
        store.setCurrentStep(Number(to.params.stepID));
    } else {
        return true;
    }

    if (store.status !== "ready") {
        console.log("Waiting for store to be ready...");
        while (store.status !== "ready") {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log("Setting up exercise after store ready");
    const exStore = useStepStore();
    exStore.setExercise(store.currentStep);
    await exStore.runExample();

    return true;
});

export default router