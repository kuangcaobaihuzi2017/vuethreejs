import store from '../store'
function changeStarPosition() {
  //   // 如果星星的模型已经导入完成(一共31个)
  //   if (store.state.scene.getObjectByName('star31') !== undefined) {
  //     // 如果星星已经移动到指定位置，则不执行
  //     if (store.state.scene.getObjectByName('star31').position.x === 0) {
  //       return
  //     } else {
  //       for (var i = 0; i < 32; i++) {
  //         console.log('store : ' + store.state.scene.getObjectByName('star' + i))
  //         store.state.scene.getObjectByName('star' + i).translateOnAxis(-1)
  //       }
  //     }
  //   }
  console.log('store.state.scene.getObjectByName' + store.state.scene.getObjectByName('star1') !== undefined)
  if (store.state.scene.getObjectByName('star1') !== undefined) {
    console.log(store.state.scene.getObjectByName('star1').translateOnAxis(0.0001))
    store.state.scene.getObjectByName('star1').translateOnAxis(0.0001)
  }
}
export { changeStarPosition }
