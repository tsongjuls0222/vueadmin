<template>
  <div>
    <span>{{ title }}</span>
    <div class="field mt-2">
      <div class="is-flex">
        <input
          class="input mx-5"
          type="number"
          v-if="title == 'OTP 로그'"
          placeholder="Mobile Number"
        />
        <input class="input mx-5" type="number" v-else placeholder="Username" />
        <input class="input ml-6" type="date" />
        <input class="input mx-2" type="date" />
        <button class="button is-info" v-if="title == 'OTP 로그'" type="button">
          검색
        </button>
        <input class="input mx-2" type="time" />
        <button class="button is-info" v-if="title == 'OTP 로그'" type="button">
          Set
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
