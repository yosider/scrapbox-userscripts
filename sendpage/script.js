export function sendPage(
    targetProjectName,  // 送り先プロジェクトの(URL上の)名前
    targetUserName,  // 送り先プロジェクトのユーザーの表示名
    privateTag,  // 非公開のページに付けるタグ(#は除く, 不要なら'')
    image,  // アイコン画像URL
    link_to = true,  // 送り元ページに送り先へのリンクをつけるか(sent to [$target])
    link_from = false,  // 送り先ページに送り元へのリンクをつけるか(from [$src])
) {
    scrapbox.PageMenu.addMenu({
        title: `send to ${targetProjectName}`,
        image: image,
        onClick: async () => {
            const pageTitle = scrapbox.Page.title;
            const srcPage = `/${scrapbox.Project.name}/${pageTitle}`;
            const encSrcPage = `/${scrapbox.Project.name}/${encodeURIComponent(pageTitle)}`;
            const targetPage = `/${targetProjectName}/${pageTitle}`;
            const encTargetPage = `/${targetProjectName}/${encodeURIComponent(pageTitle)}`;
            const srcUrl = `https://scrapbox.io/api/pages${encSrcPage}`;
            const response = await fetch(srcUrl);
            let json = await response.json();

            // ページにprivateTagがついている場合はエラー
            if (privateTag && json.links.includes(privateTag)) {
                const msg = `This page contains #${privateTag}!\nAborted.`;
                alert(msg);
                throw new Error(msg);
            }
            // 送り先ページへのリンクを含む行があれば消してから送る
            const len = json.lines.length;  // 送り先ページへのリンクの有無の判定に使う
            json.lines = json.lines.filter(line => !line.text.includes(`[${targetPage}]`));
            const jsonExport = {
                name: targetProjectName,
                displayName: targetUserName,
                exported: new Date().getTime(),
                pages: [json],
            };
            let formdata = new FormData();
            formdata.append(
                'import-file',
                new Blob([JSON.stringify(jsonExport)], { type: 'application/json' })
            );
            const _ = await fetch(`https://scrapbox.io/api/page-data/import/${targetProjectName}.json`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': window._csrf },
                body: formdata,
            });
            // 送り先ページを開く
            // 送り元ページへのリンクが必要ならつける
            if (link_from) {
                window.open(`https://scrapbox.io${encTargetPage}?body=${encodeURIComponent(`from [${srcPage}]\n`)}`);
            } else {
                window.open(`https://scrapbox.io${encTargetPage}`);
            }
            // 送り先ページへのリンクが必要ならつける
            if (link_to && len == json.lines.length) {  // リンクの行を消す前と行数が同じならリンクが無いとする
                window.open(`https://scrapbox.io${encSrcPage}?body=${encodeURIComponent(`sent to [${targetPage}]\n`)}`, "_self");
            }
        },
    });
}