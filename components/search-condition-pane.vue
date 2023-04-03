<template>
  <div id="search-condition-pane">
    <!-- text -->
    <input v-if="mainProps.type === 'text'" id="text-pane" v-bind="mainProps" @input="$event => changeHandler($event)">

    <!-- radio -->
    <div v-if="mainProps.type === 'radio'" id="radio-pane">
      <div v-for="item in availableData" :key="item">
        <input v-bind="mainProps" :value="item" @change="$event => changeHandler($event)">
        <label>{{ item }}</label>
      </div>
    </div>

    <!-- select -->
    <select v-if="mainProps.type === 'select'" v-bind="mainProps" id="select-pane" @change="$event => changeHandler($event)">
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
    mainProps: {
      type: Object,
      required: true,
      validator: value => {
        const supportType = ["text", "radio", "select"];
        if (!supportType.includes(value.type)) {
          console.warn(`The ${value.type} type of mainProps isn't support this component!`);
          console.warn(`This component supports ${supportType.join(", ")} types.`);
          return false;
        }
        return true;
      }
    },
    availableData: {
      type: Array,
    }
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
    padding: .5rem .5rem .25rem;
    font-size: 1rem;
  }

  #radio-pane {
    height: 100%;
    display: flex;
    align-content: center;

    div {
      @include flexbox(row);
      box-sizing: border-box;
      padding: 0 .5rem;
 
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
    padding: .25rem 2rem .25rem .25rem;
  }
}
</style>