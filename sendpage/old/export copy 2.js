const PROJECT_TO = 'your project';  // 出力先プロジェクトのURL上の名前
const DISPLAYNAME_TO = 'your name';  // 出力先プロジェクトのユーザーの表示名
const PUBLIC_TAG = 'your tag';  // 公開したページに付ける公開済みタグ

scrapbox.PageMenu.addMenu({
    title: `export to ${PROJECT_TO}`,
    image: 'https://gyazo.com/197003cdc48bff7cf970cc4f737d555d/raw',  // アイコン画像
    onClick: async () => {
        let pageTitle = scrapbox.Page.title;
        let url_from = `https://scrapbox.io/api/pages/${scrapbox.Project.name}/${pageTitle}`;
        let response_get = await fetch(url_from);
        let json = await response_get.json();
        // 出力元ページに既に公開済みタグがついている場合、その行を消してからexportする
        json.lines = json.lines.filter(line => line.text!=`#${PUBLIC_TAG}`);
        let json_export = {
            name: PROJECT_TO,
            displayName: DISPLAYNAME_TO,
            exported: json.updated,
            pages: [json],
        };
        //console.log(json_export);
        let formdata = new FormData();
        let blob = new Blob([JSON.stringify(json_export)], { type: 'application/json' });
        formdata.append('import-file', blob);
        let response_post = await fetch(`https://scrapbox.io/api/page-data/import/${PROJECT_TO}.json`, {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': window._csrf },
            body: formdata,
        });
        // 出力先ページを開く
        window.open(`https://scrapbox.io/${PROJECT_TO}/${pageTitle}`);
        // 出力元ページに公開済みタグが付いていなければ付ける
        if (!json.links.includes(PUBLIC_TAG)) {
        	let body = encodeURIComponent(`#${PUBLIC_TAG}`);
        	window.open(`https://scrapbox.io/${scrapbox.Project.name}/${pageTitle}?body=${body}`, "_self");
        }
        console.log(response_post);
    },
});