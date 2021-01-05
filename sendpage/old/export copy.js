const PROJECT_TO = 'Gyannama33-4';  // 出力先プロジェクトのURL上の名前
const DISPLAYNAME_TO = 'buyeranc';
const URL_TO = `https://scrapbox.io/api/page-data/import/${PROJECT_TO}.json`;

scrapbox.PageMenu.addMenu({
    title: `export to ${PROJECT_TO}`,
    image: '/assets/img/logo.png',
    onClick: async () => {
        var pageTitle = scrapbox.Page.title;
        var url_from = `https://scrapbox.io/api/pages/${scrapbox.Project.name}/${pageTitle}`;
        var response_get = await fetch(url_from);
        var json = await response_get.json();
        var json = {
            name: PROJECT_TO,
            displayName: DISPLAYNAME_TO,
            exported: json.updated,
            pages: [json],
        };
        var formdata = new FormData();
        var blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
        formdata.append('import-file', blob);
        var response_post = await fetch(URL_TO, {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': window._csrf },
            body: formdata,
        });
        console.log(response_post);
        window.open(`https://scrapbox.io/${PROJECT_TO}/${pageTitle}`);
    },
});