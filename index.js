window.onload = function() {
  document.getElementById('btn-create').addEventListener('click', gerarQrCode);
  document.getElementById('btn-download').addEventListener('click', baixarPdf);
};


const imgCode = document.getElementById('img-code');

async function gerarQrCode() {
    const inputText = document.getElementById("inputUrl").value.trim();

    if (inputText === "") {
        alert('Digite um texto');
        imgCode.src = ""; // limpa imagem, sem reatribuir a constante
        imgCode.style.display = 'none';
         downloadBtn.style.display = 'none';

    } else {
        imgCode.style.display = 'block';
        imgCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputText)}`;
        const downloadBtn = document.getElementById('btn-download');
        downloadBtn.style.display = 'block';

    }
}

async function baixarPdf() {
    const inputText = document.getElementById("inputUrl").value.trim();
    const img = document.getElementById('img-code');

    if (!img.src || img.src === "") {
        alert('Primeiro gere um QR CODE');
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Texto do usuário
    pdf.setFontSize(14);
    pdf.text("Texto/URL inserido:", 15, 20);
    pdf.setFontSize(12);
    pdf.text(inputText, 15, 30);

    // QR Code
    pdf.text("QR Code gerado:", 15, 45);
    pdf.addImage(img, 'PNG', 15, 50, 100, 100);

    pdf.save("qr_code_com_texto.pdf");
}
