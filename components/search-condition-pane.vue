<template>
  <div id="search-condition-pane">
    <!-- text -->
    <input v-if="inputType === 'text'" id="text-pane" type="text" @input="$event => changeHandler($event)">

    <!-- radio -->
    <div v-if="inputType === 'radio'" id="radio-pane">
      <div v-for="item in availableData" :key="item">
        <input type="radio" name="radio" :value="item" @change="$event => changeHandler($event)">
        <label>{{ item === "male" ? "男" : "女" }}</label>
      </div>
    </div>

    <!-- select -->
    <select v-if="inputType === 'select'" id="select-pane" @change="$event => changeHandler($event)">
      <option v-for="item in availableData" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SearchConditionPane",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    inputType: {
      type: String,
    },
    availableData: {
      type: Array,
    }
  },
  mounted() {
    console.log(this.value)
  },
  methods: {
    changeHandler(event) {
      this.$emit("change", event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
#search-condition-pane {
  @include flexbox();

  #text-pane {
    padding: .25rem;
    font-size: 1.25rem;
  }

  #radio-pane {
    height: 100%;
    display: flex;
    align-content: center;

    div {
      @include flexbox(row);
      box-sizing: border-box;
      padding: 0 1rem;
 
      input[type=radio] {
        width: 1rem;
        height: 1rem;
        cursor: pointer;
      }

      label {
        @include flexbox(row, center, center, nowrap);
        margin-left: .5rem;
      }
    }
  }

  #select-pane {
    padding: .25rem 1rem .25rem .25rem;
  }
}
</style>