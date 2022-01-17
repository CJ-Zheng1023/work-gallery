import { TOGGLE_COLLAPSE } from '@/store/mutation-types'
export default {
  [TOGGLE_COLLAPSE]: (state, flag) => {
    state.collapsed = flag
  }
}
