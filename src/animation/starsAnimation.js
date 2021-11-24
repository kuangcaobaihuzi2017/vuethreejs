import store from '../store'
function changeStarPosition() {
  // 如果星的加载全部完成(一共31个)
  if (store.state.scene.getObjectByName('star31') !== undefined) {
    // 则开始着手移动这些星
    for (var i = 0; i < 32; i++) {
      // 获取当前星的名字
      var starName = 'star' + i
      // 如果当前星或者所有星已经移动到指定位置，则不做任何处理
      if (store.state.scene.getObjectByName(starName).position.x < 0) {
        continue
      }

      // 从store获取渲染回数，每个星的渲染间隔10次(暂定)
      // 如果当前循环中的星已经达到渲染间隔，则提交位置更改
      if (store.state.animationCount > i * 4) {
        store.commit('adjPosition', { objName: 'star' + i, distanceX: 0, distanceY: 0, distanceZ: -1 })
      }
    }
  }
}
export { changeStarPosition }
