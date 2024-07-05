import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import ArcoVue from "@arco-design/web-vue"
import "@arco-themes/vue-ant-border-radius/css/arco.css"

const app = createApp(App)
app.use(ArcoVue)
app.mount("#app")
