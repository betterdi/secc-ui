/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-22 00:03:26
 * @Description: 懒加载
 */
import Loadable from "react-loadable"
import pageLoading from "./pageLoading"

function lazyLoad(loader, loading = pageLoading) {
  return Loadable({
    loader, //需要懒加载的组件
    loading,
  })
}
//loading 组件通用,
export default lazyLoad
