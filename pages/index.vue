<template>
  <div id="index-page">
    <section id="left-pane">
      <p id="title">Codeasy School</p>
      <p id="description">
        在 Codeasy School，你可以快速便捷地找到適合您的程式語言老師，開啟增加程式能力的學習之旅。
      </p>
    </section>
    <section id="right-pane">
      <NuxtLink class="btn link-btn" to="/search">Start</NuxtLink>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: "Codeasy School",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '尋找程式語言老師？立即加入 Codeasy School！在這裡，您可以快速找到適合您的老師，輕鬆開啟增加程式能力的學習之旅。快來探索我們的程式課程和一對一教學吧！'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  #index-page {
    width: 100vw;
    height: 100vh;
    background-color: var(--primary-color);
    display: grid;
    grid-template: repeat(12, 1fr) / repeat(12, 1fr);

    #left-pane {
      grid-area: 2 / 2 / -2 / span 6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include rwd($small-size) {
        grid-area: 2 / 2 / span 6 / -2;
      }

      p {
        padding: 0 4rem;
        text-align: left;
        @include rwd($small-size) {
          padding: 0;
        }
      }

      p#title {
        background: -webkit-linear-gradient(var(--secondary-color), var(--tertiary-color));
        font-size: 5rem;
        font-weight: bold;
        line-height: 5rem;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p#description {
        margin-top: 2rem;
        text-align: justify;
        font-size: 1.5rem;
        color: #00000077;
      }

    }

    #right-pane {
      grid-area: 2 / 8 / -2 / span 4;
      display: grid;
      @include rwd($small-size) {
        grid-area: 8 / 2 / span 3 / -2;
      }

      .link-btn {
        margin: auto;
        padding: .25rem 3rem;
        background: -webkit-linear-gradient(var(--secondary-color), var(--tertiary-color));
        box-shadow: 3px 3px 8px #000000aa;
        border-radius: 5px;
        font-size: 2rem;
        letter-spacing: 2px;
        color: #fff;
        text-shadow: 2px 2px 4px #00000033;
      }
    }
  }
</style>
