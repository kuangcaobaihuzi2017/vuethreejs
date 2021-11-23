import store from '../store'
function changeFontPosition() {
  // 如果字体的加载已经完成
  if (store.state.scene.getObjectByName('fontFront') !== undefined) {
    // 如果已经移动到指定位置，则直接返回
    if (store.state.scene.getObjectByName('fontFront').position.z < 3) {
      return
    } else {
      console.log('fontFront : ' + store.state.scene.getObjectByName('fontFront').position.z)
      // 则开始着手移动字体
      store.commit('adjPosition', { objName: 'fontFront', distanceX: 0.1, distanceY: 0, distanceZ: 0.05 })
    }
  }
}
export { changeFontPosition }
