import { log } from 'console';
import fs from 'fs';
import PDFDocument from 'pdfkit';

const lorem = 'Parabéns por adquirir um produto de excelente qualidade! É com grande satisfação que o Casarão das Películas lhe dá as boas-vindas à nossa família de clientes. Agradecemos por escolher nossos serviços e temos o prazer de informar que a garantia da sua película já está confirmada.Estamos comprometidos em oferecer não apenas produtos de alta qualidade, mas também um atendimento ao cliente excepcional. Se tiver alguma dúvida ou precisar de assistência adicional, não hesite em entrar em contato conosco. Obrigado por confiar no Casarão das Películas. Estamos ansiosos para servi-lo novamente no futuro.';
const h1Title = 'Dados da instalação';
const h2Title = 'Dados do cliente';
const textoGarantia = 'Este é um texto de exemplo para o retângulo cinza na parte inferior do documento. Você pode ajustar o conteúdo e o estilo conforme necessário Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..';
// Definindo a posição e tamanho do retângulo de fundo cinza
const rectX = 50; // Posição X do retângulo
const rectY = 610; // Posição Y do retângulo
const rectWidth = 495.28; // Largura do retângulo (largura da página A4 - margens)
const rectHeight = 190; // Altura do retângulo
let numeroGarantia;



///////////////////////////////////////TESTING FEATURE
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate-pdf', (req, res) => {
    // Aqui você pega os dados do formulário
    const { produto, marcaVeiculo, modelo, placa, periodoGarantia, dataIsnt, nomeCliente, telefoneCliente, emailCliente } = req.body;

    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream('nomedocliente.pdf'));
    doc.fontSize(12);

    doc.image('CasarãoHeader.jpg', 0, 0, { width: 595.28 });

    doc.fillColor('grey')
    .fontSize(12)
    .text(lorem, 80, 225, {
     align: 'center'
    });

    doc.fillColor('#dd2e38')
    .fontSize(18)
    .text(h1Title, 80, 360, {
     align: 'center',
    });

    // Use os dados do formulário para preencher o PDF
    doc.fontSize(12);
    doc.fillColor('black').fontSize(12).text(`Produto: ${produto}`, 55, 400);
    doc.fillColor('black').fontSize(12).text(`Placa: ${placa}`, 55, 440);
    doc.fillColor('black').fontSize(12).text(`Período de garantia: ${periodoGarantia}`, 240, 440);
    doc.fillColor('black').fontSize(12).text(`Data: ${dataIsnt}`, 430, 440)
    doc.fillColor('black').fontSize(12).text(`Marca: ${marcaVeiculo}`, 240, 400);
    doc.fillColor('black').fontSize(12).text(`Modelo: ${modelo}`, 430, 400);

    doc.fillColor('#dd2e38')
   .fontSize(18)
   .text(h2Title, 80, 475, {
     align: 'center',
   });
    
    doc.fillColor('black').fontSize(12).font('Helvetica').text(`Nome: ${nomeCliente}`, 55, 510);
    doc.fillColor('black').fontSize(12).font('Helvetica').text(`Email: ${emailCliente}`, 55, 550);
    doc.fillColor('black').fontSize(12).font('Helvetica').text(`Telefone: ${telefoneCliente}`, 55, 530);

    doc.fillColor('#353535')
    .fontSize(16)
    .text(numeroGarantia, 80, 580, {
     align: 'center',
    });

    doc.fillColor('#D3D3D3') // Cor cinza
    .rect(rectX, rectY, rectWidth, rectHeight)
    .fill();

    doc.fillColor('black') // Cor do texto
   .fontSize(12) // Tamanho da fonte
   .text(textoGarantia, rectX + 10, rectY + 10, { // Posicionando o texto dentro do retângulo com uma pequena margem
     width: rectWidth - 20, // Largura do texto (levando em conta a margem)
     align: 'left' // Alinhamento do texto

     
   });
 
    doc.end();

    // Enviar o PDF gerado como resposta
    res.setHeader('Content-Disposition', 'attachment; filename=nomedocliente.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

///////////////////////////////////TESTING FEATURE