import useServiceWorker from '@/hooks/useServiceWorker';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Poppins, serif;
    color: #3c4859;
  }
`;

export default function IndexPage() {
  useServiceWorker()

  return (
    <main>
      <GlobalStyle />
    </main>
  );
}
