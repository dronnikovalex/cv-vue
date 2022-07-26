<template>
  <div class="input-field">
    <label 
      :for="name" 
      class="inp"
    >
      <input
        :id="name" 
        data-cy="input"
        :name="name"
        :type="type"
        placeholder="&nbsp;"
        :value="inputValue"
        @blur="handleChange"
      >
      <span class="label">{{ labelText }}</span>
      <span class="focus-bg" />
      <small 
        v-if="errorMessage || testError"
        data-cy="error-message"
      >
        {{ errorMessage ? errorMessage : 'Error' }}
      </small>
    </label>
  </div>
</template>

<script>
import { useField } from "vee-validate";
import { toRef } from "vue";

export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
      default: 'Введите текст'
    },
    testError: {
      type: Boolean,
      required: false,
      default: false,
    },
  },  

  setup(props) {
    const name = toRef(props, "name");
    const {
      value: inputValue,
      errorMessage,
      handleChange,
    } = useField(name, undefined, { initialValue: '' });

    return {
      errorMessage,
      handleChange,
      inputValue,
    };
  },
}
</script>