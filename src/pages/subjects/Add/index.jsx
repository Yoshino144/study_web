import { Card, message } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const Add = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values) => {
    run(values);
  };

  return (
    <PageContainer content="你可以在这里添加一个全新的属于你的课程~">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="名称"
            name="subjectName"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
            placeholder="给你的科目起个名字吧~"
          />
          {/*<ProFormDateRangePicker*/}
          {/*  label="起止日期"*/}
          {/*  width="md"*/}
          {/*  name="date"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请选择起止日期',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder={['开始日期', '结束日期']}*/}
          {/*/>*/}
          <ProFormTextArea
            label="描述"
            width="xl"
            name="subjectDesc"
            rules={[
              {
                required: true,
                message: '请输入描述',
              },
            ]}
            placeholder="请输入描述"
          />

          {/*<ProFormTextArea*/}
          {/*  label="衡量标准"*/}
          {/*  name="standard"*/}
          {/*  width="xl"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请输入衡量标准',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder="请输入衡量标准"*/}
          {/*/>*/}

          {/*<ProFormText*/}
          {/*  width="md"*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      客户*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  tooltip="目标的服务对象"*/}
          {/*  name="client"*/}
          {/*  placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"*/}
          {/*/>*/}

          {/*<ProFormText*/}
          {/*  width="md"*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      邀评人*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  name="invites"*/}
          {/*  placeholder="请直接 @姓名／工号，最多可邀请 5 人"*/}
          {/*/>*/}

          {/*<ProFormDigit*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      权重*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  name="weight"*/}
          {/*  placeholder="请输入"*/}
          {/*  min={0}*/}
          {/*  max={100}*/}
          {/*  width="xs"*/}
          {/*  fieldProps={{*/}
          {/*    formatter: (value) => `${value || 0}%`,*/}
          {/*    parser: (value) => (value ? value.replace('%', '') : '0'),*/}
          {/*  }}*/}
          {/*/>*/}

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: '公开',
              },
              {
                value: '2',
                label: '不公开',
              },
            ]}
            label="目标公开"
            help="谁可以使用这个科目。"
            name="subjectPrivate"
          />
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: '班级甲',
                    },
                    {
                      value: '2',
                      label: '班级乙',
                    },
                    {
                      value: '3',
                      label: '班级丙',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Add;
