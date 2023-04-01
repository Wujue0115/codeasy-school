<template>
  <div id="app" :class="[$store.getters.getThemeClassName]">
    <header>
      <div id="link-pane">
        <NuxtLink class="btn link-btn" v-for="page in pages" :key="page.name" :to="page.link">{{ page.name }}</NuxtLink>
      </div>
      <div id="theme-pane">
        <input 
          type="radio" 
          name="theme" 
          :style="{backgroundColor: theme.color}" 
          v-for="theme in themes" :key="theme.mode"  
          :checked="theme.mode === $store.getters.getThemeMode"
          @change="changeTheme(theme.mode)"
        > 
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      pages: [
        {
          name: "首頁",
          link: "/",
        },
        {
          name: "搜尋頁面",
          link: "/search",
        }
      ],
      themes: [
        {
          mode: "green",
          color: "#e7eedd",
        },
        {
          mode: "blue",
          color: "#c1f5f6",
        },
        {
          mode: "orange",
          color: "#fadb9d",
        },
        {
          mode: "purple",
          color: "#f2eaf7",
        }
      ]
    }
  },
  methods: {
    changeTheme(themeMode) {
      this.$store.commit("changeTheme", themeMode);
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  header {
    @include flexbox(row, space-evenly);
    position: sticky;
    top: 0;
    padding: .5rem 0;
    width: 100vw;
    background-color: var(--secondary-color-a99);
    backdrop-filter: blur(3px);

    #link-pane {
      @include flexbox(row);
  
      .link-btn {
        padding: .25rem 1rem;
        border-radius: 5px;
        font-size: 1.2rem;
        letter-spacing: 2px;
        color: #fff;
        text-shadow: 2px 2px 4px #00000033;
      }
    }
  
    #theme-pane {
      @include flexbox(row);

      input[type=radio] {
        appearance: none;
        -webkit-appearance: none;

        margin: 0 .25rem;
        width: 25px;
        height: 25px;
        box-shadow: 1px 1px 2px #00000055;
        border-radius: 50%;
        cursor: pointer;

        &:checked {
          box-shadow: inset 1px 1px 3px #00000088;
        }
      }
    }
  }
}
</style>