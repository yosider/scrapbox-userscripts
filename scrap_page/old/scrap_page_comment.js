// https://note103.hateblo.jp/entry/2018/11/23/080326

(() => {
    const PROJECT = 'universe';
    const title_indent = '';
    const quote_indent = '';
    const comment_indnet = ' ';

    const comment = window.prompt('Bookmark to Scrapbox');
    if (comment==null) return;  // cancelされた場合は何もしない
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
    if (comment) {
        lines.push(comment_indnet + comment);
    }
    const body = encodeURIComponent(lines.join('\n').concat('\n'));
    dt = new Date();
    date = encodeURIComponent(`${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`);
    window.open(`https://scrapbox.io/${PROJECT}/${date}?body=${title_indent}${body}`, 'BookmarkToScrapbox');
})();

`
javascript:(function(){var a=window.prompt("Bookmark to Scrapbox");if(null!=a){var b=["["+window.location.href+" "+document.title+"]"],d=window.getSelection().toString().trim();d&&(b=b.concat(d.split(/\n/g).filter(function(c){return""!==c}).map(function(c){return">"+c})));a&&b.push(" "+a);a=encodeURIComponent(b.join("\n").concat("\n"));dt=new Date;date=encodeURIComponent(dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate());window.open("https://scrapbox.io/universe/"+date+"?body="+a,"BookmarkToScrapbox")}})();
`