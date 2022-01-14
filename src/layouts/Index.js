import Sider from './sider/Index.vue'
import Header from './header/Index.vue'
import Footer from './footer/Index.vue'
import Content from './content/Index.vue'
import { Layout } from 'ant-design-vue'
export default {
  name: 'Layout',
  data() {
    return {
      collapsed: true
    }
  },
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider />
        <Layout>
          <Header />
          <Content />
          <Footer />
        </Layout>
      </Layout>
    )
  }
}
