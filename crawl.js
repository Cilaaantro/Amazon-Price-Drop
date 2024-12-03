const {JSDOM}=require('jsdom');

const normalizeUrl=(urlString)=>{
  const url= new URL(urlString);
  const hostPath= `${url.hostname}${url.pathname}`;
  if(hostPath.length>0&&hostPath.slice(-1)==='/')
    return hostPath.slice(0,-1);
  return hostPath;
}


const getURLsFromHTML= (htmlBody, baseUrlString)=>{
  const urls=[];
  const dom=new JSDOM(htmlBody);
  const linkElements=dom.window.document.querySelectorAll('a');
  for(linkElement of linkElements){
    if(linkElement.href.slice(0,1)==='/'){
      //relative
      try{
        const urlObj= new URL(`${baseUrlString}${linkElement.href}`)
        urls.push(urlObj.href);
      }catch(e){
        //nothing
      }
    }else{
      //absolute
      try{
        const urlObj= new URL(linkElement.href)
        urls.push(urlObj.href);
      }catch(e){
        //nothing
      }
    }
      
  }
  return urls;
}

module.exports={
  normalizeUrl,
  getURLsFromHTML
}