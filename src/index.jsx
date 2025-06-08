import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from "./App.jsx"

//app contains book -> pages -> photos
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h2>In main</h2>
    <App />

  </StrictMode>
)
