export async function getTweetInfo({tweetUrl} = {}) {
  if (!window.getTweetInfo) {
    alert('Please install "getTweetInfo" from https://scrapbox.io/api/code/programming-notes/URLからtweetを引用するUserScript/tamperMonkey.js'); 
    return;
  }
  try {
    const tweet = await window.getTweetInfo(`https://publish.twitter.com/oembed?url=${tweetUrl}`)
      .then(req => req.response);
    // 埋め込み用HTMLを解析する
    const dummy = document.createElement('div');
    dummy.insertAdjacentHTML('beforeend', tweet.html);
    //console.log(tweet.html);
    // <blockquote>を取得
    const blockquote =dummy.getElementsByTagName('blockquote')?.[0]; 
    // 要素に分解
    const [contentDOM, signatureDOM, dateDOM] = [...blockquote?.childNodes];
    // tweet本文をscrapbox記法に変換
    contentDOM?.getElementsByTagName('a')
      ?.forEach(link => link.innerHTML = `[${link.href} ${link.textContent}]`);
    contentDOM?.getElementsByTagName('br')
      ?.forEach(br => br.innerHTML =`\n`);
      
    // 各種情報を詰め込んで返す
    return {
      author: {
        name: tweet.author_name,
        url: tweet.author_url,
      },
      content: contentDOM?.textContent.split('\n'),
      signature: signatureDOM?.textContent,
      date : {
        href: dateDOM?.href,
        text: dateDOM?.textContent,
      },
    };
  } catch(e) {
    console.error(e);
  }
}