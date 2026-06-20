import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Brand from '../components/Brand'
import { EyeIcon, EyeOffIcon } from '../components/icons'
import { authApi } from '../services/api'

export default function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const reset_token = location.state?.reset_token || ''

  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (pw.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }
    if (pw !== confirm) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    setLoading(true)
    try {
      await authApi.resetPassword(reset_token, pw)
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (err) {
      setError(err?.response?.data?.detail || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Brand />
      <h1 className="auth-title">Tạo mật khẩu mới</h1>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {done && <div className="alert alert-success">Đặt lại mật khẩu thành công! Đang chuyển về trang đăng nhập…</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="field">
          <label htmlFor="pw">Mật khẩu</label>
          <div className="input-wrap">
            <input
              id="pw"
              type={showPw ? 'text' : 'password'}
              placeholder="Nhập mật khẩu mới"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="new-password"
            />
            <button type="button" className="toggle-eye" onClick={() => setShowPw((v) => !v)} aria-label="Hiện/ẩn mật khẩu">
              {showPw ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="field">
          <label htmlFor="confirm">Xác nhận mật khẩu</label>
          <div className="input-wrap">
            <input
              id="confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Nhập lại mật khẩu mới"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
            <button type="button" className="toggle-eye" onClick={() => setShowConfirm((v) => !v)} aria-label="Hiện/ẩn mật khẩu">
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <button className="btn-primary" type="submit" disabled={loading || done}>
          {loading ? 'Đang xử lý...' : 'Xác nhận'}
        </button>
      </form>
    </AuthLayout>
  )
}
