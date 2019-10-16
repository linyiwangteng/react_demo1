import React, { Component } from 'react'
import { 
  Button,
  Table,
  Tag } from 'antd'
import { DndProvider, DragSource, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import moment from 'moment'
import {getArticles} from '../../request'

let dragingIndex = -1;
class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}
const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};
const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
// ];
const columnsMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  amount: '阅读量',
  createAt: '创建时间'
}
const ButtonGroup = Button.Group;
export default class drag extends Component {
  constructor(){
    super()
    this.state = {
      columns:[],
      data:[],
      total:0,
      offset:0,
      limited:10,
      isloading:false
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
            return (<Tag color={record.amount > 175 ? 'red' : 'green'} >{record.amount}</Tag>)
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
            <Button size="small" type="primary">编辑</Button>
            <Button size="small" type="danger">删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns;
  }
  getData = () => {
    getArticles({
      offset:this.state.offset,
      limited:this.state.limited
    }).then(res => {
      if(res.code === 200) {
        const {list,total} = res.data
        const columnsKeys = Object.keys(list[0])
        const columns = this.createColumns(columnsKeys)
        this.setState({
          total: total,
          columns: columns,
          data: list
        })
      }
    })
  }
  componentDidMount(){
    this.getData()
  }
  // state = {
  //   data: [
  //     {
  //       key: '1',
  //       name: 'John Brown',
  //       age: 32,
  //       address: 'New York No. 1 Lake Park',
  //     },
  //     {
  //       key: '2',
  //       name: 'Jim Green',
  //       age: 42,
  //       address: 'London No. 1 Lake Park',
  //     },
  //     {
  //       key: '3',
  //       name: 'Joe Black',
  //       age: 22,
  //       address: 'Sidney No. 1 Lake Park',
  //     },
  //     {
  //       key: '4',
  //       name: 'Joe Black',
  //       age: 52,
  //       address: 'Sidney No. 1 Lake Park',
  //     },
  //     {
  //       key: '5',
  //       name: 'Joe Black',
  //       age: 12,
  //       address: 'Sidney No. 1 Lake Park',
  //     },
  //   ],
  // };
  components = {
    body: {
      row: DragableBodyRow,
    },
  };
  moveRow = (dragIndex, hoverIndex) => {
    console.log('drag current index:',dragingIndex,'drop hoverIndex down postion',hoverIndex);
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          rowKey = {record => record.id}
          columns={this.state.columns}
          dataSource={this.state.data}
          components={this.components}
          pagination = {
            {
              total:this.state.total
            }
          }
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}
        />
      </DndProvider>
    )
  }
}
