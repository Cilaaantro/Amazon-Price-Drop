const cron = require('node-cron');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const {mailReport, notifyPriceDrop, getAmazonLinks, getAmazonPrice}=require('./amazonPriceDrop.js');

async function main(){
  const products=getAmazonLinks().split('\n');
  const asins=products.map(product=>product.slice(product.indexOf('dp/B0')+3,product.indexOf('dp/B0')+13));
  const productInfos=[];
  for(asin of asins){
    productInfos.push(await getAmazonPrice(asin));
  }
  mailReport(productInfos);


  
}



function create_cron_dataTime(seconds,minuate,hour,day_of_the_month,month,day_of_the_week){
  return seconds +" "+minuate+" "+ hour + " " + day_of_the_month + " " + month+ " " + day_of_the_week; 
}

cron.schedule(
  create_cron_dataTime('0','*','*','*','*','*'),()=>{
    main();
  }
)



