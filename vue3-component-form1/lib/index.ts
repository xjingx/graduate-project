import ThemeProcess from './ThemeProcess';

import { defineComponent, h } from 'vue';

import SchemaFrom from './SchemaForm';
import NumberFiled from './fields/NumberField';
import StringField from './fields/StringField';
import ArrayField from './fields/ArrayField';

import SelectionWidget from './theme/SelectionWidget';
export default SchemaFrom;

export * from './types';

export { NumberFiled, StringField, ArrayField, SelectionWidget, ThemeProcess };
