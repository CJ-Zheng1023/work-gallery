<template>
  <div class="container">
    <div class="scroll" ref="scroll" @mousedown="handleMousedown" @mouseup="handleMark">
      <div v-html="html"></div>
    </div>
    <div class="mark-box">
      <div class="mark-box-header">我的标注</div>
      <div class="mark-box-body">
        <div class="marks">
          <template v-if="marks.length">
            <div :class="['mark-item', { 'active': mark.active }]" v-for="(mark, index) in marks" :key="mark.id" @click="clickMark(mark)">
              <div class="actions">
                <a-icon type="edit" @click="clickEditIcon(mark, index)" />
                <a-icon type="delete" style="margin-left: 8px" @click="clickDeleteIcon(mark.id, mark.active)" />
              </div>
              <div class="icon">
                <a-icon type="snippets" />
              </div>
              <div class="content">
                <div class="editor" v-show="mark.editing">
                  <a-textarea ref="textarea" v-model="mark.text" auto-size placeholder="请输入标注内容" @blur="handleEdit(mark)" />
                </div>
                <div class="viewer" v-show="!mark.editing">{{ mark.text }}</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="text-align: center;margin-top: 16px;color: #999;">暂无标注内容</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon as AIcon, Input, Modal, message } from 'ant-design-vue'
import { mark, createMarker, unmark } from 'html-replacer'
export default {
  name: 'Mark',
  components: {
    AIcon,
    ATextarea: Input.TextArea
  },
  data() {
    return {
      marks: [],
      html: `<p>Vue.js 是什么</p>
        <p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。</p>
        <p>如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。</p>
        <p>如果你已经是有经验的前端开发者，想知道 Vue 与其它库/框架有哪些区别，请查看对比其它框架。</p>
        <p>起步</p>
        <p>官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识。如果你刚开始学习前端开发，将框架作为你的第一步可能不是最好的主意——掌握好基础知识再来吧！之前有其它框架的使用经验会有帮助，但这不是必需的。</p>
        <p>声明式渲染</p>
        <p>我们已经成功创建了第一个 Vue 应用！看起来这跟渲染一个字符串模板非常类似，但是 Vue 在背后做了大量工作。现在数据和 DOM 已经被建立了关联，所有东西都是响应式的。我们要怎么确认呢？打开你的浏览器的 JavaScript 控制台 (就在这个页面打开)，并修改 app.message 的值，你将看到上例相应地更新。</p>
        <p>注意我们不再和 HTML 直接交互了。一个 Vue 应用会将其挂载到一个 DOM 元素上 (对于这个例子是 #app) 然后对其进行完全控制。那个 HTML 是我们的入口，但其余都会发生在新创建的 Vue 实例内部。</p>
        <p>这里我们遇到了一点新东西。你看到的 v-bind attribute 被称为指令。指令带有前缀 v-，以表示它们是 Vue 提供的特殊 attribute。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。在这里，该指令的意思是：“将这个元素节点的 title attribute 和 Vue 实例的 message property 保持一致”。</p>
        <p>如果你再次打开浏览器的 JavaScript 控制台，输入 app2.message = '新消息'，就会再一次看到这个绑定了 title attribute 的 HTML 已经进行了更新。</p>
        <p>组件化应用构建</p>
        <p>组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：</p>
        <p>尽管这只是一个刻意设计的例子，但是我们已经设法将应用分割成了两个更小的单元。子单元通过 prop 接口与父单元进行了良好的解耦。我们现在可以进一步改进 &lt;todo-item&gt; 组件，提供更为复杂的模板和逻辑，而不会影响到父单元。</p>
        <p>与自定义元素的关系</p>
        <p>你可能已经注意到 Vue 组件非常类似于自定义元素——它是 Web 组件规范的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 Slot API 与 is attribute。但是，还是有几个关键差别：</p>
        <p>Web Components 规范已经完成并通过，但未被所有浏览器原生实现。目前 Safari 10.1+、Chrome 54+ 和 Firefox 63+ 原生支持 Web Components。相比之下，Vue 组件不需要任何 polyfill，并且在所有支持的浏览器 (IE9 及更高版本) 之下表现一致。必要时，Vue 组件也可以包装于原生自定义元素之内。</p>
        <p>Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流、自定义事件通信以及构建工具集成。</p>
        <p>虽然 Vue 内部没有使用自定义元素，不过在应用使用自定义元素、或以自定义元素形式发布时，依然有很好的互操作性。Vue CLI 也支持将 Vue 组件构建成为原生的自定义元素。</p>`
    }
  },
  mounted() {
    message.info('通过鼠标滑动选中文本进行标注')
  },
  methods: {
    handleMousedown(e) {
      this.x = e.x
      this.y = e.y
    },
    handleMark(e) {
      if (!document.getSelection().toString()) {
        return
      }
      const marker = createMarker(
        this.$refs.scroll,
        document.getSelection().getRangeAt(0)
      )
      mark(this.$refs.scroll, marker, {
        click: (id, e) => {
          // 判断是否为点击操作，过滤滑动框选文本触发的点击事件
          if (e.x === this.x && e.y === this.y) {
            const markObj = this.marks.find(item => item.id === id)
            if (markObj) {
              this.clickMark(markObj)
            }
          }
        }
      })
      const markObj = {
        id: marker.id,
        text: '',
        active: false,
        editing: false
      }
      this.marks.push(markObj)
      this.clickMark(markObj)
      this.clickEditIcon(markObj, this.marks.length - 1)
    },
    handleEdit(mark) {
      if (!mark.text) {
        mark.text = '暂无'
      }
      mark.editing = false
    },
    clickEditIcon(mark, index) {
      mark.editing = true
      this.$nextTick(() => {
        this.$refs.textarea[index].focus()
      })
    },
    clickDeleteIcon(id, active) {
      Modal.confirm({
        title: '提示',
        content: '确定要删除该标注吗？',
        onOk: () => {
          this.marks = this.marks.filter(mark => mark.id !== id)
          if (active) {
            document
              .querySelectorAll(`[data-mark-id~='${id}']`)
              .forEach(dom => {
                dom.style.backgroundColor = '#ff9'
              })
          }
          unmark(id)
        }
      })
    },
    clickMark(mark) {
      this.marks.forEach(item => {
        document
          .querySelectorAll(`[data-mark-id~='${item.id}']`)
          .forEach(dom => {
            dom.style.backgroundColor = '#ff9'
          })
        item.active = false
      })
      mark.active = true
      document.querySelectorAll(`[data-mark-id~='${mark.id}']`).forEach(dom => {
        dom.style.backgroundColor = '#a2f19d'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  margin-right: 300px;
  overflow-y: hidden;
  padding: 0;
}
.scroll {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
}
.mark-box {
  position: fixed;
  right: 16px;
  top: 88px;
  bottom: 93px;
  width: 280px;
  background-color: #fff;
  box-shadow: rgb(199 204 209) 0px 2px 8px;
  display: flex;
  flex-flow: column;
  .mark-box-header {
    padding: 24px 16px 16px 16px;
    border-bottom: 1px solid #d7d6d6;
    color: #888;
    font-weight: 600;
    font-size: 16px;
    flex-shrink: 0;
  }
  .mark-box-body {
    flex-grow: 1;
    overflow-y: auto;
    .marks {
      padding: 20px 16px;
      .mark-item {
        & + .mark-item {
          margin-top: 16px;
        }
        &:hover {
          border-color: #cccaca;
        }
        &.active {
          border-color: #7c45f3;
          background-color: #eeeaf7;
        }
        border-bottom: 1px solid #d7d6d6;
        border-left: 1px solid transparent;
        border-top: 1px solid transparent;
        border-right: 1px solid transparent;
        border-radius: 4px;
        position: relative;
        padding: 20px 30px;
        cursor: pointer;
        .actions {
          position: absolute;
          top: 2px;
          right: 8px;
          font-size: 12px;
          .anticon {
            cursor: pointer;
          }
        }
        .icon {
          position: absolute;
          top: 20px;
          left: 10px;
          font-size: 16px;
          color: #7c45f3;
        }
        .content {
          .viewer {
            color: #777;
            font-size: 14px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
        .editor {
          .ant-input {
            background-color: #eeeaf7;
            border-top: none;
            border-left: none;
            border-right: none;
            resize: none;
            border-radius: 0;
            &:focus {
              box-shadow: none;
            }
            &:hover,
            &:focus {
              border-bottom-color: #bea5f5;
            }
          }
        }
      }
    }
  }
}
</style>