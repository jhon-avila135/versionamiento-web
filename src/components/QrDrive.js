import QRCode from 'qrcode';

/** Enlace público al resumen de comandos Git en Google Drive. */
export const URL_RESUMEN_GIT =
  'https://drive.google.com/file/d/1At-EQ5roT4oNDd-2cO3MwcqiRlnFGSYH/view?usp=sharing';

/**
 * Genera el código QR de una URL como SVG.
 */
export function generarQrSvg(url) {
  return QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' });
}

/**
 * Renderiza el QR y el enlace al resumen dentro del contenedor indicado.
 */
export async function renderQrDrive(contenedor, url = URL_RESUMEN_GIT) {
  if (!contenedor) return;
  const svg = await generarQrSvg(url);
  contenedor.innerHTML = `
    <figure class="qr-drive">
      <div class="qr-imagen" role="img" aria-label="Código QR que abre el resumen de comandos Git">${svg}</div>
      <figcaption>
        Escanea el código o abre el
        <a href="${url}" target="_blank" rel="noopener noreferrer">resumen de comandos Git</a>
        en Google Drive.
      </figcaption>
    </figure>
  `;
}
