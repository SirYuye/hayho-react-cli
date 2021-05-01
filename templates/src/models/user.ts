import { Effect, Reducer, Subscription } from 'umi';

export interface UserModelState {
  nickname: string;
  avatar: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

interface IdType {
  payload: string;
}
const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    nickname: '1217865@qq.com',
    avatar: 'www.baidu.com'
  },
  effects: {
    *query({ payload }, { call, put }) {
    },
  },
  reducers: {
    save(state, { payload }:IdType):any {
      state.nickname = payload
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};

export default UserModel;
