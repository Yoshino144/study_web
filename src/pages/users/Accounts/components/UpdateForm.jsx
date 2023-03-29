import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';

const UpdateForm = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="修改信息"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          desc: props.values.phone,
        }}
        title="基本信息"
      >
        <ProFormText
          name="name"
          label="名称"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入名称！',
            },
          ]}
        />
        <ProFormText
          name="phone"
          width="md"
          label="手机号"
          placeholder="请输入手机号！"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
              min: 5,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          password: props.values.password,
          position: props.values.position,
        }}
        title="敏感信息"
      >
        <ProFormText
          name="password"
          width="md"
          label="密码"
          placeholder="暂不支持修改"
          readonly={true}
          rules={[
            {
              message: '请输入密码！',
            },
          ]}
        />
        <ProFormRadio.Group
          name="position"
          label="规则类型"
          options={[
            {
              value: '老师',
              label: '老师',
            },
            {
              value: '学生',
              label: '学生',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          time: props.values.time,
        }}
        title="其他信息"
      >
        <ProFormDatePicker
          name="time"
          width="md"
          label="生日"
          rules={[
            {
              required: true,
              message: '请选择时间！',
            },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
