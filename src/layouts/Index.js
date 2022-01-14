import MySider from './sider/Index.vue'
import MyHeader from './header/Index.vue'
import MyFooter from './footer/Index.vue'
import MyContent from './content/Index.vue'
import { Layout } from 'ant-design-vue'
const { Sider, Content, Footer, Header } = Layout
export default {
  name: 'Layout',
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider breakpoint="lg">
          <MySider />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', boxShadow: 'rgb(199 204 209) 0px 2px 8px' }}>
            <MyHeader />
          </Header>
          <Content style={{ margin: '24px 16px', backgroundColor: '#fff', boxShadow: 'rgb(199 204 209) 0px 2px 8px' }}>
            <MyContent />
          </Content>
          <Footer>
            <MyFooter />
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
