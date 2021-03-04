<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup="props">
import { ref } from 'vue';
import { FiledProps, Schema } from '../types';

export default {
  props: FiledProps
};

declare const props: {
  value: any;
  onChange: (v: string) => void;
  schame: Schema;
};

export const handleChange = (e: any) => {
  console.log(e);
  props.onChange(e.target.value);
};
</script>
