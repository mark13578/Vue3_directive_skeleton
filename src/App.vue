<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    const postCard = ref([]);
    const isLoad = ref(true);

    onMounted(() => {
      axios
        .get("https://60bd9841ace4d50017aab3ec.mockapi.io/api/post_card")
        .then((res) => {
          postCard.value = res.data;
          isLoad.value = false;
        });
    });

    return {
      postCard,
      isLoad,
    };
  },
};
</script>

<template>
  <div class="card" v-for="card in postCard" :key="card.id">
    <header>
      <img v-src="card.avatar" class="avatar load" />
      <div>
        <h1 :class="{ load: isLoad }">{{ isLoad ? "" : card.name }}</h1>
        <p :class="{ load: isLoad }" v-timeformat="card.post_date"></p>
      </div>
    </header>
    <p :class="['content', { load: isLoad }]">
      {{ isLoad ? "" : card.content }}
    </p>
    <img class="post_photo load" v-src="card.photo" alt="" />
  </div>
</template>

<style lang="scss">
.card {
  width: 400px;
  height: auto;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(#000, 0.3);
  margin: 0 auto 30px auto;
  header {
    display: flex;
    padding: 10px 10px 0px 10px;
    margin: 0 0 5px 0;
    color: #666;
    h1 {
      font-size: 15px;
    }
    p {
      font-size: 13px;
    }
  }
  p.content {
    font-size: 14px;
    padding: 0px 10px 10px 10px;
    color: #666;
    &.load {
      display: block;
      width: 200px;
      height: 14px;
      background-color: #ededed;
      color: rgba(#fff, 0);
      margin: 10px 10px 10px 10px;
    }
  }
}
img.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
  background-color: #ededed;
}
img.post_photo {
  width: 100%;
  height: 300px;
  background-color: #ededed;
}
h1.load {
  display: block;
  width: 300px;
  height: 14px;
  background-color: #ededed;
  margin-bottom: 10px;
  color: rgba(#fff, 0);
}
p.load {
  display: block;
  width: 100px;
  height: 14px;
  background-color: #ededed;
  color: rgba(#fff, 0);
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.load {
  background: linear-gradient(
      100deg,
      rgba(256, 256, 256, 0) 30%,
      rgba(256, 256, 256, 0.5) 50%,
      rgba(256, 256, 256, 0) 30%
    )
    #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 2s loading ease-in-out infinite;
}
</style>