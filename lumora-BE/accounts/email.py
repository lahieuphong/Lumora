from django.conf import settings
from django.core.mail import EmailMultiAlternatives


def _otp_html(code: str, ttl: int) -> str:
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mã xác thực Lumora</title>
</head>
<body style="margin:0;padding:0;background:transparent;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:transparent;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0"
               style="background:#161a26;border-radius:16px;overflow:hidden;border:1px solid #2c3447;max-width:480px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d2433 0%,#161a26 100%);
                        padding:28px 40px 24px;border-bottom:1px solid #2c3447;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:14px;">
                    <!-- Logo mark — HTML fallback (data: URIs blocked by Gmail) -->
                    <table cellpadding="0" cellspacing="0"
                           style="width:52px;height:52px;background:#07111f;
                                  border-radius:12px;border:1px solid #2c3447;">
                      <tr>
                        <td align="center" valign="middle"
                            style="font-size:26px;font-weight:900;
                                   color:#f2d44e;line-height:1;
                                   font-family:'Segoe UI',Arial,sans-serif;">
                          L
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align:middle;text-align:left;">
                    <div style="font-size:22px;font-weight:800;letter-spacing:1.5px;
                                color:#ffffff;line-height:1.1;">LUMORA</div>
                    <div style="font-size:9px;font-weight:700;letter-spacing:2.5px;
                                color:#f2d44e;margin-top:3px;">AI LIVE WEBSITE PLATFORM</div>
                    <div style="font-size:10px;color:#8b92a3;margin-top:4px;letter-spacing:0.3px;">
                      Build Your Site. Go Live. Own Your Brand.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;font-weight:600;
                         letter-spacing:1px;color:#8b92a3;text-transform:uppercase;">
                Mã xác thực của bạn
              </p>
              <h1 style="margin:0 0 28px;font-size:26px;font-weight:800;color:#ffffff;">
                Xác minh danh tính
              </h1>

              <!-- OTP Box -->
              <div style="background:#1d2433;border:1.5px solid #f2d44e;border-radius:14px;
                          padding:28px 20px;margin:0 auto 28px;max-width:280px;">
                <p style="margin:0 0 10px;font-size:12px;color:#8b92a3;letter-spacing:0.5px;">
                  Mã OTP
                </p>
                <div style="font-size:48px;font-weight:900;letter-spacing:12px;
                            color:#f2d44e;line-height:1;">{code}</div>
              </div>

              <p style="margin:0 0 6px;font-size:14px;color:#d6dae3;line-height:1.6;">
                Mã có hiệu lực trong
                <strong style="color:#ffffff;">{ttl} phút</strong>.
              </p>
              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.5;">
                Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111520;padding:20px 40px;border-top:1px solid #2c3447;
                        text-align:center;">
              <p style="margin:0;font-size:11px;color:#4b5563;">
                © 2026 Lumora · AI Live Website Platform
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#374151;">
                Build Your Site. Go Live. Own Your Brand.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def deliver_otp(user, code: str) -> None:
    ttl = getattr(settings, 'OTP_TTL_MINUTES', 5)
    target = user.email
    plain = f'Mã OTP của bạn là: {code}. Mã có hiệu lực trong {ttl} phút.'

    print(f'[LUMORA OTP] {user.identifier} -> {code}')

    if not target:
        return

    msg = EmailMultiAlternatives(
        subject='Mã xác thực Lumora',
        body=plain,
        from_email=None,
        to=[target],
    )
    msg.attach_alternative(_otp_html(code, ttl), 'text/html')
    msg.send(fail_silently=True)
