import React from 'react';
import  { history, Redirect } from 'umi';

export default (props:any) => {
  const isLogin:number = parseInt((Math.random() * 2).toString());

  if (true) {
    return <div>{ props.children }</div>;
  } else {
   return <Redirect to="/login" />
  }
}

