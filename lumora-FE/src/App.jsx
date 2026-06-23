import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerifyOtp'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Sites from './pages/Sites'
import Live from './pages/Live'
import Leads from './pages/Leads'
import Members from './pages/Members'
import Billing from './pages/Billing'
import { isAuthed } from './services/api'

function Protected({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/sites"
          element={
            <Protected>
              <Sites />
            </Protected>
          }
        />
        <Route
          path="/live"
          element={
            <Protected>
              <Live />
            </Protected>
          }
        />
        <Route
          path="/leads"
          element={
            <Protected>
              <Leads />
            </Protected>
          }
        />
        <Route
          path="/members"
          element={
            <Protected>
              <Members />
            </Protected>
          }
        />
        <Route
          path="/billing"
          element={
            <Protected>
              <Billing />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
