
import { createRouter, createWebHistory } from "vue-router";



// import HomeView from "@/components/HomeView.vue";
// import ProjectView from "@/components/ProjectView.vue";
// import UserView from "@/components/UserView.vue";
// import TaskView from "@/components/TaskView.vue";


// for LazyLoading : change static import to dynamic
const HomeView = () => import('@/components/HomeView.vue');
const UserView = () => import('@/components/UserView.vue');
const ProjectView = () => import('@/components/ProjectView.vue');
const TaskView = () => import('@/components/TaskView.vue');
// const TestNav = () => import('@/components/TestNav.vue');
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path:'/projects',
        name: 'projects',
        component: ProjectView
    },
    {
        path: '/users',
        name:'users',
        component: UserView
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: TaskView
    }
    

];

const router= createRouter({
    history:createWebHistory(),
    routes
});

export default router;























