


async function processEnumerate() {
    const pdfInput = document.getElementById('pdfInput').files[0];
    const fontSize = Number(document.getElementById('fontSize').value);

    if (!pdfInput || !fontSize) {
        alert('Please select a PDF and provide font size');
        return;
    }

    const pdfBytes = await pdfInput.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

    const pages = pdfDoc.getPages();

    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    const { width, height } = pages[0].getSize();

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        const pageNumber = `${i + 1}`
        
        page.drawText(pageNumber, {
            x: (width - 2 * fontSize) / 2,
            y: height / 2 - fontSize / 2,
            size: fontSize,
            font,
            color: PDFLib.rgb(0, 0, 0),
            opacity: 0.35,
        });
    }

    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = `${pdfInput.name} (enumerated).pdf`;
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download Modified PDF';
}

document.getElementById('processBtn').addEventListener('click', processEnumerate)
