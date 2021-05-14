import { CommonWidget, CommonWidgetProps } from '../types';
import { defineComponent, nextTick, computed, ref, watch } from 'vue';
import { withFormItem } from './FormInfo';
import { createUseStyles } from 'vue-jss';

import { ElUpload, ElButton } from 'element-plus'

const useStyles = createUseStyles({
  imgBox: {
    width: 360,
    height: 150,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 32,
    textAlign: 'center',
  },
  inputBox: {
    width: 300,
    height: 36,
  }
});

const ImgWidget: CommonWidget = withFormItem(
  defineComponent({
    name: 'ImgWidget',
    props: CommonWidgetProps,
    setup(props) {
      const changeValueRef = ref(props.value);
      const classesRef = useStyles();

      // 为什么要这么麻烦，因为双向绑定不能直接绑定props，绑定的是声明的变量changeValueRef.value
      // 而我们在这个变量改变时，必须去通过onChange去改变我们props里的value
      // 而props里的value改变时，又要去使changeValueRef.value改变
      // TODO: 我也不知道为啥changeValueRef不会自动改变，有待去验证(可能是和写在return前面有关，可以验证一下)
      watch(changeValueRef, (newValue, oldValue) => {
        if (newValue !== props.value) {
          props.onChange(newValue);
        }
      });

      // 引用类型的watch用法
      watch(
        () => props.value,
        (newValue, oldValue) => {
          if (newValue !== changeValueRef.value) {
            changeValueRef.value = newValue;
          }
        }
      );

      function handleAvatarSuccess(res: any, file: any) {
        changeValueRef.value = URL.createObjectURL(file.raw);
      }

      function beforeAvatarUpload(file: any) {
        const isJPG = file.type === 'image/jpeg';

        if (!isJPG) {
          window.alert('上传头像图片只能是 JPG 格式!');
        }
        return isJPG;
      }


      return () => {
        const { value } = props;
        const classes = classesRef.value;
        const url = changeValueRef.value as string || '';
        if (url !== ''){
          return (
            <div>
              <img class={classes.imgBox} src={url}></img>
              <input class={classes.inputBox} type="text" v-model={changeValueRef.value}/>
              <ElUpload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                show-file-list={false}
                on-success={handleAvatarSuccess}
                before-upload={beforeAvatarUpload}
              >
                <ElButton size="small" type="primary">点击上传</ElButton>
              </ElUpload>
            </div>
          );
        } else {
          return (
            <div>
              <div class={classes.imgBox}>暂无图片</div>
              <input class={classes.inputBox} type="text" v-model={changeValueRef.value}/>
              <ElUpload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                show-file-list={false}
                on-success={handleAvatarSuccess}
                before-upload={beforeAvatarUpload}
              >
                <ElButton size="small" type="primary">点击上传</ElButton>
              </ElUpload>
            </div>
          );
        }
      };
    }
  })
);

export default ImgWidget;
