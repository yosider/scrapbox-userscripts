import {getTweetInfo} from '/api/code/programming-notes/URLからtweetを引用するUserScript/getTweetInfo.js';
// 複数のURLを含んだテキストをまとめて変換する
export async function convertWholeText(text,indent) {
  const tweetRegExp = /https:\/\/twitter\.com\S+\/status\/\d+(?:\?s=\d+)?/g;
  const urls = text.match(tweetRegExp) ?? [];
  if (urls.length === 0) return undefined;
  
  const tweets = (await Promise.all(urls.map(url => getTweetInfo({tweetUrl: url}))))
    .map(tweetInfo => convert({
      tweetInfo,
      indent,
    }));
  //console.log(tweets);
  let map = {};
  for (const originalUrl of urls) {
    const i = urls.indexOf(originalUrl);
    if (!tweets[i]) break;
    map[originalUrl]= tweets[i];
  }
  //console.log(map);
  const result = text.replace(tweetRegExp, match => map[match] ?? match);
  //console.log(result);
  return result;
}

function convert({tweetInfo, indent}) {
  let _content = tweetInfo.content.filter(text => text !== '');  // 空行を削除
  return [
  	// 本文: 各行に引用記法をつけてunpackする
  	//...tweetInfo.content.map(text => `${indent}>${text}`),
  	..._content.map(text => `${indent}>${text}`),
  	// 投稿者・リンク
    `${indent}>${tweetInfo.signature}[${tweetInfo.date.href} ${tweetInfo.date.text}]`
    ]
    .join('\n');  // 改行付きの文字列に変換
}