import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from "./App.jsx"

//app contains book -> pages -> photos
//Note: if you see the project rerender twice each time, its bc strictmode does that...
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

  </StrictMode>
)
