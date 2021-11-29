import store from '../store'
function lookAtPostiion() {
  // 把相机焦点提交到store
  store.commit('setLookAtPosition', { distanceX: 0, distanceY: 0, distanceZ: -1 })
}
export { lookAtPostiion }
