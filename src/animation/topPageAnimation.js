import store from '../store'
function changeStarPosition() {
  // 如果字体的加载已经完成
  if (store.state.scene.getObjectByName('fontBack') !== undefined) {
    // 则开始着手移动字体
    store.commit('adjPosition', { objName: 'fontBack', distanceX: 1, distanceY: 0, distanceZ: 0 })
  }
}
export { changeStarPosition }
