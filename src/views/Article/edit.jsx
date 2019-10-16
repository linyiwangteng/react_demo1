import React, { Component, createRef} from 'react'
import {
  Card,
  Button,
  Form,
  Icon,
  Input,
  DatePicker,
  Spin,
  message
} from 'antd'
import E from 'wangeditor'
import './edit.less'
import { editArticle,editArticleSave} from '../../request'
import moment from 'moment'
const fomrItemLayout= {
  labelCol:{
    span:4
  },
  wrapperCol:{
    span:12
  }
}
@Form.create({name:'normal_login'})
 class ArticleEdit extends Component {
   constructor(){
     super()
     this.state = {
       isloading: false,
      //  titleValidateStatus: '',
      //  titeValidateHelp:''
     }
     this.editorRef = createRef();
   }
   componentDidMount(){
     this.initEditor()
     this.setState({
       isloading: true
     })
     editArticle(this.props.match.params.id).then(res=>{
      const {id,...data} = res.data
      data.createAt = moment(data.createAt)
      this.editor.txt.html(data.content)
      this.props.form.setFieldsValue(data)
     }).finally(()=>{
       this.setState({
         isloading: false
       })
     })
   }
  initEditor = () => {
  const {setFieldsValue} = this.props.form
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html)=>{
      setFieldsValue({
        'content':html
      })
    }
    this.editor.create()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields( (err,values) =>{
      if(!err) {
        values.createAt = moment(values.createAt).valueOf()
        // console.log('received values of form', values)
        this.setState({isloading: true})
        editArticleSave(values).then(res=>{
          this.setState({
            isloading:false
          })
        }).finally(()=>{
          console.log("edit update finish")
        })
      }
    })
  }
  handleChange = (date,dateString)=>{
    // console.log(date,dateString)
  }
  render() {
    // console.log(this.props.form)
    const {getFieldDecorator} = this.props.form
    return (
      <Card
        title={this.props.location.state ? this.props.location.state.title:'编辑文章'}
        bordered={false}
        extra = {<Button onClick={this.props.history.goBack}>取消</Button>}
      >
        <Spin spinning={this.state.isloading}>
          <Form 
            onSubmit={this.handleSubmit}
            {...fomrItemLayout}
          >
            <Form.Item
            label="文章标题"
              // validateStatus={this.state.titleValidateStatus}
              // help = {this.state.titeValidateHelp}
            >
              {
                getFieldDecorator('title',{
                  rules:[
                    {
                      required:true,
                      message:'please input article title!'
                    }
                    // {
                    //   validator:(rule,value,callback)=>{
                    //     if(!value){
                    //       this.setState({
                    //         titleValidateStatus: 'error',
                    //         titeValidateHelp:'please input article title'
                    //       })
                    //     }else{
                    //       this.setState({
                    //         titleValidateStatus: '',
                    //         titeValidateHelp:''
                    //       })
                    //     }
                    //   }
                    // }
                  ]
                })(
                  <Input 
                    prefix={<Icon type="user" style={{color:'rgba(0,0,0,0.25)'}} ></Icon>}
                    placeholder="文章标题"
                  />
                )
              }
            </Form.Item>
            <Form.Item label="作者">
              {
                getFieldDecorator('author',{
                  rules:[
                    {
                      required:true,
                      message:'please input article author'
                    }
                  ]
                })(
                  <Input 
                    prefix ={<Icon type="user" style={{color:'rgba(0,0,0,0.25)'}}/>}
                    placeholder='作者'
                  />
                )
              }
            </Form.Item>
            <Form.Item label='文章阅读量'>
              {
                getFieldDecorator('amount',{
                  rules:[
                    {
                      required:true,
                      message:'please input article amount'
                    },
                    {
                      pattern:/\d+/g,
                      message:'amount is number'
                    }
                  ]
                })(
                  <Input 
                    prefix ={<Icon type="user" style={{color:'rgba(0,0,0,0.25)'}}/>}
                    placeholder='文章阅读量'
                  />
                )
              }
            </Form.Item>
            <Form.Item label="创建时间">
              {
                getFieldDecorator('createAt',{
                  rules:[
                    {
                      required:true,
                      message:'please select article create time'
                    }
                  ]
                })(
                  <DatePicker onChange={this.handleChange} showTime/>
                )
              }
            </Form.Item>
            <Form.Item label="修改内容">
              {
                getFieldDecorator('content',{
                  rules:[
                    {
                      required:true,
                      message:'please select article content'
                    }
                  ]
                })(
                  <div ref={this.editorRef} className='editor-container'></div>
                )
              }
            </Form.Item>
            <Form.Item wrapperCol={
              {
                offset:4
              }
            }>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        
      </Card>
    )
  }
}

export default ArticleEdit