import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Redirect,
} from "react-router-dom"
import "./App.less"
import store from "./store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

import loadable from "@/components/lazyload"
const Login = loadable(() => import("@/pages/login"))
const Home = loadable(() => import("@/pages/home"))
const AddFamily = loadable(() => import("@/pages/addFamily"))
const BindDevice = loadable(() => import("@/pages/family/bindDevice"))
const Dish = loadable(() => import("@/pages/dish"))
const HealthArchives = loadable(() => import("@/pages/family/healthArchives"))
let persistor = persistStore(store)

const routerArr = [
  {
    path: "/",
    component: Home, // 首页
  },
  {
    path: "/login",
    component: Login, // 登录
  },
  {
    path: "/addFamily",
    component: AddFamily, // 添加家人
  },
  {
    path: "/dish",
    component: Dish, // 菜品识别
  },
  {
    path: "/bindDevice",
    component: BindDevice, // 绑定设备
  },
  {
    path: "/healthArchives",
    component: HealthArchives, // 健康档案
  },
]

function RouterGuard() {
  // let history = useHistory()
  let location = useLocation()
  // 拿到路径
  let { pathname } = location
  // 拿到当前路由
  let thisRoute = routerArr.find((el) => el["path"] == pathname)
  let isLogin = sessionStorage.getItem("isLogin")
  //如果没登录且页面为登录页的话渲染登录页
  if (pathname == "/login" && !isLogin) {
    return <Route path={pathname} component={thisRoute["component"]} exact />
  }
  //如果已经登录渲染页面
  if (isLogin) {
    //如果登陆了跳转login页，则重定向
    if (pathname == "/login") {
      return <Redirect to="/" />
    }
    // 判定路由是否存在，如果存在正常渲染
    if (thisRoute) {
      return <Route path={pathname} component={thisRoute["component"]} exact />
    } else {
      //否则进入404页面
      return <Redirect to="/error" />
    }
  } else {
    // 否则跳转到登录页
    return <Redirect to="/login" />
  }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Switch>
              <RouterGuard />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
