import React from "react"
import ReactDOM from "react-dom/client"
import "@mantine/core/styles.css"
import "./index.css"
import App from "./App"
import { MantineProvider } from "@mantine/core"
import { Auth0Provider } from "@auth0/auth0-react"
import { Provider } from "react-redux"
import { store } from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const root = ReactDOM.createRoot(document.getElementById("root"))

const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          audience={process.env.REACT_APP_AUDIENCE}
          domain={process.env.REACT_APP_DOMAIN}
          clientId={process.env.REACT_APP_clientID}
          authorizationParams={{
            redirect_uri: process.env.REACT_APP_redirectURI,
          }}
          scope="openid profile email"
        >
          <MantineProvider>
            <App />
          </MantineProvider>
        </Auth0Provider>

      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
