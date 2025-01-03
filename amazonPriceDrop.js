const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const axios = require('axios');
const fs= require('fs');
const {JSDOM}=require('jsdom');
const nodeMailer=require('nodemailer');
async function mailReport(productInfos){
  let html=`<li>`;
  for(productInfo of productInfos){
    html+=`<ul><strong>${productInfo[0]}:</strong> RRP: $${productInfo[2]}, Sale: -${productInfo[3]}%, Price: $${productInfo[1]}, <a href="amazon.com/dp/${productInfo[4]}">Link</a></ul>`;
  }

  html+='</li>';

  const transporter=nodeMailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port:587,
    secure:false,
    auth:{
      user:'smtp@mailtrap.io',
      pass:'ac1706243eccf4b788c25fb4ccb2b73f'
    }
  });

  let info = await transporter.sendMail({
    from: 'info@demomailtrap.com',
    to:'hieu.q.tran532@gmail.com',
    subject:`Report ${getDate()}`,
    text:'',
    html: html
  });

}

async function checkPriceDrop(productData,asin) {
  const newPrice=productData['product']['buybox_winner']['price']['value'];
  const oldPrice=JSON.parse(localStorage.getItem(asin))['product']['buybox_winner']['price']['value'];
  const productName=productData['product']['title'];
  if(newPrice<oldPrice){

    const html=`<p><strong>${productName}:</strong> Original Price: $${oldPrice}, <strong>NOW: $${newPrice}</strong>, <a href="amazon.com/dp/${asin}">Link</a></ul> </p>`;

    const transporter=nodeMailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port:587,
      secure:false,
      auth:{
        user:'smtp@mailtrap.io',
        pass:'ac1706243eccf4b788c25fb4ccb2b73f'
      }
    });
  
    let info = await transporter.sendMail({
      from: 'info@demomailtrap.com',
      to:'hieu.q.tran532@gmail.com',
      subject:`PRICE DROP`,
      text:'',
      html: html
    });
  }

  
}

async function getAmazonPrice(asin){
  const params = {
    api_key: "B66E6ECB3FD443F8B2075AAD943AAD08",
    type: "product",
    asin: asin,
    amazon_domain: "amazon.com"
  }
  try{
    const response= await axios.get('https://api.asindataapi.com/request', { params });

    if(localStorage.getItem(asin)!==null)
      checkPriceDrop(response.data,asin);

    localStorage.setItem(asin, JSON.stringify(response.data, 0, 2));

    const productName= response.data['product']['title'];
    const productPrice=response.data['product']['buybox_winner']['price']['value'];
    console.log(productPrice);
    let productRRP=0;
    try{
      productRRP=response.data['product']['buybox_winner']['rrp']['value'];
    }catch(e){
      productRRP=productPrice;
    }
    const productSalePercentage=100-Math.floor((productPrice/productRRP)*100);

    return [productName,productPrice,productRRP,productSalePercentage,asin];
    //console.log(JSON.stringify(response.data, 0, 2));
  }catch(e){
    console.log(e.message +"test"+asin);
  }

}
function getAmazonLinks(){
  try{
    const data= fs.readFileSync('input.txt','utf8');
    return data;
  }catch(e){
    console.log(e);
  }
}

function getDate(){
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

  return formattedDate;

}

module.exports={
  mailReport,
  getAmazonPrice,
  getAmazonLinks
}