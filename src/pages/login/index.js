/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-07-12 21:45:25
 * @Description: 登录页面
 */
import React, { useState } from "react"
import logoImage from "@/assets/images/logo.png"
import { List, Picker, WhiteSpace, Button, WingBlank, Toast } from "antd-mobile"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import "./index.less"

function Login() {
  const dispatch = useDispatch()
  let history = useHistory()
  // 用户列表
  const userList = useSelector((state) => state.user.userList)
  const userPickerList = userList.map((item) => {
    return {
      label: item.name,
      value: item.addr,
      addr: item.addr,
      mnemonic: item.mnemonic,
    }
  })
  const [user, setUser] = useState(null)
  const [userAddr, setUserAddr] = useState(null)
  const setAddr = (addr) => {
    dispatch({ type: "user/setAddr", payload: addr })
    return Promise.resolve()
  }
  const setMnemonic = (mnemonic) => {
    dispatch({ type: "user/setMnemonic", payload: mnemonic })
  }
  // 选择当前用户
  const selectUser = (selectedUserAddr) => {
    let userItem = userPickerList.find((item) => item.addr == selectedUserAddr)
    setUser(userItem)
    setUserAddr(selectedUserAddr)
  }
  // 登录
  const toLogin = () => {
    if (!userAddr) {
      Toast.info("请选择登录账号!")
    } else {
      sessionStorage.setItem("isLogin", true)
      setMnemonic(user.mnemonic)
      setAddr(user.addr).then(() => {
        history.push("/")
      })
    }
  }

  return (
    <div className="login-wrapper">
      <img src={logoImage} />
      <h2>智慧养老链</h2>
      <List>
        <Picker
          value={userAddr}
          data={userPickerList}
          cols={1}
          onOk={(selectedUserAddr) => selectUser(selectedUserAddr)}
        >
          <List.Item arrow="horizontal">账号</List.Item>
        </Picker>
      </List>
      <WhiteSpace />
      <WhiteSpace />
      <WhiteSpace />
      <WhiteSpace />
      <WingBlank>
        <Button
          type="primary"
          onClick={() => {
            toLogin()
          }}
        >
          登录
        </Button>
      </WingBlank>
    </div>
  )
}

export default Login
