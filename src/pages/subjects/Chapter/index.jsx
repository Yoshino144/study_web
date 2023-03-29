import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';
import {history} from "umi";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields, currentRow) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({ ...currentRow, ...fields });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /** 国际化配置 */


  console.log(history.location.search);
  let params = new URLSearchParams(history.location.search);
  var q = parseInt(params.get("subjectId"));
  console.log(q);

  const columns = [
    {
      title: '科目名称',
      dataIndex: 'chapterName',
      tip: '嘤嘤嘤',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '数量',
      dataIndex: 'chapterSize',
      valueType: 'textarea',
      renderText: (val) => `${val}个`,
    },
    {
      title: '版本',
      dataIndex: 'chapterVersion',
      sorter: true,
      hideInForm: true,
      renderText: (val) => `${val}.0`,
    },
    {
      title: '创建时间',
      dataIndex: 'chapterTime',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //       key="config"
    //       onClick={() => {
    //         handleUpdateModalVisible(true);
    //         setCurrentRow(record);
    //       }}
    //     >
    //       配置
    //     </a>,
    //     <a key="subscribeAlert" href="https://procomponents.ant.design/">
    //       订阅警报
    //     </a>,
    //   ],
    // },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="chapterId"
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
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          // params: T & {
          //   pageSize: number;
          //   current: number;
          // },
          sort,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await rule({
            // page: params.current,
            // pageSize: params.pageSize,
            q,
          });
          return {
            data: msg.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            // success: boolean,
            // // 不传会使用 data 的长度，如果是分页一定要传
            // total: number,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="新建章节"
        width="500px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      ><ProFormText width="md" name="chapterName" label="章节名称" tooltip="别碰我！！！！" placeholder="请输入名称"/>

      </ModalForm>
      {/*<ModalForm title="新建表单" trigger={<Button type="primary">自定义文字</Button>} submitter={{*/}
      {/*  searchConfig: {*/}
      {/*    submitText: '确认',*/}
      {/*    resetText: '取消',*/}
      {/*  },*/}
      {/*}} onFinish={async (values) => {*/}
      {/*  await waitTime(2000);*/}
      {/*  console.log(values);*/}
      {/*  message.success('提交成功');*/}
      {/*  return true;*/}
      {/*}}>*/}
      {/*  <ProFormText width="md" name="name" label="签约客户名称" tooltip="最长为 24 位" placeholder="请输入名称"/>*/}

      {/*  <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
      {/*</ModalForm>*/}
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
