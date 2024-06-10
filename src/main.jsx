import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextSharing from './ContextAPI/ContextSharing.jsx'
import TokenValidation from './ContextAPI/TokenValidation.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TokenValidation>
      <ContextSharing>
          <App />
      </ContextSharing>
    </TokenValidation>
  </React.StrictMode>,
)
