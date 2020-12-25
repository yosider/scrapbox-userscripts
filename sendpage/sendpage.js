export function sendPage(targetProjectName, targetUserName, publicTag, privateTag, image){
    scrapbox.PageMenu.addMenu({
        title: `send to ${targetProjectName}`,
        image: image,
        onClick: async () => {
            let projectName = scrapbox.Project.name;
            let pageTitle = scrapbox.Page.title;
            let urlFrom = `https://scrapbox.io/api/pages/${projectName}/${pageTitle}`;
            let response = await fetch(urlFrom);
            let json = await response.json();
            // ページにprivateTagがついている場合はエラー
            if (privateTag && json.links.includes(privateTag)) {
                let msg = `This page contains #${privateTag}!\nAborted.`;
                alert(msg);
                throw new Error(msg);
            }
            // ページに既にpublicTagがついている場合、その行を消してから送る
            if (publicTag) { json.lines = json.lines.filter(line => line.text!=`#${publicTag}`); }
            let jsonExport = {
                name: targetProjectName,
                displayName: targetUserName,
                exported: new Date().getTime(),
                pages: [json],
            };
            let formdata = new FormData();
            let blob = new Blob([JSON.stringify(jsonExport)], { type: 'application/json' });
            formdata.append('import-file', blob);
            let _ = await fetch(`https://scrapbox.io/api/page-data/import/${targetProjectName}.json`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': window._csrf },
                body: formdata,
            });
            // 出力先ページを開く
            window.open(`https://scrapbox.io/${targetProjectName}/${pageTitle}`);
            // 出力元ページにpublicTagが付いていなければ付ける
            if (publicTag && !json.links.includes(publicTag)) {
                let body = encodeURIComponent(`#${publicTag}\n`);
                window.open(`https://scrapbox.io/${projectName}/${pageTitle}?body=${body}`, "_self");
            }
        },
    });
}