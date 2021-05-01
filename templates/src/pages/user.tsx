import React, { FC, useState, useEffect, useContext, useReducer, useLayoutEffect } from 'react';
import styles from './index.less';
import { useRequest, Prompt, dropByCacheKey } from "umi";
import { Button } from 'antd-mobile';

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
}

const ThemeContext = React.createContext(themes.light);

function goBack(history: any): void {
  history.goBack();
}

function UserMain(props: any) {
  const { name, count } = props;
  const theme = useContext(ThemeContext);

return <h1 className={styles.title} style={{ background: theme.background, color: theme.foreground}}>user {name} {count}</h1>;
}

function reducer(state:{count:number}, action:{type:string, payload?:any}) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

const User = ({ location, history }: any) => {
  const [state, dispatch] = useReducer(reducer, {count: 0});
  const [count, setCount] = useState(() => {
    // const initialState = someExpensiveComputation(props);
    const initialState = 100;
    return initialState;
  });

  // useEffect分步执行 初始化时每个useEffect只会执行一次，更新会全部执行
  // 第二个参数为监听数组，可选参数，只有数组内的内容有改变时才会变化
  // tip: 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行
  useEffect(() => {
    // console.log(count)
    document.title = `You clicked ${count} times`;
  }, [count])
  // console.log('get:' + JSON.stringify(location.query));
  // console.log('post:' + JSON.stringify(location.params));
  // const { data } = useRequest('/api/users');
  // console.log(data)
  const [name, setName] = useState('yuhaihe');
  // useDebugValue(name);
  /**
   * useEffect Hook 可以看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
   */
  useEffect(() => {
    // 初次渲染与每次数据更新都会执行 componentDidMount + componentDidUpdate
    // console.log(name)
    // 返回函数将在组件卸载时再次调用一次，相当于componentDidUpdate + componentWillUnmount，执行顺序在主体内容之前
    return function leaveUser() {
      // console.log('leaveUser')
    }
  }, [name]);

  useEffect(() => {
    // console.log('come in')
    return () => {
      console.log('come out')
    }
  }, [])

  useLayoutEffect(() => {
    // console.log('useLayoutEffect')
  })
  return (
    <ThemeContext.Provider value={themes.dark}>
      {/* <Prompt message="你确定要离开么？" /> */}
      <UserMain name={name} count={count} />
      <Button onClick={() => goBack(history)}>goBack</Button>
      <Button onClick={() => setCount(count+1)}>{count}</Button>
      Count:{state.count}
      <Button onClick={() => dispatch({type:'increment'})}>+</Button>
      <Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
      <div id="title"></div>
    </ThemeContext.Provider>
  );
}

export default User;
