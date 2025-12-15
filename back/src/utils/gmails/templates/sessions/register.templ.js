import env from '../../../../config/env.config.js';
import { images } from '../../../img.utils.js';

const register = async (data) => {

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
            <td style="padding:25px 30px;">
              <h3 style="margin:0 0 15px 0; color:#2c3e50; font-size:20px; text-align:center;">
                Detalles de tu cuenta
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                <tr><td style="padding:6px 0; font-weight:bold;">Usuario:</td><td>${data.name}</td></tr>
                <tr><td style="padding:6px 0; font-weight:bold;">Email:</td><td>${data.email}</td></tr>
                <tr><td style="padding:6px 0; font-weight:bold;">Identificador:</td><td>${data._id}</td></tr>
                <tr><td style="padding:6px 0; font-weight:bold;">Inicio de cuenta:</td><td>${new Date().toLocaleDateString()}</td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;">
              <hr style="border:0; border-top:1px solid #ddd; width:90%; margin:auto;">
            </td>
          </tr>

          <tr>
            <td style="padding:25px 40px; text-align:center;">
              <h2 style="margin:0; color:#333333; font-size:24px;">
                ¡Bienvenido a Groove Music!
              </h2>
              <p style="font-size:16px; color:#555555; line-height:1.6; margin:15px 0 25px;">
                Groove Music es una plataforma para <strong>escuchar música</strong> de forma simple y centralizada.
                <br><br>
                Al registrarte, podés <strong>ingresar tus propias playlists de YouTube</strong> y reproducirlas
                directamente desde nuestra plataforma, manteniendo toda tu música en un solo lugar.
                <br><br>
                Organizá tus playlists, descubrí nueva música y disfrutá de una experiencia pensada para vos.
              </p>

              <a href="${address}"
                style="background-color:#1B263B; color:#ffffff; text-decoration:none; padding:14px 28px;
                border-radius:6px; font-size:16px; font-family:Arial, Helvetica, sans-serif; display:inline-block;">
                Ir a mi cuenta
              </a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:25px 20px 10px 20px; color:#999; font-size:13px;">
              <p style="margin:0;">
                © ${new Date().getFullYear()} Groove Music · Plataforma para escuchar música.<br>
                Desarrollado por FARADAY'S House ·
                <a href="${address}" style="color:#1B263B; text-decoration:none;">
                  ${address}
                </a>
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

export { register };