import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import {
  Link,
  history,
  useRequest,
  request,
  connect,
  ConnectProps,
  Loading,
  RequestConfig,
} from 'umi';
import { extend } from 'umi-request';
import { IndexModelState } from '@/models/index';
import * as UMI from 'umi';
import { Button } from 'antd-mobile';
import { UserModelState } from '@/models/user';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  user: UserModelState;
  loading: Loading;
}

function userEvent() {
  history.push({
    pathname: '/user',
    params: {
      a: 'b',
    },
    state: { fromDashboard: true },
  });
}

function updateName(dispatch: any) {
  dispatch!({
    type: 'index/save',
    payload: Math.random() * 100,
  });
}

async function getData() {
  const result: RequestConfig = await request('/api/users');
  // useRequest('/mock/users');
  // console.log(result)
}

const HomePage: FC<PageProps> = ({ index, dispatch, loading, user }) => {
  const { name ,list} = index;
  console.log('UMI');
  getData();
  return (
    <div>
      <h2 className={styles.title}>
        Hello <span className="red">{name}</span>
      </h2>
      {list.map(item => {
        return <div key={item} className={styles.item}>{item}</div>
      })}
      <div>
        <Link to="/user?a=2&b=3">get传参</Link>

        <Button type="primary" onClick={() => updateName(dispatch)}>
          dva
        </Button>
        <Button onClick={userEvent}>post传参</Button>
      </div>
    </div>
  );
};

export default connect(({ index, user, loading }: PageProps) => ({
  index,
  loading: loading.models.index,
  user,
}))(HomePage);
