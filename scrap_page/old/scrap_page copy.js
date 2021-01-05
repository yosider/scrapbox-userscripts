// https://note103.hateblo.jp/entry/2018/11/23/080326

(() => {
    var comment = window.prompt('Bookmark to Scrapbox');
    var lines = [`[${window.location.href} ${document.title}]`];  // 1行目はタイトル付きリンク
    var quote = window.getSelection().toString();  // 選択範囲の文字列を取得
    if (quote.trim()) {
        lines = lines.concat(
            quote
            .split(/\n/g)  // 改行を削除？
            .map(line => { if (line !== '') { return ' >' + line } })  // indent + 引用記号
            )
    };
    var lines2 = [];
    // filter?
    for (var i = 0; i < lines.length; ++i) { if (lines[i] !== undefined) { lines2.push(lines[i]); } }
    lines2.push('');
    var body = encodeURIComponent(lines2.join('\n '));
    dt = new Date();
    dtm = dt.getMonth() + 1;
    dtd = dt.getDate();
    date = `${dt.getFullYear()}/${dtm}/${dtd}`;
    if (comment == '[' + document.title + ' ' + window.location.href + ']') { comment = ''; };
    if (comment == '' && quote == '') {
        body = encodeURIComponent(lines2.join(' '));
    }
    else if (comment == '') { }
    else { body = body + ' ' + comment };
    window.open('https://scrapbox.io/universe/' + date + '?body= ' + body);
})();
