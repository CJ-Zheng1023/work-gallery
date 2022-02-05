<template>
  <div :class="['hl-panel', { 'visible': visible }]">
    <div class="hl-panel-header">请输入关键词</div>
    <div class="hl-panel-body">
      <div class="hl-form">
        <div class="hl-form-item" v-for="(word, index) in words" :key="word.id">
          <div class="hl-form-item-text">
            <a-input style="width: 160px;" v-model="word.text" />
          </div>
          <div class="hl-form-item-color">
            <a-input type="color" style="width: 30px; padding: 0;" v-model="word.color" />
          </div>
          <div class="hl-form-item-actions">
            <a-space>
              <a-button v-if="words.length > 1" @click="removeWord(word.id)" shape="circle" size="small" icon="minus" />
              <a-button v-if="index === 0" shape="circle" @click="addWord()" size="small" icon="plus" />
            </a-space>
          </div>
        </div>
      </div>
    </div>
    <div class="hl-panel-footer">
      <div class="button-group">
        <a-space>
          <a-button type="primary" size="small" @click="apply">应用</a-button>
          <a-button size="small" @click="closePanel">关闭</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Input as AInput,
  Button as AButton,
  Space as ASpace
} from 'ant-design-vue'
import { uuid } from '@/utils'
import { cloneDeep } from 'lodash'
export default {
  name: 'HighlightPanel',
  components: {
    AInput,
    AButton,
    ASpace
  },
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      words: []
    }
  },
  watch: {
    dataSource: {
      handler(dataSource) {
        if (dataSource.length) {
          this.words = cloneDeep(dataSource)
        } else {
          this.words = [
            {
              id: uuid(),
              text: '',
              color: '#000000'
            }
          ]
        }
      },
      immediate: true
    }
  },
  methods: {
    addWord() {
      this.words.push({
        id: uuid(),
        word: '',
        color: '#000000'
      })
    },
    removeWord(id) {
      this.words = this.words.filter(word => word.id !== id)
    },
    closePanel() {
      this.$emit('close')
    },
    apply() {
      this.$emit('change', this.words)
      this.closePanel()
    }
  }
}
</script>

<style lang="less" scoped>
.hl-panel {
  z-index: 3;
  position: absolute;
  right: 18px;
  top: 0;
  background-color: #fffffe;
  box-shadow: rgb(199 204 209) 0px 2px 8px;
  border-radius: 4px;
  transform: translateY(-110%);
  transition: transform 0.5s;
  &.visible {
    transform: translateY(0);
  }
  @paddingLeftAndRight: 24px;
  @dividerStyle: 1px solid #d7d6d6;
  .hl-panel-header {
    padding: 16px @paddingLeftAndRight;
    border-bottom: @dividerStyle;
    color: #888;
    font-weight: 600;
    font-size: 16px;
  }
  .hl-panel-body {
    padding: 16px @paddingLeftAndRight;
    max-height: 200px;
    overflow-y: auto;
  }
  .hl-panel-footer {
    padding: 16px @paddingLeftAndRight;
    border-top: @dividerStyle;
  }
  .button-group {
    text-align: right;
  }
  .hl-form {
    .hl-form-item {
      display: flex;
      align-items: center;
      & + .hl-form-item {
        margin-top: 10px;
      }
      .hl-form-item-color {
        margin-left: 6px;
      }
      .hl-form-item-actions {
        margin-left: 10px;
      }
    }
  }
}
</style>