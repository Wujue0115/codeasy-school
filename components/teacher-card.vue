<template>
  <div id="teacher-card">
    <div id="header">
      <span id="name">
        <slot name="name"></slot>
      </span>
      <span id="rating">
        <img id="star" src="/rating-star.svg" v-for="index in rating" :key="index">
      </span>
    </div>
    <div id="description"><slot name="description"></slot></div>
    <div id="info">
      <span id="city">教學地點：<slot name="city"></slot></span>
      <span id="age">年齡：<slot name="age"></slot></span>
      <span id="gender">性別：<slot name="gender"></slot></span>
    </div>
    <div id="languages">擅長語言：<slot name="languages"></slot></div>
    <div id="class-day">每週上課日：<slot name="class-day"></slot></div>
    <div id="price">NT$ <slot name="price"></slot> / 小時</div>
  </div>
</template>

<script>
export default {
  name: "TeacherCard",
  props: {
    rating: {
      type: Number, 
      validator: value => {
        if (!Number.isInteger(value) || value <= 0) {
          console.warn("The rating prop must be a positive integer!");
          return false;
        }
        return true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#teacher-card {
  padding: 1rem;
  width: 360px;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 8px #00000055;
  color: #000000aa;

  #header {
    #name {
      font-size: 2rem;
      line-height: 2rem;
      letter-spacing: 2px;
      background: -webkit-linear-gradient(var(--secondary-color), var(--tertiary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #rating {
      #star {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  #description {
    color: #000;
  }

  #info {
    display: flex;
    @include rwd($small-size) {
      @include flexbox(column, center, flex-start);
    }

    span {
      &:not(:first-child) {
        padding-left: 2rem;

        @include rwd($small-size) {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
