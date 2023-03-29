import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined, PlusOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import React, {Fragment, useRef, useState} from 'react';
import classNames from 'classnames';
import {history, useRequest} from 'umi';
import { queryAdvancedProfile } from './service';
import styles from './style.less';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormDateRangePicker, ProFormSelect, DrawerForm, } from '@ant-design/pro-form';

import {rule} from "@/pages/subjects/Chapter/service";
const { Step } = Steps;
const ButtonGroup = Button.Group;
const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);
const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);
const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        // return (
        //   // <Dropdown.Button
        //   //   type="primary"
        //   //   icon={<DownOutlined />}
        //   //   overlay={mobileMenu}
        //   //   placement="bottomRight"
        //   // >
        //   //   主操作
        //   // </Dropdown.Button>
        // );
      }

      return (
        <Fragment>
          {/*<ButtonGroup>*/}
          {/*  <Button>操作一</Button>*/}
          {/*  <Button>操作二</Button>*/}
          {/*  <Dropdown overlay={menu} placement="bottomRight">*/}
          {/*    <Button>*/}
          {/*      <EllipsisOutlined />*/}
          {/*    </Button>*/}
          {/*  </Dropdown>*/}
          {/*</ButtonGroup>*/}
          {/*<Button type="primary">主操作</Button>*/}
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);
const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="正常" />
    <Statistic title="题目数量" value={11} />
  </div>
);
const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="创建人">小菜鸡</Descriptions.Item>
        <br/>
        <Descriptions.Item label="创建时间">2022-01-17</Descriptions.Item>
        {/*<Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>*/}
        {/*<Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>*/}
      </Descriptions>
    )}
  </RouteContext.Consumer>
);
const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <DingdingOutlined
        style={{
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);
const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <DingdingOutlined
        style={{
          color: '#00A0E9',
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);
const popoverContent = (
  <div
    style={{
      width: 160,
    }}
  >
    吴加号
    <span
      className={styles.textSecondary}
      style={{
        float: 'right',
      }}
    >
      <Badge
        status="default"
        text={
          <span
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            未响应
          </span>
        }
      />
    </span>
    <div
      className={styles.textSecondary}
      style={{
        marginTop: 4,
      }}
    >
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        <span>{dot}</span>
      </Popover>
    );
  }

  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];


const Problem = () => {
  const [tabStatus, seTabStatus] = useState({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

  const [drawerVisit, setDrawerVisit] = useState(false);
  console.log(history.location.search);
  let params = new URLSearchParams(history.location.search);
  var subjectId = parseInt(params.get("subjectId"));
  var chapterId = parseInt(params.get("chapterId"));
  console.log("获取路径值"+subjectId+"  "+ chapterId);

  const columns = [
    {
      title: '题目',
      dataIndex: 'problemContent',
      valueType: 'textarea',
      width: 120,
      fixed: 'left',
    },
    {
      title: '题型',
      dataIndex: 'problemType',
      valueType: 'textarea',
    },
    {
      title: '答案',
      dataIndex: 'problemAnswer',
      valueType: 'textarea',
    },
    // {
    //   title: '解析',
    //   dataIndex: 'problemAnalysis',
    //   valueType: 'textarea',
    // },
    {
      title: 'A',
      dataIndex: 'A',
      valueType: 'textarea',
    },
    {
      title: 'B',
      dataIndex: 'B',
      valueType: 'textarea',
    },
    {
      title: 'C',
      dataIndex: 'C',
      valueType: 'textarea',
    },
    {
      title: 'D',
      dataIndex: 'D',
      valueType: 'textarea',
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row, index, action) => [
        <a key="a" onClick={() => {
          action === null || action === void 0 ? void 0 : action.startEditable(row.key);
        }}>
          编辑
        </a>,
      ],
    },
  ];
  const { data = {}, loading } = useRequest(queryAdvancedProfile);
  const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;
  const contentList = {
    tab1: (
      <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={columns}
      />
    ),
  };

  const onTabChange = (tabActiveKey) => {
    seTabStatus({ ...tabStatus, tabActiveKey });
  };

  const onOperationTabChange = (key) => {
    seTabStatus({ ...tabStatus, operationKey: key });
  };
  var dataa;
  const actionRef = useRef();
  return (<>
    <PageContainer
      title="科目：C语言"
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      // tabList={[
      //   {
      //     key: 'detail',
      //     tab: '详情',
      //   },
      //   {
      //     key: 'rule',
      //     tab: '规则',
      //   },
      // ]}
    >
      <div className={styles.main}>
        <GridContent>

          <ProTable
            headerTitle="查询表格"
            actionRef={actionRef}
            rowKey="problemId"
            search={{
              labelWidth: 120,
            }}
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  handleModalVisible(true);
                }}
              >
                <PlusOutlined /> 新建
              </Button>,
            ]}
            request={async (
                            sort,
                            filter,
                           ) => {const msg = await queryAdvancedProfile({subjectId,chapterId,});
              dataa = msg.data;

              console.log("data"+dataa);
                                  return {data: msg.data,};
                               }
                    }
            columns={[
              {
                title: '题目',
                dataIndex: 'problemContent',
                valueType: 'textarea',
                width: 120,
                fixed: 'left',
              },
              {
                title: '题型',
                dataIndex: 'problemType',
                valueType: 'textarea',
              },
              {
                title: '答案',
                dataIndex: 'problemAnswer',
                valueType: 'textarea',
              },
              // {
              //   title: '解析',
              //   dataIndex: 'problemAnalysis',
              //   valueType: 'textarea',
              // },
              {
                title: 'A',
                dataIndex: 'A',
                valueType: 'textarea',
              },
              {
                title: 'B',
                dataIndex: 'B',
                valueType: 'textarea',
              },
              {
                title: 'C',
                dataIndex: 'C',
                valueType: 'textarea',
              },
              {
                title: 'D',
                dataIndex: 'D',
                valueType: 'textarea',
              },
              {
                title: '操作',
                width: 100,
                key: 'option',
                fixed: 'right',
                valueType: 'option',
                render: () => [
                  <a key="link" onClick={() => {
                    setDrawerVisit(true);
                  }}>编辑</a>,
                  <a key="link2">删除</a>,
                ],
              },
            ]}
            rowSelection={{
              onChange: (_, selectedRows) => {
                setSelectedRows(selectedRows);
              },
            }}
            scroll={{ x: 1300 }}
            options={false}
            // search={false}
            // rowKey="key"
            // headerTitle="批量操作"
            // toolBarRender={() => [<Button key="show">查看日志</Button>]}
          />

          <ProTable columns={columns} request={async (
            sort,
            filter,
          ) => {const msg = await queryAdvancedProfile({subjectId,chapterId,});
            dataa = msg.data;

            console.log("data"+dataa);
            return {data: msg.data,};
          }
          }
          //           search={{
          //   defaultCollapsed: false,
          //   span: 12,
          //   labelWidth: 'auto',
          // }}
                    editable={{
            type: 'multiple',
          }} rowKey="key" headerTitle="样式类"/>

        </GridContent>
      </div>


    </PageContainer>

      <DrawerForm onVisibleChange={setDrawerVisit} title="新建表单" visible={drawerVisit} onFinish={async () => {
        message.success('提交成功');
        return true;
      }}>
        <ProForm.Group>
          <ProFormText width="md" name="name" label="题目" initialValue="dataa." tooltip="最长为 24 位" placeholder="请输入名称"/>
          <ProFormText width="md" name="company" label="题型" placeholder="请输入名称"/>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="contract" label="答案" placeholder="请输入名称"/>
          <ProFormText name="contractTime" label="解析"/>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="name" label="A" tooltip="最长为 24 位" placeholder="请输入名称"/>
          <ProFormText width="md" name="company" label="B" placeholder="请输入名称"/>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="name" label="C" tooltip="最长为 24 位" placeholder="请输入名称"/>
          <ProFormText width="md" name="company" label="D" placeholder="请输入名称"/>
        </ProForm.Group>

      </DrawerForm>
    </>
  );
};

export default Problem;
