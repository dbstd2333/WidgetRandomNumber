import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import 'virtual:uno.css'
import router from "./route/index"

const app = createApp(App)
app.use(router).mount("#app")
