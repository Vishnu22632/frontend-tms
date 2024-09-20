import { createApp } from 'vue'
import App from './App.vue'


import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
// import router 
import router from './router';

// import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';


// confirm dialog box while deleting user
import ConfirmationService from 'primevue/confirmationservice';

//import Paginator
import Paginator from 'primevue/paginator'; 


// import components
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';


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
app.component('Toast',Toast);
app.component('ConfirmDailog', ConfirmDialog);

// Register Paginator globally
app.component('Paginator',Paginator);

app.use(router);

app.use(ToastService);

app.use(ConfirmationService);


app.mount('#app');