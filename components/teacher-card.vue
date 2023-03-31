<template>
  <div id="teacher-card">
    <section>
      
    </section>
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
    }
  },
}
</script>

<style lang="scss" scoped>
#teacher-card {
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 3px 3px 8px #00000055;
  color: #000000aa;

  #header {
    #name {
      color: #000;
      font-size: 2rem;
      line-height: 2rem;
      letter-spacing: 2px;
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
    span {
      &:not(:first-child) {
        padding-left: 2rem;
      }
    }
  }
}
</style>
