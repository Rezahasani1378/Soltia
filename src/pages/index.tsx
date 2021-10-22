import useServiceWorker from '@/hooks/useServiceWorker';
import Navigation from '@/components/Navigation/Navigation';
import SearchBox from '@/components/Search/SearchBox';
import { Provider } from 'react-redux';
import store from '@/redux';
import {createGlobalStyle} from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <Navigation />
        <SearchBox />
        <ToastContainer />
      </main>
    </Provider>
  );
}
