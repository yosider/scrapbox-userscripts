export function sendPage(targetProjectName, targetUserName, privateTag, image) {
    scrapbox.PageMenu.addMenu({
        title: `send to ${targetProjectName}`,
        image: image,
        onClick: async () => {
            const projectName = scrapbox.Project.name;
            const pageTitle = scrapbox.Page.title;
            const urlFrom = `https://scrapbox.io/api/pages/${projectName}/${pageTitle}`;
            const targetPage = `/${targetProjectName}/${pageTitle}`;
            const response = await fetch(urlFrom);
            let json = await response.json();

            // ページにprivateTagがついている場合はエラー
            if (privateTag && json.links.includes(privateTag)) {
                let msg = `This page contains #${privateTag}!\nAborted.`;
                alert(msg);
                throw new Error(msg);
            }

            // 出力先ページへのリンクがすでにあれば, その行を消してから送る
            const len = json.lines.length;
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
            // 出力先ページを開く
            window.open(`https://scrapbox.io/${targetProjectName}/${pageTitle}`);

            // 出力先ページへのリンクが無ければ付ける
            if (len == json.lines.length) {
                const body = encodeURIComponent(`[${targetPage}]\n`);
                window.open(`https://scrapbox.io/${projectName}/${pageTitle}?body=${body}`, "_self");
            }
        },
    });
}