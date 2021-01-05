(() => {
    let navbar = document.getElementsByClassName('navbar-menu')[0];
    let today_button = document.createElement('li');
    let a = document.createElement('a'); // 無いとiconが暗くなる
    let span = document.createElement('span');
    span.setAttribute('class', 'kamon kamon-pencil'); // from https://nota.github.io/kamon/example/
    today_button.onclick = (async () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        let title = encodeURIComponent(`${year}/${month}/${day}`);
        let project = scrapbox.Project.name;
        let today_page = `https://scrapbox.io/api/pages/${project}/${title}`;
        let body = "";
        // 今日のページを取得して、内容が空ならテンプレートを書く
        let response = await fetch(today_page);
        let json = await response.json();
        if (json.lines.length == 1){
            let yest = new Date();
            yest.setDate(yest.getDate() - 1);
            let yest_str = `${yest.getFullYear()}/${yest.getMonth() + 1}/${yest.getDate()}`;
            let tomo = new Date();
            tomo.setDate(tomo.getDate() + 1);
            let tomo_str = `${tomo.getFullYear()}/${tomo.getMonth() + 1}/${tomo.getDate()}`;
            body = encodeURIComponent(
                '\n'.repeat(12)  // 書く場所
                + `[${yest_str}] -> [${year}/${month}]/${day} -> [${tomo_str}]\n`
            );
        }
        window.open(`https://scrapbox.io/${project}/${title}?body=${body}`, '_self');
    });
    a.appendChild(span);
    today_button.appendChild(a);
    navbar.appendChild(today_button);
})();