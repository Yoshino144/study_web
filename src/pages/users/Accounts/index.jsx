import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Input, Drawer} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ModalForm, ProFormText,ProFormDatePicker,ProFormTextArea,ProFormSelect} from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import {rule, addRule, updateRule, removeRule} from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({...fields});
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
    await updateRule({...currentRow, ...fields});
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
  const [createMo, handleM] = useState(false);
  // /** 分布更新窗口的弹窗 */
  //
  const [currentRow, setCurrentRow] = useState();
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
   const [showDetail, setShowDetail] = useState(false);
  //const actionRef = useRef();
  // const [currentRow, setCurrentRow] = useState();
  // //const [selectedRowsState, setSelectedRows] = useState([]);
  // /** 国际化配置 */

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      tip: '规则名称是唯一的 key',
      copyable: true,
    },
    {
      title: '昵名',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      sorter: true,
      hideInForm: true,
      valueType: 'textarea',
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      valueType: 'date',
    },
    {
      title: '角色',
      dataIndex: 'position',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'online',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        close: {text: '关闭', status: 'Default'},
        running: {text: '运行中', status: 'Processing'},
        online: {text: '已上线', status: 'Success'},
        error: {text: '异常', status: 'Error'},
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (text,record,index,action) => [<a
        key="config"
        onClick={() => {
          handleUpdateModalVisible(true);
          setCurrentRow(record);
        }}
      >
        配置
      </a>, <a key="2"
                                           onClick={async () => {
                                             console.log(text);
                                             console.log(record);
                                             console.log(index);
                                             console.log(action);

                                             // async () => {
                                               const success = await removeRule(record);

                                               if (success) {
                                                 handleModalVisible(false);

                                                 action.reload();
                                               }
                                             // }

                                           }}>删除</a>],
    },

  ];
  return (
   <PageContainer>
      <ProTable
        headerTitle="用户信息"
        //actionRef={actionRef}
        // search={{
        //   labelWidth: 120,
        // }}
        // editable={{
        //   type: 'multiple',
        // }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        search={false}
      />
      {/*{selectedRowsState?.length > 0 && (*/}
      {/*  <FooterToolbar*/}
      {/*    extra={*/}
      {/*      <div>*/}
      {/*        已选择{' '}*/}
      {/*        <a*/}
      {/*          style={{*/}
      {/*            fontWeight: 600,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {selectedRowsState.length}*/}
      {/*        </a>{' '}*/}
      {/*        项 &nbsp;&nbsp;*/}
      {/*        <span>*/}
      {/*          服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <Button*/}
      {/*      onClick={async () => {*/}
      {/*        await handleRemove(selectedRowsState);*/}
      {/*        setSelectedRows([]);*/}
      {/*        actionRef.current?.reloadAndRest?.();*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      批量删除*/}
      {/*    </Button>*/}
      {/*    <Button type="primary">批量审批</Button>*/}
      {/*  </FooterToolbar>*/}
      {/*)}*/}
      <ModalForm
        title="添加用户"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

              actionRef.current.reload();
          }
        }}
      >
          <ProFormText width="md" name="name" label="名称" tooltip="最长为 24 位" placeholder="请输入名称"/>
          <ProFormText width="md" name="phone" label="手机号" placeholder="请输入手机号"/>
        <ProFormText width="md" name="password" label="密码" placeholder="请输入密码"/>

        <ProFormSelect options={[
          {
            value: '管理员',
            label: '管理员',
          },{
            value: '学生',
            label: '学生',
          },
        ]} width="xs" name="position" label="角色"/>
          <ProFormDatePicker width="md" name={'birthday'} label="生日"/>
      </ModalForm>
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
