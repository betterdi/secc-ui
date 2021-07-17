/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-07-13 16:38:36
 * @Description:
 */
import React from "react"
import { Icon } from "antd-mobile"

function PageLoading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Icon size="lg" type="loading" style={{ margin: "0 auto" }} />
    </div>
  )
}

export default PageLoading
