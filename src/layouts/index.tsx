import useServiceWorker from '@/hooks/useServiceWorker'
import store from '@/redux';
import React from 'react'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Poppins, serif;
    color: #3c4859;
  }
`;

export default (props: {children: React.ReactElement<any, React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal}) => {
  useServiceWorker()

  return (
    <Provider store={store}>
      <main>
        <GlobalStyle/>
        <ToastContainer />
        {props.children}
      </main>
    </Provider>
  )
}
