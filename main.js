const {crawlPage}=require('./crawl.js')

function main(){
  crawlPage('https://www.amazon.com/');
  crawlPage('http://wagslane.dev/');
  crawlPage('https://www.amazon.com/peepeepoopoo');

  crawlPage('joijfijdijf.com');
  crawlPage('http://wagslane.dev/sitemap.xml');
}
main();
