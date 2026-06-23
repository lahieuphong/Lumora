import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import Brand from '../components/Brand'
import { RefreshIcon } from '../components/icons'
import { authApi } from '../services/api'

const LENGTH = 4

export default function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()
  const identifier = location.state?.identifier || ''

  const [digits, setDigits] = useState(Array(LENGTH).fill(''))
  const [seconds, setSeconds] = useState(45)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputs = useRef([])

  useEffect(() => {
    if (!identifier) navigate('/forgot-password', { replace: true })
  }, [identifier, navigate])

  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [seconds])

  const setDigit = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < LENGTH - 1) inputs.current[i + 1]?.focus()
  }

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs.current[i - 1]?.focus()
  }

  const onPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH)
    if (!text) return
    e.preventDefault()
    const next = Array(LENGTH).fill('')
    text.split('').forEach((c, idx) => (next[idx] = c))
    setDigits(next)
    inputs.current[Math.min(text.length, LENGTH - 1)]?.focus()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const code = digits.join('')
    if (code.length < LENGTH) {
      setError('Vui lòng nhập đủ 4 chữ số.')
      return
    }
    setLoading(true)
    try {
      const { data } = await authApi.verifyOtp(identifier, code)
      navigate('/reset-password', { state: { reset_token: data.reset_token } })
    } catch (err) {
      setError(err?.response?.data?.detail || 'Mã OTP không đúng hoặc đã hết hạn.')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    if (seconds > 0) return
    setError('')
    try {
      await authApi.forgotPassword(identifier)
      setSeconds(45)
      setDigits(Array(LENGTH).fill(''))
      inputs.current[0]?.focus()
    } catch {
      setError('Không thể gửi lại mã. Vui lòng thử lại.')
    }
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <AuthLayout>
      <Brand />
      <h1 className="auth-title">Nhập mã OTP</h1>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <p className="auth-desc">
          Nhập mã xác thực được gửi vào<br />
          {identifier || 'email của bạn'}
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="otp-row" onPaste={onPaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              className="otp-box"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              aria-label={`Chữ số ${i + 1}`}
            />
          ))}
        </div>

        <p className="otp-ttl-hint">Mã có hiệu lực trong <strong>5 phút</strong>.</p>

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Đang xác thực...' : 'Xác thực'}
        </button>

        <div className="resend">
          <button type="button" onClick={resend} disabled={seconds > 0}>
            <RefreshIcon /> Gửi lại mã
          </button>
          {seconds > 0 && <span className="count">({mm}:{ss})</span>}
        </div>
      </form>
    </AuthLayout>
  )
}
