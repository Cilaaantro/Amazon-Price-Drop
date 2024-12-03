const {normalizeUrl,getURLsFromHTML} = require("./crawl.js");
const {test, expect}= require("@jest/globals");
console.log('hi');
test('normalizeURL',()=>{
  const input='https://blog.boot.dev/path/';
  const actual= normalizeUrl(input);
  const expected ='blog.boot.dev/path';
  expect(actual).toEqual(expected);
})

test('getUrl',()=>{
  const input=`<html>
    <body>
      <a href="/path/">
        Boot Blog
      </a>
    </body>
  </html>`;
  const inputBaseURL="https://blog.boot.dev"
  const actual= getURLsFromHTML(input,inputBaseURL);
  const expected =['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
})

test('getUrls',()=>{
  const input=`<html>
    <body>
      <a href="/path1/">
        Boot Blog
      </a>
      <a href="https://blog.boot.dev/path2/">
        Boot Blog
      </a>
    </body>
  </html>`;
  const inputBaseURL="https://blog.boot.dev"
  const actual= getURLsFromHTML(input,inputBaseURL);
  const expected =['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/'];
  expect(actual).toEqual(expected);
})
test('getUrl error',()=>{
  const input=`<html>
    <body>
      <a href="qweojiwqijoe">
        Boot Blog
      </a>
    </body>
  </html>`;
  const inputBaseURL="https://blog.boot.dev"
  const actual= getURLsFromHTML(input,inputBaseURL);
  const expected =[];
  expect(actual).toEqual(expected);
})

