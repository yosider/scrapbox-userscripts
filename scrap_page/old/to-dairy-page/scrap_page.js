// https://note103.hateblo.jp/entry/2018/11/23/080326

(() => {
    const PROJECT = 'universe';
    const title_indent = '';
    const quote_indent = '';

    let lines = [`[${window.location.href} ${document.title}]`];  // 1行目はタイトル付きリンク
    const quote = window.getSelection().toString().trim();  // 選択範囲の文字列を取得
    if (quote) {
        lines = lines.concat(
            quote
            .split(/\n/g)  // 改行区切りで配列化
            .filter(line => line !== '')
            .map(line => quote_indent + '>' + line)  // indent追加 + 引用記号
            );
    }
    const body = encodeURIComponent(lines.join('\n').concat('\n'));
    dt = new Date();
    date = encodeURIComponent(`${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`);
    window.open(`https://scrapbox.io/${PROJECT}/${date}?body=${title_indent}${body}`, '_self');
})();

`
javascript:(function(){var a=["["+window.location.href+" "+document.title+"]"],c=window.getSelection().toString().trim();c&&(a=a.concat(c.split(/\n/g).filter(function(b){return""!==b}).map(function(b){return">"+b})));a=encodeURIComponent(a.join("\n").concat("\n"));dt=new Date;date=encodeURIComponent(dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate());window.open("https://scrapbox.io/universe/"+date+"?body="+a)})();
`