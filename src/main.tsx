import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { FundadoresApp } from './components/Fundadores/FundadoresApp';
import './index.css';
import './i18n/config';

const path = window.location.pathname;
const RootComponent = path.toLowerCase().startsWith('/fundadores') ? FundadoresApp : App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
);
