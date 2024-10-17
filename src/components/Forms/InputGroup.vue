<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: String,
    type: String,
    placeholder: String,
    customClasses: String,
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInputChange(event: Event) {
      const target = event.target as HTMLInputElement;
      const value = target?.value ?? ''; // Nullish coalescing to handle potential null/undefined
      this.$emit('update:modelValue', value);
    }
  }
})

</script>

<template>
  <div :class="customClasses">
    <label class="mb-2.5 block text-black dark:text-white">
      {{ label }}
      <span v-if="required" class="text-meta-1">*</span>
    </label>
    <input :type="type" :placeholder="placeholder" :value="modelValue"
      @input="handleInputChange"
      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
  </div>
</template>

<script lang="ts">

</script>
