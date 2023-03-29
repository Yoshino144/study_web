import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import {Avatar, Card, Col, Dropdown, Form, List, Menu, message, Row, Select, Tooltip} from 'antd';
import numeral from 'numeral';
import React from 'react';
import {history, useRequest} from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import {queryFakeList} from './service';
import styles from './style.less';
import {login} from "@/services/ant-design-pro/api";
const {Option} = Select;

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result = val;

  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}

const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};


const CardInfo = ({subjectSize, newUser}) => (
  <div className={styles.cardInfo}>
    <div>
      <p>题目数量</p>
      <p>{subjectSize}</p>
    </div>
    <div>
      <p>选课人数</p>
      <p>{newUser}</p>
    </div>
  </div>
);

export const All = () => {
  const {data, loading, run} = useRequest((values) => {
    console.log('form data', values);
    return queryFakeList({
      count: 8,
    });
  });

  const page = async (values) => {
    //alert(values)
    console.log(values)
    //dispatch(routerRedux.push('/dashboard/analysis'));
    history.push('/subjects/Chapter?subjectId='+values);
    // router.push({
    //   pathname: '/dashboard/analysis',
    //   query: {id: 2},
    //   state: {obj: {id: 1}}
    // })
  };


  const list = data?.list || [];
  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          测试哦~
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        {/*<Form*/}
        {/*  onValuesChange={(_, values) => {*/}
        {/*    run(values);*/}
        {/*  }}*/}
        {/*>*/}
          <StandardFormRow
            title="所属类目"
            // block
            // style={{
            //   paddingBottom: 11,
            // }}
          >
            <Form.Item name="subjectOfficial">
              <TagSelect expandable>
                <TagSelect.Option value="1">官方题库</TagSelect.Option>
                <TagSelect.Option value="2">个人题库</TagSelect.Option>
                <TagSelect.Option value="3">私密题库</TagSelect.Option>
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          {/*<StandardFormRow title="其它选项" grid last>*/}
          {/*  <Row gutter={16}>*/}
          {/*    <Col lg={8} md={10} sm={10} xs={24}>*/}
          {/*      <Form.Item {...formItemLayout} name="author" label="作者">*/}
          {/*        <Select*/}
          {/*          placeholder="不限"*/}
          {/*          style={{*/}
          {/*            maxWidth: 200,*/}
          {/*            width: '100%',*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          <Option value="lisa">王昭君</Option>*/}
          {/*        </Select>*/}
          {/*      </Form.Item>*/}
          {/*    </Col>*/}
          {/*    <Col lg={8} md={10} sm={10} xs={24}>*/}
          {/*      <Form.Item {...formItemLayout} name="rate" label="好评度">*/}
          {/*        <Select*/}
          {/*          placeholder="不限"*/}
          {/*          style={{*/}
          {/*            maxWidth: 200,*/}
          {/*            width: '100%',*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          <Option value="good">优秀</Option>*/}
          {/*          <Option value="normal">普通</Option>*/}
          {/*        </Select>*/}
          {/*      </Form.Item>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*</StandardFormRow>*/}
        {/*</Form>*/}
      </Card>
      <br/>
      <List
        rowKey="subjectId"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.subjectId} >

            <Card
              onClick={async () => {
                await page(item.subjectId);
              }}
              hoverable
              bodyStyle={{
                paddingBottom: 20,
              }}
              actions={[
                // <Tooltip key="se" title="设置">
                //   {/*<DownloadOutlined onClick="handleRouterPage" />*/}
                // </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined/>
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <ShareAltOutlined/>
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <EllipsisOutlined/>
                </Dropdown>,
              ]}

            >
              <Card.Meta avatar={<Avatar size="small" src={item.subjectPic}/>} title={item.subjectName}/>
              <div className={styles.cardItemContent}>
                <CardInfo
                  subjectSize={formatWan(item.subjectSize)}
                  // newUser={numeral(item.newUser).format('0,0')}
                  newUser={numeral(Math.round(Math.random()*80+20)).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>

        )}
      />
    </div>
  );
};
export default All;
