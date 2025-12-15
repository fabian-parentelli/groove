import env from '../../../../config/env.config.js';
import { images } from '../../../img.utils.js';

const login = async (data) => {

  const user = data.name || 'usuario';
  const ua = filterUserAgent(data.userAgent || {});
  const date = new Date().toLocaleString();
  const address = env.frontUrl;

  return `
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7; padding:40px 0;">
    <tr>
      <td>
        <table align="center" width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:10px; font-family:Arial, Helvetica, sans-serif; color:#333333; box-shadow:0 2px 10px rgba(0,0,0,0.1); overflow:hidden;">

          <tr>
            <td>
              <img src="${images.emailheader}" width="600" height="180" alt="Header"
                style="display:block; width:100%; height:auto; border-radius:10px 10px 0 0;">
            </td>
          </tr>

          <tr>
            <td style="padding:30px 40px; text-align:left;">
              <h2 style="margin:0 0 15px 0; color:#2c3e50; font-size:22px; text-align:center;">
                Nuevo inicio de sesión detectado
              </h2>

              <p style="font-size:16px; line-height:1.6; color:#555;">
                Hola <strong>${user}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6; color:#555;">
                Detectamos un nuevo inicio de sesión en tu cuenta de <strong>Groove Music</strong> el día <strong>${date}</strong>.
              </p>

              <div style="background-color:#F7F7F7; border-radius:8px; padding:15px; margin:20px 0; font-size:14px;">
                <strong>Detalles del dispositivo:</strong><br>
                ${Object.entries(ua).map(([k, v]) => `• ${k}: ${v}`).join('<br>')}
              </div>

              <p style="font-size:15px; line-height:1.6; color:#555;">
                Si fuiste vos, no necesitás hacer nada.<br>
                Si no reconocés este acceso, por favor <strong>denuncialo</strong> o contactá a nuestro soporte inmediatamente.
              </p>

              <div style="text-align:center; margin:40px 0;">
                <a href="${env.BackUrl}/api/session/report/${data._id}" target="_blank"
                  style="background-color:#B22222; color:#ffffff; text-decoration:none; padding:14px 28px;
                  border-radius:6px; font-size:16px; display:inline-block; margin-right:10px;">
                  Denunciar acceso
                </a>

                <a href="${address}/contact" target="_blank"
                  style="background-color:#1B263B; color:#ffffff; text-decoration:none; padding:14px 28px;
                  border-radius:6px; font-size:16px; display:inline-block;">
                  Contactar soporte
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:25px 20px 10px 20px; color:#999; font-size:13px;">
              <p style="margin:0;">
                © ${new Date().getFullYear()} Groove Music · Una plataforma para escuchar música.<br>
                Desarrollado por FARADAY'S HOUSE ·
                <a href="${address}" style="color:#1B263B; text-decoration:none;">${address}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <img src="${images.emailFooter}" width="600" height="100" alt="Footer"
                style="display:block; width:100%; height:auto; border-radius:0 0 10px 10px;">
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  `;
};

export { login };

function filterUserAgent(userAgent) {
  return Object.fromEntries(
    Object.entries(userAgent).filter(([_, value]) => {
      if (value === false || value === undefined || value === null) return false;
      if (typeof value === 'string' && (value.trim() === '' || value === 'Unknown')) return false;
      return true;
    })
  );
};