import { Menu, Icon, Input } from 'ant-design-vue'
import routes from '@/router/routes'
const { SubMenu, Item } = Menu
export default {
  name: 'Menu',
  data() {
    return {
      path: this.$route.path
    }
  },
  methods: {
    generateMenus(routes) {
      return routes.map(route => {
        if (route.children && route.children.length) {
          return (
            <SubMenu key={route.name}>
              <span slot="title">
                <Icon type="appstore" />
                <span>{route.name}</span>
              </span>
              {this.generateMenus(route.children)}
            </SubMenu>
          )
        } else {
          return (
            <Item key={route.path}>
              <router-link to={route.path}>
                <Icon type="appstore" />
                <span>{route.name}</span>
              </router-link>
            </Item>
          )
        }
      })
    }
  },
  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.path]}>
        {this.generateMenus(routes)}
      </Menu>
    )
  }
}
