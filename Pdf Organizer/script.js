const fileInput = document.getElementById('fileInput');
const pdfList = document.getElementById('pdfList');
const pdfFiles = [];

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (let file of files) {
        if (file.type === "application/pdf") {
            const url = URL.createObjectURL(file);
            pdfFiles.push({ name: file.name, url: url });
            displayPDFs();
        } else {
            alert('Only PDF files are allowed!');
        }
    }
    fileInput.value = ''; // Reset input
});

function displayPDFs() {
    pdfList.innerHTML = '';
    pdfFiles.forEach((pdf, index) => {
        const div = document.createElement('div');
        div.className = 'pdf-item';

        const name = document.createElement('span');
        name.textContent = pdf.name;

        const openBtn = document.createElement('button');
        openBtn.textContent = 'Open';
        openBtn.onclick = () => {
            window.open(pdf.url, '_blank');
        };

        div.appendChild(name);
        div.appendChild(openBtn);
        pdfList.appendChild(div);
    });
}
