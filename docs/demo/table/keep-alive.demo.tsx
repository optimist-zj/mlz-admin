/**
 * title: keep-alive功能
 * desc: 用户需要从其它页面返回 Table 所在页面，并要求 Table 的数据保持跳出之前的状态，就需要开启 keep-alive 功能来保持状态。
 */
import React from 'react';
import Table from '@/Table/Table';
import axios from 'axios';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    primary: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime' as const,
  },
  {
    title: '更新时间',
    dataIndex: 'createdAt',
    valueType: 'date' as const,
  },
  {
    title: '操作',
    valueType: 'option' as const,
    width: 120,
    render: () => [<a>处理</a>, <a>删除</a>],
  },
];

class App extends React.PureComponent {
  state = {
    data: [],
    pageSize: 10,
    current: 1,
    total: 10,
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (params?: { current: number; pageSize: number }) => {
    this.setState({ loading: true });
    axios
      .get('http://rap2.taobao.org:38080/app/mock/252468/admini/table-demo', {
        method: 'get',
        params: params || {
          current: 1,
          pageSize: 10,
        },
      })
      .then((res: any) => {
        const { data } = res;
        this.setState({
          data: data.items,
          total: data.total,
          current: parseInt(data.current_page, 10),
          pageSize: parseInt(data.page_size, 10),
          loading: false,
        });
      });
  };

  render() {
    return (
      <Table
        columns={columns}
        keepAlive="keep-alive-demo"
        dataSource={this.state.data}
        loading={this.state.loading}
        current={this.state.current}
        pageSize={this.state.pageSize as any}
        total={this.state.total}
        onChange={(pgn: any) => {
          this.fetchData(pgn);
        }}
      />
    );
  }
}

export default App;
