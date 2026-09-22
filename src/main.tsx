import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

const root = document.getElementById("root")!
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

if (root.hasChildNodes() && root.dataset.renderedPath !== "/404") {
  ReactDOM.hydrateRoot(root, app)
} else {
  // Development has no static body. The shared 404 cannot know the requested
  // URL, so let the client render its route-specific navigation and recovery.
  ReactDOM.createRoot(root).render(app)
}
