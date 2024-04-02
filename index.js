import fs from 'fs';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument({ size: 'A4' });

doc.pipe(fs.createWriteStream('nomedocliente.pdf'));

doc.fontSize(12);

doc.image('CasarãoHeader.jpg', 0, 0, { width: 595.28 });

//preenchimento teste
let produto = "Película Color Stable 3M";
let marcaVeiculo = "Toyota";
let modelo = "Corolla";
let placa = "XYZ-1234";
let periodoGarantia = "12 meses";
let dataIsnt = "01/04/2024";

//dados cliente teste
let nomeCliente = "João da Silva";
let telefoneCliente = "(11) 98765-4321";
let emailCliente = "joao.silva@email.com";

//Numero garantia
let numeroGarantia = '2024-00001';


const h1Title = 'Dados da instalação';
const h2Title = 'Dados do cliente';

const lorem = 'Parabéns por adquirir um produto de excelente qualidade! É com grande satisfação que o Casarão das Películas lhe dá as boas-vindas à nossa família de clientes. Agradecemos por escolher nossos serviços e temos o prazer de informar que a garantia da sua película já está confirmada.Estamos comprometidos em oferecer não apenas produtos de alta qualidade, mas também um atendimento ao cliente excepcional. Se tiver alguma dúvida ou precisar de assistência adicional, não hesite em entrar em contato conosco. Obrigado por confiar no Casarão das Películas. Estamos ansiosos para servi-lo novamente no futuro.';

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

// Definindo a fonte em negrito para os rótulos
doc.font('Helvetica-Bold');

// Primeira linha
doc.fillColor('black').fontSize(12).text("Produto:", 55, 400);
doc.fillColor('black').fontSize(12).text("Marca do veículo:", 240, 400);
doc.fillColor('black').fontSize(12).text("Modelo:", 430, 400);

// Mudando para a fonte normal para os valores
doc.font('Helvetica');

// Espaço para variáveis na primeira linha
doc.fillColor('black').fontSize(12).text(produto, 105, 400);
doc.fillColor('black').fontSize(12).text(marcaVeiculo, 345, 400);
doc.fillColor('black').fontSize(12).text(modelo, 480, 400);

// Segunda linha - Aumentei o espaço entre as linhas
// Voltando para a fonte em negrito para os rótulos
doc.font('Helvetica-Bold');

doc.fillColor('black').fontSize(12).text("Placa:", 55, 440);
doc.fillColor('black').fontSize(12).text("Período de garantia:", 240, 440);
doc.fillColor('black').fontSize(12).text("Data:", 430, 440);


// Mudando para a fonte normal para os valores
doc.font('Helvetica');

doc.fillColor('black').fontSize(12).text(placa, 90, 440);
doc.fillColor('black').fontSize(12).text(periodoGarantia, 355, 440);
doc.fillColor('black').fontSize(12).text(dataIsnt, 460, 440)

doc.fillColor('#dd2e38')
   .fontSize(18)
   .text(h2Title, 80, 475, {
     align: 'center',
   });

// Dados do cliente
doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text("Nome:", 55, 510);
doc.fillColor('black').fontSize(12).font('Helvetica').text(nomeCliente, 95, 510);

doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text("Telefone:", 55, 530);
doc.fillColor('black').fontSize(12).font('Helvetica').text(telefoneCliente, 114, 530);

doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text("Email:", 55, 550);
doc.fillColor('black').fontSize(12).font('Helvetica').text(emailCliente, 95, 550);

doc.fillColor('#353535')
   .fontSize(16)
   .text(numeroGarantia, 80, 580, {
     align: 'center',
   });



// Definindo a posição e tamanho do retângulo de fundo cinza
const rectX = 50; // Posição X do retângulo
const rectY = 610; // Posição Y do retângulo
const rectWidth = 495.28; // Largura do retângulo (largura da página A4 - margens)
const rectHeight = 190; // Altura do retângulo

// Desenhando o retângulo com cor de preenchimento cinza
doc.fillColor('#D3D3D3') // Cor cinza
   .rect(rectX, rectY, rectWidth, rectHeight)
   .fill();

// Adicionando o texto sobre o retângulo cinza
const loremText = 'Este é um texto de exemplo para o retângulo cinza na parte inferior do documento. Você pode ajustar o conteúdo e o estilo conforme necessário Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..';
doc.fillColor('black') // Cor do texto
   .fontSize(12) // Tamanho da fonte
   .text(loremText, rectX + 10, rectY + 10, { // Posicionando o texto dentro do retângulo com uma pequena margem
     width: rectWidth - 20, // Largura do texto (levando em conta a margem)
     align: 'left' // Alinhamento do texto
   });

doc.end();
