import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { Suspense } from "react"
import Layout from "./components/layout/Layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Chats from "./pages/Chats/Chats"
import Hero from "./components/hero/Hero"
import { LoadingOverlay } from "@mantine/core"

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <LoadingOverlay
              visible={true}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 1 }}
              loaderProps={{ color: "blue", type: "dots", size: "lg" }}
            />
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Hero />} />
              <Route path="/chat" element={<Chats />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
