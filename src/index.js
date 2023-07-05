import { createApp } from "vue";
import App from "./App.vue";
import dayjs from "dayjs";

const app = createApp(App);

app.directive("src", (el, binding) => {
  if (binding.value) {
    const img = new Image();
    img.src = binding.value;
    img.onload = () => {
      el.src = binding.value;
    };
  }
});

app.directive("timeformat", {
  mounted(el, binding) {
    const time = dayjs(binding.value).format("YYYY年MM月DD日");
    el.innerText = time;
  },
});

app.mount("#app");
