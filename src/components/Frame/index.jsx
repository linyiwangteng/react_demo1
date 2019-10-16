import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import './frame.less'
import {adminRoutes} from '../../routes'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const navRoutes = adminRoutes.filter(route=>{return route.isNav === true})

@withRouter
 class Frame extends Component {
  selectItem = ({ key })=>{
    this.props.history.push(key);
  }
  render() {
    const selectedKeyArr = this.props.location.pathname.split('/')
    selectedKeyArr.length = 3
    
    return (
      <Layout style={{height:'100%'}}>
        <Header className="header cra-header">
          <div className="logo" />
        </Header>

        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKeyArr.join('/')]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.selectItem}
            >
            {
              navRoutes.map(route=>{
                return (
                  <Menu.Item key={route.pathName} title={route.title}>
                      <Icon type={route.icon} />
                      {route.title}
                    
                  </Menu.Item>
                )
              })
            }
          
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  subnav 1
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  subnav 2
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  subnav 3
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
            </Menu>
          </Sider>

          <Layout style={{ padding: '0 16px 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                this.props.routes.map(route=>{
                  if(route.pathName === this.props.location.pathname)
                  {
                    return (<Breadcrumb.Item key={route.pathName}>{route.title}</Breadcrumb.Item>)
                  }
                })
              }
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 16,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame