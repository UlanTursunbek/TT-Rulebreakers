import { Route, Routes } from 'react-router-dom'
import { AboutPage } from 'pages/AboutPage/AboutPage'
import { CartPage } from 'pages/CartPage/CartPage'
import { MainPage } from 'pages/Main/MainPage'

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage />} />
      <Route path={'/about/:id'} element={<AboutPage />} />
      <Route path={'/cart'} element={<CartPage />} />

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  )
}

export default App
