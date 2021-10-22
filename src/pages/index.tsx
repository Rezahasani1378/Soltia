import useServiceWorker from '@/hooks/useServiceWorker';
import { Provider } from 'react-redux';
import store from '@/redux';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Poppins, serif;
    color: #3c4859;
  }
`;

export default function IndexPage() {
  useServiceWorker()

  return (
    <Provider store={store}>
      <main>
        <GlobalStyle/>
      </main>
    </Provider>
  );
}
