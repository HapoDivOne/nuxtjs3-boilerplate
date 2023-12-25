<template>
  <div class="app">
    <Html>
      <Head>
        <Title>Nuxt 3 Boilerplate</Title>
        <Link />
        <Meta />
      </Head>
      <Body>
        <v-btn @click="toggleTheme">toggle theme</v-btn>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
