import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Brand from '../components/Brand'
import { EyeIcon, EyeOffIcon } from '../components/icons'
import { authApi, tokens } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!identifier || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.')
      return
    }
    setLoading(true)
    try {
      const { data } = await authApi.login(identifier.trim(), password)
      tokens.set(data)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Email/số điện thoại hoặc mật khẩu không đúng.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Brand />
      <h1 className="auth-title">Đăng nhập</h1>

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

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="Nhập password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-eye"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="row-end">
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <p className="auth-foot">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
