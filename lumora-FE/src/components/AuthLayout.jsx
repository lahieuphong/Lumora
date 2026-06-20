import illustration from '../assets/illustration.svg'

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-topbar">Đăng nhập</div>
      <div className="auth-panel">
        <div className="auth-content">
          <div className="auth-illustration">
            <img src={illustration} alt="Lumora platform" />
          </div>
          <div className="auth-form-col">{children}</div>
        </div>
      </div>
    </div>
  )
}
