import { StrictMode } from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import App from "./App"

export function render(pathname: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
