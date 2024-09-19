import { createApp } from 'vue'
import App from './App.vue'


import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
// import router 
import router from './router';


// import components
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// mount the components

const app=createApp(App);

//use Primevue
app.use(PrimeVue,{
    theme: {
        preset:Aura
    }
});



app.component('Menubar',Menubar);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('Dialog',Dialog);
app.component('Button',Button);
app.component('InputText',InputText);

app.use(router);

app.mount('#app');