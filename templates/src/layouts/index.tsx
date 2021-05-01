import { IRouteComponentProps, KeepAliveLayout, KeepAlive } from 'umi'
import React, { useState } from 'react';

export default function Layout(props: IRouteComponentProps) {
  const [state, setState] = useState({});
  const { children, location, route, history, match } = props;
  // if (location.pathname === '/login') {
  //   return <SimpleLayout>{ props.children }</SimpleLayout>
  // }

  return <div id="app">
    <KeepAliveLayout {...props}>{children}</KeepAliveLayout>
  </div>
}

