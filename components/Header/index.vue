<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header__container">
    <div class="header__container--left">
      <div class="logo_image">
        <img src="~/assets/images/logo.png" alt="logo" width="97" height="50" />
      </div>
      <div class="menu">
        <ul>
          <li>
            <nuxt-link to="/">
              <img
                src="~/assets/images/icon/search.svg"
                alt="search"
                width="18"
                height="18"
              />
              <span>店舗検索</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/reservations">
              <img
                src="~/assets/images/icon/reservation_list.svg"
                alt="reservation list"
                width="18"
                height="18"
              />
              <span>予約一覧</span>
            </nuxt-link>
          </li>
          <li>
            <div
              class="d-flex justify-content-between align-items-center select-customer"
            >
              <img
                src="~/assets/images/icon/people.svg"
                alt="reservation list"
                width="18"
                height="18"
              />
              <div class="select-value">
                <select
                  v-model="customerId"
                  class="form-select border-0 p-0 select-text"
                  placeholder="団体から予約"
                >
                  <option selected :value="null">団体から予約</option>
                  <option
                    v-for="(item, index) in dataList"
                    :key="index"
                    :value="item?.id"
                  >
                    {{ item?.name }}
                  </option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__container--right">
      <div class="profile">
        <img
          :src="
            props.userAvatar
              ? props.userAvatar
              : (getImageIcon('avatar.svg') as string)
          "
          alt="avatar"
          width="32"
          height="32"
        />
        <nuxt-link to="/accounts">マイページ</nuxt-link>
      </div>
      <nuxt-link to="#">問い合わせ</nuxt-link>
      <select id="lang" name="lang">
        <option value="en">日本語</option>
        <option value="en">EN</option>
      </select>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  userAvatar: {
    type: String,
    default: "",
  },
});

const dataList: any = ref({});

const customerId: any = ref(null);
</script>

<style lang="scss">
@import "@/assets/scss/partials/header.scss";
</style>
