/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-22 14:35:11
 * @Description: 我的
 */
import React from "react"
// import { NavBar } from "antd-mobile";
import BasicNav from "@/components/nav"
import "./index.less"
import { connect } from "react-redux"
import { WhiteSpace, WingBlank, Button } from "antd-mobile"
import { hexToNumber, u8aToString } from "@polkadot/util"
import { RELATIVES_TYPE } from "@/const/type"
import { idToGender, idToAge } from "@/util"
import { Link, withRouter } from "react-router-dom"
import emptyImg from "@/assets/images/myempty.png"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import typeSettings from "@/const/typeSettings"
import avatarMale from "@/assets/images/male.png"
import avatarFemale from "@/assets/images/female.png"

function Nav() {
  return <BasicNav hideIcon>我的</BasicNav>
}

class Mine extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {
        id_card: "",
        height: "",
        weight: "",
      },
      loaded: false,
      empty: false,
    }
  }

  /**
   * 获取本人信息
   */
  async getMyselfInfo() {
    await cryptoWaitReady()
    // eslint-disable-next-line
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    try {
      let result = await api.query.healthAi.relations(
        this.props.user.addr,
        RELATIVES_TYPE.SELF
      )
      if (!result.isEmpty) {
        let person = result.value
        this.setState({
          user: {
            id_card: u8aToString(person.get("id_card")),
            name: u8aToString(person.get("name")),
            height: hexToNumber(person.get("height")),
            weight: hexToNumber(person.get("weight")),
          },
        })
      } else {
        this.setState({
          empty: true,
        })
      }
      this.setState({
        loaded: true,
      })
    } catch (err) {
      this.setState({
        empty: true,
        loaded: true,
      })
    }
  }

  logout() {
    sessionStorage.removeItem("isLogin")
    this.props.setCurrentRelatives(null)
    this.props.setRelativesList([])
    this.props.setAddr("")
    this.props.setMnemonic("")
    this.props.setActiveName("family")
    this.props.history.push("/login")
  }

  render() {
    let user = this.props.user.relativesList.find(
      (item) => item.relationType == RELATIVES_TYPE.SELF
    )
    let genderImg =
      user && idToGender(user.id_card) === "男" ? avatarMale : avatarFemale

    return (
      <div className="content-wrapper">
        {this.props.app.activeName === "mine" && <Nav></Nav>}
        {user && (
          <div className="info-card-wrapper">
            <img className="avatar" src={genderImg} />
            <div className="info">
              <div>
                <span className="label">姓名：</span>
                <span className="data">{user.name}</span>
                <span className="label" style={{ marginLeft: "16px" }}>
                  年龄：
                </span>
                <span className="data">{idToAge(user.id_card)}</span>
              </div>
              <div>
                <span className="label">性别：</span>
                <span className="data">{idToGender(user.id_card)}</span>
              </div>
              <div>
                <span className="label">钱包地址：</span>
                <span className="data">{this.props.user.addr}</span>
              </div>
            </div>
          </div>
        )}
        <WhiteSpace />
        <WingBlank>
          {!user && (
            <div className="empty-wrapper">
              <img src={emptyImg} className="avatar" />
              <div className="tip">还没有添加本人信息哦！</div>
              <Link to="/addFamily">
                <Button
                  type="primary"
                  size="small"
                  inline
                  icon={<i className="iconfont icon-add"></i>}
                >
                  马上添加
                </Button>
              </Link>
            </div>
          )}
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.logout.bind(this)}>
            <i className="iconfont icon-dianyuanjianguanbiguanjituichu exit-icon"></i>
            退出登录
          </Button>
        </WingBlank>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setActiveName: (activeName) =>
    dispatch({
      type: "app/setActiveName",
      payload: activeName,
    }),
  setCurrentRelatives: (currentRelatives) =>
    dispatch({
      type: "user/setCurrentRelatives",
      payload: currentRelatives,
    }),
  setRelativesList: (relativesList) =>
    dispatch({
      type: "user/setRelativesList",
      payload: relativesList,
    }),
  setAddr: (chronicTaboos) =>
    dispatch({
      type: "user/setAddr",
      payload: chronicTaboos,
    }),
  setMnemonic: (chronicTaboos) =>
    dispatch({
      type: "user/setMnemonic",
      payload: chronicTaboos,
    }),
})

function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Mine))
