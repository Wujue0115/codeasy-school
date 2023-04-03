<template>
  <div id="app" :class="[$store.getters.getThemeClassName]">
    <header>
      <div id="link-pane">
        <NuxtLink 
          :class="['btn', 'link-btn', $nuxt.$route.name === page.page ? 'link-btn-active' : '']" 
          v-for="page in pages" :key="page.name" 
          :to="page.link">{{ page.name }}
        </NuxtLink>
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
    <footer>
      <div>Site designed by <a target="_blank" href="https://github.com/Wujue0115">Wujue</a>.</div>
      <div>App favicon by <a target="_blank" href="https://icons8.com/icon/xl9eZco6hYkD/programming">Programming</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>.</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  head() {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: this.faviconURL }
      ]
    }
  },
  data() {
    return {
      pages: [
        {
          name: "首頁",
          page: "index",
          link: "/",
        },
        {
          name: "搜尋頁面",
          page: "search",
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
  computed: {
    faviconURL() {
      return `/favicon-${this.$store.getters.getThemeMode}.ico?v=2`;
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
    padding: .75rem 0;
    width: 100vw;
    background-color: var(--secondary-color-a99);
    backdrop-filter: blur(3px);

    #link-pane {
      @include flexbox(row);
      .link-btn {
        padding: 0 1rem;
        border-radius: 5px;
        font-size: 1.2rem;
        letter-spacing: 2px;
        color: #fff;
        text-shadow: 2px 2px 4px #00000055;
      }
      .link-btn-active {
        background-color: var(--secondary-color);
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

  footer {
    width: 100vw;
    padding: .5rem 0;
    background-color: var(--secondary-color-a99);
    @include flexbox(row, space-evenly);
    @include rwd($small-size) {
      @include flexbox(column);
    }
  }
}
</style>