import store from '../store'
function changeStarPosition() {
  // 如果星的加载全部完成(一共31个)
  if (store.state.scene.getObjectByName('star31') !== undefined) {
    // 则开始着手移动这些星
    for (var i = 0; i < 32; i++) {
      // 如果当前星已经移动到指定位置，则不做任何处理
      var starName = 'star' + i
      console.log(starName + '.z : ' + store.state.scene.getObjectByName(starName).position.x)
      if (store.state.scene.getObjectByName('star' + i).position.x < 0) {
        return
      } else {
        store.commit('adjPosition', 'star' + i)
      }
    }
  }
}
export { changeStarPosition }
