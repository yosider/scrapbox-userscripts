(() => {
    let navbar = document.getElementsByClassName('navbar-menu')[0];
    let today_button = document.createElement('li');
    let a = document.createElement('a');
    let span = document.createElement('span');

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let title = encodeURIComponent(`${year}/${month}/${day}`);

    let project = scrapbox.Project.name;
    let _ = (async () => {
        let today_page = `https://scrapbox.io/api/pages/${project}/${title}`;
        let response = await fetch(url_from);
        let json = await response.json();
        if (json.lines.length == 1){
            let yest = new Date();
            yest.setDate(yest.getDate() - 1);
            let yest_str = `${yest.getFullYear()}/${yest.getMonth() + 1}/${yest.getDate()}`;
            let tomo = new Date();
            tomo.setDate(tomo.getDate() + 1);
            let tomo_str = `${tomo.getFullYear()}/${tomo.getMonth() + 1}/${tomo.getDate()}`;
            let body = encodeURIComponent(
                '\n'.repeat(12)
                + `[${yest_str}] -> [${year}/${month}]/${day} -> [${tomo_str}]`
            );
            window.open(
                `https://scrapbox.io/${project}/${title}?body=${body}`,
                '_self'
            );
        }
        else{
            window.open(
                `https://scrapbox.io/${project}/${title}`,
                '_self'
            );
        }
    })();

    span.setAttribute('class', 'kamon kamon-pencil'); // from https://nota.github.io/kamon/example/
    a.setAttribute('href', `/${scrapbox.Project.name}/${title}`);
    a.appendChild(span);
    today_button.appendChild(a);
    navbar.appendChild(today_button);
})();