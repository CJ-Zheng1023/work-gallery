import { TOGGLE_COLLAPSE } from '@/store/mutation-types'
export default {
  toggleCollapse({ commit }, flag) {
    commit(TOGGLE_COLLAPSE, flag)
  }
}
