<template>
  <div class="Test">
    <div>
      <div class="var-button">播放</div>
      <div class="var-button">暂停</div>
      <div class="var-button" @click="getFileInfo">选择</div>
    </div>
    <div class="info">
      <div class="info__picture"><img :src="musicInfo?.picture" :alt="musicInfo?.title"/></div>
      <div class="info__box">
        <div class="info__title"><h4>名称</h4>:<span>{{ musicInfo?.title }}</span></div>
        <div class="info__album"><h4>专辑</h4>:<span>{{ musicInfo?.album }}</span></div>
        <div class="info__artist"><h4>作者</h4>:<span>{{ musicInfo?.artist }}</span></div>
        <div class="info__size"><h4>大小</h4>:<span>{{ $filters?.sizeToUnit(musicInfo?.size) }}</span></div>
      </div>
    </div>
    <div class="bar">
      <div class="">{{ timeout.start }}<span>/</span>{{ timeout.end }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import ID3, { ID3Options }                   from '../plugin/ID3';

const data = reactive({
  musicInfo: undefined,
  timeout: {start: '0', end: '0'}
} as {
  musicInfo?: ID3Options & { size?: number },
  timeout: { end: string; start: string; }
});

function getFileInfo () {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = function () {
    const file = input.files?.item(0) as File;
    ID3(file).then(info => {
      data.musicInfo = info;
      data.musicInfo.size = file.size;
    });
  };
  input.click();
}

export default defineComponent({
  name: 'Test',
  setup: () => {
    return {
      ...toRefs(data),
      getFileInfo
    };
  }
});
</script>

<style lang="less">
.Test {
  display: flex;
  padding-top: 20px;
  text-align: center;
  align-items: center;
  flex-direction: column;
}

.var-button {
  height: 30px;
  padding: 0 6px;
  cursor: pointer;
  line-height: 28px;
  border-radius: 4px;
  display: inline-block;
  border: 1px solid #ddd;
  background-color: #fff;

  & + & {
    margin-left: 4px;
  }
}

.var-range {
  width: 100%;
  height: 4px;
  position: relative;
  border-radius: 4px;
  background-color: #ddd;

  &__button {
    left: 0;
    top: 50%;
    width: 8px;
    height: 8px;
    cursor: pointer;
    position: absolute;
    border-radius: 50%;
    background-color: #48f;
    transform: translateY(-50%);
  }
}

.info {
  display: flex;
  padding-top: 20px;

  &__picture {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #dddddd;

    > img {
      width: 100%;
      display: block;
      line-height: 0;
    }
  }

  &__box {
    height: 120px;
    text-align: left;
    padding-left: 10px;

    > * {
      line-height: 30px;

      > h4 {
        display: inline-block;
      }

      > span {
        padding-left: 10px;
      }
    }
  }
}

.bar {
  width: 100%;
  max-width: 1024px;
  padding: 20px 30px;
}
</style>
