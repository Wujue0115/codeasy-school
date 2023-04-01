<template>
  <div id="search-page">
    <div id="container">
      <div id="search-pane">
        <div id="search-name">
          <SearchConditionPane v-model="searchConditions.text" :mainProps="{ type: 'text', placeholder: '輸入搜尋文字...'}" />
        </div>
        <div class="filter-btn" @click="openoOtherConditions = !openoOtherConditions">其他過濾條件 {{ openoOtherConditions ? "&#9660;" : "&#9650;" }}</div>
        <div v-show="openoOtherConditions" id="other-conditions-pane">
          <div id="search-gender">
            性別：<SearchConditionPane v-model="searchConditions.gender" :mainProps="{ type: 'radio', name: 'gender' }" :availableData="['不限', '男', '女']"/>
          </div>
          <div id="search-city">
            上課地區：<SearchConditionPane v-model="searchConditions.city" :mainProps="{ type: 'select' }" :availableData="cityList"/>
          </div>
        </div>
      </div>

      <div id="teacher-pane">
        <TeacherCard v-for="(info, index) in processedTeachearInfoList" :key="index + info.name" :rating="info.rating">
          <template #name>{{ info.name }}</template>
          <template #description>{{ info.description }}</template>
          <template #city>{{ info.city }}</template>
          <template #age>{{ info.age }}</template>
          <template #gender>{{ info.gender }}</template>
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
import getLCS from "@/utils/lcs.js";
import SearchConditionPane from '@/components/search-condition-pane.vue';
import TeacherCard from '@/components/teacher-card.vue';

export default {
  name: "SearchPage",
  head() {
    return {
      title: "Codeasy School Search Page",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '在 Codeasy School，透過快速便捷的搜尋功能，您可以找到完美符合您需求的程式語言老師。立即開啟學習之旅，提升您的程式能力！',
        }
      ]
    }
  },
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
        gender: "",
        city: "",
      }
    }
  },
  computed: {
    cityList() {
      return ["不限", ...new Set(this.teacherInfoList.map(info => info.city))];
    },
    processedTeachearInfoList() {
      return this.teacherInfoList
        .map(info => {
          const newInfo = {...info};
          newInfo.gender = info.gender === "male" ? "男" : "女";
          newInfo.languages = info.languages.join("、");
          newInfo.classDay = info.classDay.map(d => ["一", "二", "三", "四", "五", "六", "日"][d - 1]).join("、");
          return newInfo;
        })
        .filter(info => {
          return this.filterSearchText(info) && this.filterSearchGender(info) && this.filterSearchCity(info);
        });
    }
  },
  async mounted() {
    this.teacherInfoList = await getTeacherInfoList();
  },
  methods: {
    filterSearchText(info) {
      for (const value of Object.values(info)) {
        const text = String(value).toLowerCase();
        const searchText = this.searchConditions.text.toLowerCase();

        // 如果沒有輸入搜尋文字顯示所有資料
        if (searchText === "") return true;
        
        // 搜尋文字可用 " " or "," 切分
        // 例如 "script, python"，將會裁切成 "script" 和 "python"，只要任一個配對到資料內容皆會顯示該資料
        for (const stext of searchText.split(new RegExp("[ ,]+")).filter(s => s !== "")) {
          // 透過 LCS algorithm 允許搜尋文字不完整的時也能盡量配對到資料
          // 例如："pyhn" 可以配對到 python 相關的資料
          // 只要 LCS 長度 >= 搜尋內容長度 * 0.8 皆能配對資料，允許部分搜尋文字有錯誤時也能盡量配對到資料
          // 例如："puthon" 可以配對到 python 相關的資料
          if (getLCS(text, stext) >= stext.length * 0.8) {
            return true;
          }
        }
      }
      return false;
    },
    filterSearchGender(info) {
      const searchGender = this.searchConditions.gender;
      return searchGender === "" || searchGender === "不限" || info.gender === searchGender;
    },
    filterSearchCity(info) {
      const searchCity = this.searchConditions.city;
      return searchCity === "" || searchCity === "不限" || info.city === searchCity;
    }
  }
}
</script>

<style lang="scss" scoped>
#search-page {
  #container {
    padding: 2rem;
    background-color: var(--primary-color);
    #search-pane {
      @include flexbox(column, center, center);
      padding: 1rem;
      border-radius: 5px 5px 0 0;
      border-bottom: 2px solid var(--secondary-color);

      & > *:not(:first-child) {
        @include flexbox(row);
      }

      .filter-btn {
        margin-top: .25rem;
        color: var(--secondary-color);
        cursor: pointer;
      }

      #other-conditions-pane {
        @include flexbox(column, center, flex-start);
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