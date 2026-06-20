import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Brand from '../components/Brand'
import { authApi } from '../services/api'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!identifier) {
      setError('Vui lòng nhập email hoặc số điện thoại.')
      return
    }
    setLoading(true)
    try {
      await authApi.forgotPassword(identifier.trim())
      navigate('/verify-otp', { state: { identifier: identifier.trim() } })
    } catch (err) {
      setError(err?.response?.data?.detail || 'Không thể gửi mã OTP. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Brand />
      <h1 className="auth-title">Quên mật khẩu</h1>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="field">
          <label htmlFor="identifier">Email hoặc số điện thoại</label>
          <div className="input-wrap">
            <input
              id="identifier"
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
            />
          </div>
        </div>

        <p className="auth-desc">
          Chúng tôi sẽ gửi mã OTP về email hoặc số điện thoại của bạn
        </p>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi OTP'}
        </button>
      </form>
    </AuthLayout>
  )
}
