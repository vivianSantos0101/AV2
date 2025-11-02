// src/main.tsx
// (Baseado em)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // (Vamos manter o reset básico)
import { BrowserRouter } from 'react-router-dom'

// 1. Importar os NOVOS providers que criámos
import { StoreProvider } from './contexts/StoreContext.tsx'
import { SessionProvider } from './contexts/SessionContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Embrulhar a App com os NOVOS providers */}
      <StoreProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)