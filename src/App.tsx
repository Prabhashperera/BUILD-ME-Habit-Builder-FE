import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import HabitsPage from "./pages/HabitsPage";

function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}  // close automatically after 3s
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/habits" element={<HabitsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
