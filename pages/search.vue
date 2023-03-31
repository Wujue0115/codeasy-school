<template>
  <div id="search-page">
    <div id="container">
      <div id="search-pane">
        <SearchConditionPane v-model="text" :inputType="'text'"/>
        <SearchConditionPane v-model="gender" :inputType="'radio'" :availableData="['male', 'female']"/>
        <SearchConditionPane v-model="day" :inputType="'select'" :availableData="['male', 'female']"/>
      </div>

      <div id="teacher-pane">
        <TeacherCard :rating="rating">
          <template #name>{{ name }}</template>
          <template #description>{{ description }}</template>
          <template #city>{{ city }}</template>
          <template #age>{{ age }}</template>
          <template #gender>{{ gender == "male" ? "男" : "女" }}</template>
          <template #languages>{{ languagesText }}</template>
          <template #class-day>{{ classDayText }}</template>
          <template #price>{{ price }}</template>
        </TeacherCard>
      </div>
    </div>
    
  </div>
</template>

<script>
import SearchConditionPane from '@/components/search-condition-pane.vue';
import TeacherCard from '@/components/teacher-card.vue';

export default {
  name: "SearchPage",
  components: {
    TeacherCard,
    SearchConditionPane,
  },
  data() {
    return {
      "name": "Liam",
      "rating": 5,
      "age": 28,
      "gender": "male",
      "city": "臺南",
      "description": "有教學熱忱、耐心指導、要求嚴格",
      "languages": ["C++", "Java", "Python", "Ruby"],
      "price": "600",
      "classDay": [1, 2, 5],
      text: "",
      gender: "",
      day: "",
    }
  },
  computed: {
    languagesText() {
      return this.languages.join("、");
    },
    classDayText() {
      const days = ["一", "二", "三", "四", "五", "六", "日"]
      return this.classDay.map(d => days[d - 1]).join("、")
    }
  },
}
</script>

<style lang="scss" scoped>
#search-page {
  padding: 3rem;
  height: 100vh;
  background: -webkit-linear-gradient(45deg, #ffaa00, #df6161);

  #container {
    padding: 3rem;
    border-radius: 5px;
    background-color: #fff;

    #search-pane {
      @include flexbox(row, start);

      & > *:not(:first-child) {
        padding-left: 1rem;
      }
    }

    #teacher-pane {
      @include flexbox(row, space-evenly, start, wrap);

      & > * {
        margin: 2rem 0 0;
      }
    }
  }
}
</style>