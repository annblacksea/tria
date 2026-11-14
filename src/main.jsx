import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.jsx';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import 'normalize.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App className="" />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
