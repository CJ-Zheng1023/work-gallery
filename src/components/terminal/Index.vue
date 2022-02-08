<template>
  <div ref="terminal" class="ns-terminal ns-terminal--dark" :class="['ns-terminal', mode === 'dark' ? 'ns-terminal--dark' : 'ns-terminal--light']" @click="activate" @contextmenu.prevent="contextmenu">
    <contextmenu @close="contextmenuVisible = false" :menus="menus" :visible="contextmenuVisible" :x="contextmenuX" :y="contextmenuY"></contextmenu>
    <div class="ns-terminal__header">
      <div class="ns-clearfix">
        <div class="ns-terminal__status">
          <div class="ns-status">
            <span class="ns-status__label">连接状态:</span>
            <span class="ns-status__value">已连接</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ns-terminal__body">
      <div class="ns-terminal__main" ref="scroll">
        <div :class="['ns-terminal__row', item.type === 'command' ? 'ns-terminal__row--command' : 'ns-terminal__row--result']" v-for="(item, index) in outputs" :key="index">
          <component :output="item.output" :is="item.type"></component>
        </div>
        <div class="ns-terminal__row ns-terminal__row--command">
          <div class="ns-terminal__line">
            <div class="ns-terminal__prompt">{{promptStyle}}</div>
            <div class="ns-terminal__content">
              <div class="ns-terminal__input" v-show="inputable">
                <span :class="['ns-terminal__text', { 'ns-terminal__text--blink': isActive && index === textIndex }, { 'ns-terminal__text--blur': !isActive && index === textIndex }, { 'ns-terminal__text--empty': item === ' ' }]" v-for="(item, index) in inputArray" :key="index">
                  <template v-if="item === ' '">
                    <span v-html="space"></span>
                  </template>
                  <template v-else>{{ item }}</template>
                </span>
                <span :class="['ns-terminal__cursor', {'ns-terminal__cursor--blink': isActive && textIndex === inputLength}, {'ns-terminal__cursor--blur': !isActive && textIndex === inputLength}]"></span>
              </div>
              <div class="ns-terminal__loading" v-show="!inputable">
                正在执行中...
              </div>
            </div>
          </div>
          <div class="ns-terminal__cmd">
            <input autocomplete="off" @keydown.stop="inputCommand" @focus="isActive = true" @blur="isActive = false" @compositionstart="isProcess = true" @compositionend="isProcess = false" ref="inputArea" v-model="input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import components from './outputs/index'
import 'focus-options-polyfill'
export default {
  components,
  name: 'Terminal',
  data() {
    return {
      mode: 'dark',
      space: '&nbsp;',
      // 右键菜单横坐标
      contextmenuX: 0,
      // 右键菜单纵坐标
      contextmenuY: 0,
      // 是否展示右键菜单
      contextmenuVisible: false,
      // 输入内容
      input: '',
      // 终端激活状态
      isActive: false,
      // 选中字符下标
      textIndex: 0,
      // 当输入中文时会置为true
      isProcess: false,
      // 历史命令
      commands: [],
      // 历史命令索引位置，用于上键下键切换历史命令
      commandIndex: 0,
      // 输出内容集合
      outputs: [
        {
          type: 'welcome',
          output: '欢迎使用!'
        }
      ],
      // 是否可输入
      inputable: true,
      promptStyle: '>'
    }
  },
  watch: {
    input(newVal, oldVal) {
      // 计算光标偏移量
      const offset = oldVal.length - this.textIndex
      this.textIndex = newVal.length - offset
    },
    outputs() {
      this.scrollToBottom()
    }
  },
  computed: {
    // 右键菜单
    menus() {
      return [
        {
          label: this.mode === 'dark' ? '明亮模式' : '暗黑模式',
          action: _ => {
            if (this.mode === 'dark') {
              this.mode = 'light'
            } else {
              this.mode = 'dark'
            }
          }
        }
      ]
    },
    inputArray() {
      const array = []
      const input = this.input
      for (let i = 0, len = this.inputLength; i < len; i++) {
        array[i] = input[i]
      }
      return array
    },
    inputLength() {
      return this.input.length
    }
  },
  methods: {
    contextmenu(e) {
      this.contextmenuX = e.clientX
      this.contextmenuY = e.clientY
      this.contextmenuVisible = true
    },
    // 按下键盘时，使隐藏的输入区域获得焦点，并设置光标位置
    focusInput() {
      this.$refs.inputArea.focus({ preventScroll: true })
      const textIndex = this.textIndex
      // 设置输入区光标位置
      this.$refs.inputArea.setSelectionRange(textIndex, textIndex)
    },
    // 激活
    activate() {
      this.focusInput()
    },
    // 解除激活
    unactivate(e) {
      if (!this.$refs.terminal.contains(e.target)) {
        this.$refs.inputArea.blur()
      }
    },
    // 监听隐藏输入区域键盘监听事件
    inputCommand(e) {
      if (!this.inputable) {
        return
      }
      // 输入汉字时返回
      if (this.isProcess) {
        return
      }
      const keyCode = e.keyCode
      // home键
      if (keyCode === 36) {
        this.textIndex = 0
      }
      // end键
      if (keyCode === 35) {
        this.textIndex = this.inputLength
      }
      // 键盘左键
      if (keyCode === 37) {
        if (this.textIndex === 0) {
          return
        }
        this.textIndex -= 1
      } else if (keyCode === 8) {
        // 火狐52版本下会返回上一页
        return false
        // 键盘右键或者delete键
      } else if (keyCode === 39 || keyCode === 46) {
        if (this.textIndex === this.inputLength) {
          return
        }
        this.textIndex += 1
        // 键盘上键
      } else if (keyCode === 38) {
        // 阻止光标移动头部的浏览器默认行为
        e.preventDefault()
        // 当不存在历史命令时
        if (!this.commands.length) {
          return
        }
        // 光标放到尾部
        this.textIndex = this.inputLength
        this.commandIndex = Math.max(this.commandIndex - 1, 0)
        this.input = this.commands[this.commandIndex]
        this.$nextTick(_ => {
          this.$refs.inputArea.setSelectionRange(
            this.inputLength,
            this.inputLength
          )
        })
        // 键盘下键
      } else if (keyCode === 40) {
        // 阻止光标移动尾部的浏览器默认行为
        e.preventDefault()
        // 当不存在历史命令时
        if (!this.commands.length) {
          return
        }
        // 光标放到尾部
        this.textIndex = this.inputLength
        this.commandIndex = Math.min(
          this.commandIndex + 1,
          this.commands.length
        )
        this.input = this.commands[this.commandIndex] || ''
        this.$nextTick(_ => {
          this.$refs.inputArea.setSelectionRange(
            this.inputLength,
            this.inputLength
          )
        })
        // 回车键
      } else if (keyCode === 13) {
        this.textIndex = this.inputLength
        const input = this.input.trim()
        this.outputs.push({
          type: 'command',
          output: {
            content: input,
            prompt: this.promptStyle
          }
        })
        // 空字符串返回
        if (!input) {
          return
        }
        this.commands.push(input)
        this.commandIndex = this.commands.length
        this.input = ''
        this.inputable = false
        this.doCommand(input)
      }
    },
    doCommand(command) {
      console.log(`执行${command}命令!!!!`)
      this.inputable = true
    },
    // 滚动条滚动到底部
    scrollToBottom() {
      this.$nextTick(_ => {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
      })
    }
  },
  mounted() {
    // 点击页面除终端区域时解除激活状态
    window.addEventListener('click', this.unactivate)
    this.focusInput()
  },
  beforeDestroy() {
    window.removeEventListener('click', this.unactivate)
  }
}
</script>
<style lang="less" scoped>
@import './styles/styles.less';
</style>
