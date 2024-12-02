const {normalizeUrl} = require("./crawl.js");
const {test, expect}= require("@jest/globals");
console.log('hi');
test('normalizeURL',()=>{
  const input='https://blog.boot.dev/path/';
  //const actual= normalizeUrl(input);
  const expected ='blog.boot.dev/path';
  expect(input).toEqual(expected);
})

