import { CustomKeyWord } from '../../lib/types';

const keyword: CustomKeyWord = {
  name: 'test',
  definition: {
    macro: () => {
      return {
        minLength: 10
      };
    }
  },
  transformSchema(schema) {
    return {
      ...schema,
      minLength: 10
    };
  }
};

export default keyword;
