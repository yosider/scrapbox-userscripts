// cf.
// https://note103.hateblo.jp/entry/2018/11/23/080326

(() => {
    const PROJECT = 'universe';  // Scrapboxプロジェクト
    const TAG = 'scrapocket';  // Scrapboxのページに付けるタグ

    const title = document.title;
    let lines = [];
    const quote = window.getSelection().toString().trim();  // 選択範囲の文字列を取得
    if (quote) {
        lines = lines.concat(
            quote
                .split(/\n/g)  // 改行区切りで配列化
                .filter(line => line !== '')  // 空行は削除
                .map(line => '>' + line)  // 引用記号
        );
        lines.push('');  // 空行
    }
    lines = lines.concat([
        title,  // 保存するページのタイトル
        window.location.href,  // 保存するページのリンク
        '',
        '',
        `#${TAG}`,
        '',
    ]);
    const body = encodeURIComponent(lines.join('\n'));
    window.open(`https://scrapbox.io/${PROJECT}/${title}?body=${body}`, '_self');
})();

// bookmarklet
`
javascript:(function(){var c=document.title,a=[],d=window.getSelection().toString().trim();d&&(a=a.concat(d.split(/\n/g).filter(function(b){return""!==b}).map(function(b){return">"+b})),a.push(""));a=a.concat([c,window.location.href,"","","#scrapocket",""]);a=encodeURIComponent(a.join("\n"));window.open("https://scrapbox.io/universe/"+c+"?body="+a,"_self")})();
`