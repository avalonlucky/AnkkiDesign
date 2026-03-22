/**
 * Generate a JPEG thumbnail of page 1 of a PDF.
 * Uses window.pdfjsLib loaded via <script> tag in index.html (no webpack bundling issues).
 */
export async function generatePdfThumbnail(source, maxWidth = 400) {
  try {
    const lib = window.pdfjsLib;
    if (!lib) return null;

    let pdfData;
    if (source instanceof File) {
      pdfData = await source.arrayBuffer();
    } else {
      const resp = await fetch(source);
      pdfData = await resp.arrayBuffer();
    }

    const pdf = await lib.getDocument({ data: pdfData }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const scale = maxWidth / viewport.width;
    const scaled = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(scaled.width);
    canvas.height = Math.floor(scaled.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled }).promise;
    pdf.destroy();

    return canvas.toDataURL('image/jpeg', 0.85);
  } catch (err) {
    console.warn('[pdfThumb] failed:', err);
    return null;
  }
}
