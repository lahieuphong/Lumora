import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Brand from '../components/Brand'
import { EyeIcon, EyeOffIcon } from '../components/icons'
import { authApi, tokens } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
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
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }
    setLoading(true)
    try {
      const { data } = await authApi.register({
        full_name: fullName.trim(),
        identifier: identifier.trim(),
        password,
      })
      tokens.set(data)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Đăng ký không thành công. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Brand />
      <h1 className="auth-title">Đăng ký</h1>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="field">
          <label htmlFor="fullName">Họ và tên</label>
          <div className="input-wrap">
            <input
              id="fullName"
              type="text"
              placeholder="Nhập họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

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
              autoComplete="new-password"
            />
            <button type="button" className="toggle-eye" onClick={() => setShowPw((v) => !v)} aria-label="Hiện/ẩn mật khẩu">
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </button>

        <p className="auth-foot">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
