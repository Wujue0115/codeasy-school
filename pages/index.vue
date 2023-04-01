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
  name: 'IndexPage'
}
</script>

<style lang="scss" scoped>
  #index-page {
    width: 100vw;
    height: 100vh;
    background-color: $primary-color;
    display: grid;
    grid-template: repeat(12, 1fr) / repeat(12, 1fr);

    #left-pane {
      grid-area: 2 / 2 / -2 / span 6;
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        padding: 0 4rem;
        text-align: left;
      }

      p#title {
        background: -webkit-linear-gradient($secondary-color, $tertiary-color);
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

      .link-btn {
        margin: auto;
        padding: .25rem 3rem;
        background: -webkit-linear-gradient($secondary-color, $tertiary-color);
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
