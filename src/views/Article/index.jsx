import React, { Component } from 'react'
import moment from 'moment'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Typography,
  message,
  Popover
} from 'antd'
import { getArticles,deleteArticle } from '../../request'
const columnsMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  amount: '阅读量',
  createAt: '创建时间'
}
const ButtonGroup = Button.Group;
export default class ArticleList extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      offset: 0,
      limited: 10,
      isloading: false,

      isShowModal:false,
      deleteModalTitle:null,
      deleteArticleConfirmLoading:false,
      deleteArticleId:null
    }
  }
  createColumns = (columnsKeys) => {
    let columns = columnsKeys.map(item => {
      if (item === 'amount') {
        return {
          title: columnsMap[item],
          key: item,
          align: 'center',
          render: (text, record) => {
            return (<Popover content={record.amount > 175 ? '阅读量超过175':'阅读量不足175'}><Tag color={record.amount > 175 ? 'red' : 'green'} >{record.amount}</Tag></Popover>)
          }
        }
      }
      if (item === 'createAt') {
        return ({
          title: columnsMap[item],
          key: item,
          align: "center",
          render: (text, record) => {
            return (moment(record.createAt).format('YYYY年MM月DD日 HH:mm:ss'))
          }
        })
      }
      return {
        title: columnsMap[item],
        dataIndex: item,
        key: item,
        align: 'center',
      }
    })
    columns.push({
      title: '操作',
      key: 'options',
      align: 'center',
      render: (text, record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.editArticle.bind(this,record)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.deleteData.bind(this,record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns;
  }
  editArticle = ({id,title})=>{
    // this.props.history.push(`/admin/article/edit/${id}`)
    this.props.history.push({
      pathname:`/admin/article/edit/${id}`,
      state:{
        title
      }
    })
  }
  deleteData = (record)=>{
    this.setState({
      isShowModal:true,
      deleteModalTitle:record.title,
      deleteArticleId:record.id
    })
    // Modal.confirm({
    //   title:'数据删除后将无法找回',
    //   content: <Typography>确定将要删除<span style={{color:'red'}}>{record.title}</span>这一篇文章</Typography>,
    //   okText:'我要删除',
    //   cancelText:'我点错了',
    //   onOk(){
    //     deleteArticle(record.id).then(res=>{
    //       console.log(res.data.msg)
    //     })
    //   }
    // })
  }
  hideModal = ()=>{
    this.setState({
      isShowModal:false,
      deleteModalTitle:'',
      deleteArticleConfirmLoading:false
    })
  }
  handleDeleteArticle = ()=>{
    this.setState({
      deleteArticleConfirmLoading:true
    })
    deleteArticle(this.state.deleteArticleId).then(res=>{
      if(res.code === 200) {
        message.success(res.data.msg)
        this.setState({
          offset:0
        },()=>{
          this.getData()
        })
        
      }
    }).catch(err=>{

    }).finally(()=>{
      this.setState({
        deleteArticleConfirmLoading:false,
        isShowModal:false
      })
    })
    
  }
  getData = () => {
    this.setState({
      isloading:true
    })
    getArticles({offset:this.state.offset,limited:this.state.limited}).then(res => {
      if (res.code === 200) {
        const { list, total } = res.data
        const columnsKeys = Object.keys(list[0])
        const columns = this.createColumns(columnsKeys)
        this.setState({
          total: total,
          columns: columns,
          dataSource: list
        })
      }
    }).catch(err=>{
      // 处理错误，虽然有全局处理
    }).finally(()=>{
      this.setState({
        isloading:false
      })
    })
  }
  componentDidMount() {
    this.getData()
  }
  dataChange = (page, pageSize) => {
    // console.log(page, pageSize)
    this.setState({
      offset:(page-1)*this.state.limited,
      limited:pageSize
    },()=>{
      this.getData()
    })
  }
  dataSizeChange = (current, size) => {
    // console.log(current, size)
    this.setState({
      offset:0,
      limited:size
    },()=>{
      this.getData()
    })

  }
  render() {
    return (
      <Card title="文章列表" bordered={false} extra={<Button>More</Button>}>
        <Table
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isloading}
          pagination={{
            current:(this.state.offset / this.state.limited + 1),
            hideOnSinglePage: true,
            showSizeChanger: true,
            showQuickJumper: true,
            // pageSize: this.state.limited,
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            total: this.state.total,
            onChange: this.dataChange,
            onShowSizeChange: this.dataSizeChange
          }}
          rowSelection={{
            columnWidth:'60px',
            columnTitle:'选择',
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          }}
        />
        <Modal
          title='数据删除后将无法找回'
          maskClosable={false}
          confirmLoading={this.state.deleteArticleConfirmLoading}
          visible={this.state.isShowModal}
          onCancel={this.hideModal}
          onOk={this.handleDeleteArticle}
        >
          <Typography>确定将要删除<span style={{color:'red'}}>{this.state.deleteModalTitle}</span>这一篇文章</Typography>
        </Modal>
      </Card>
    )
  }
}
