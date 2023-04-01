<template>
  <div id="search-page">
    <div id="container">
      <div id="search-pane">
        <div id="search-name">
          <SearchConditionPane v-model="searchConditions.text" :mainProps="{ type: 'text', placeholder: '搜尋教師...'}" />
        </div>
        <div class="filter-btn" @click="openoOtherConditions = !openoOtherConditions">其他過濾條件 {{ openoOtherConditions ? "&#9660;" : "&#9650;" }}</div>
        <div v-show="openoOtherConditions" id="other-conditions-pane">
          <div id="search-gender">
            性別：<SearchConditionPane v-model="searchConditions.gender" :mainProps="{ type: 'radio', name: 'gender' }" :availableData="['不限性別', '男', '女']"/>
          </div>
          <div id="search-city">
            上課地區：<SearchConditionPane v-model="searchConditions.day" :mainProps="{ type: 'select' }" :availableData="cityList"/>
          </div>
        </div>
      </div>

      <div id="teacher-pane">
        <TeacherCard v-for="(info, index) in processedTeachearInfoList" :key="index + info.name" :rating="info.rating">
          <template #name>{{ info.name }}</template>
          <template #description>{{ info.description }}</template>
          <template #city>{{ info.city }}</template>
          <template #age>{{ info.age }}</template>
          <template #gender>{{ info.gender == "male" ? "男" : "女" }}</template>
          <template #languages>{{ info.languages }}</template>
          <template #class-day>{{ info.classDay }}</template>
          <template #price>{{ info.price }}</template>
        </TeacherCard>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getTeacherInfoList } from "@/apis/teacher-api.js";
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
      teacherInfoList: [],
      openoOtherConditions: false,
      searchConditions: {
        text: "",
        gender: "不限性別",
        day: "",
      }
    }
  },
  computed: {
    cityList() {
      return ["不限", ...new Set(this.teacherInfoList.map(info => info.city))];
    },
    processedTeachearInfoList() {
      return this.teacherInfoList.map(info => {
        info.gender = info.gender === "male" ? "男" : "女";
        info.languages = info.languages.join("、");
        info.classDay = info.classDay.map(d => ["一", "二", "三", "四", "五", "六", "日"][d - 1]).join("、");
        return info;
      });
    }
  },
  async mounted() {
    this.teacherInfoList = await getTeacherInfoList();
  }
}
</script>

<style lang="scss" scoped>
#search-page {
  #container {
    padding: 2rem;
    background-color: $primary-color;
    #search-pane {
      @include flexbox(column, center, center);
      padding: 1rem;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #000;

      & > *:not(:first-child) {
        @include flexbox(row);
      }

      .filter-btn {
        margin-top: .25rem;
        color: $secondary-color;
        cursor: pointer;
      }

      #other-conditions-pane {
        @include flexbox(column, center, start);
        & > * {
          @include flexbox(row, space-between);
        }
      }
    }

    #teacher-pane {
      @include flexbox(row, space-evenly, space-around, wrap);
      padding-bottom: 2rem;
      border-radius: 0 0 5px 5px;

      & > * {
        margin: 2rem 0 0;
      }
    }
  }
}
</style>