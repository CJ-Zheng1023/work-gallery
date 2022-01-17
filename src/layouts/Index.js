import Sider from './sider/Index.vue'
import Header from './header/Index.vue'
import Footer from './footer/Index.vue'
import Content from './content/Index.vue'
import { Layout } from 'ant-design-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  computed: {
    ...mapGetters('app', ['collapsed']),
    style() {
      const style = this.collapsed ? { marginLeft: '80px' } : { marginLeft: '300px' }
      return Object.assign(style, { transition: 'margin-left 0.2s' })
    }
  },
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider />
        <Layout style={this.style}>
          <Header />
          <Content />
          <Footer />
        </Layout>
      </Layout>
    )
  }
}
