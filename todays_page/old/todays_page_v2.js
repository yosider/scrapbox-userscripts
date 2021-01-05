//'https://gyazo.com/da34778fd15162d719904bd158a7c0f8/raw',
const PROJECT = 'ikura';
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let title = encodeURIComponent(`${year}/${month}/${day}`);
let ret = (async () => {
    let url_from = `https://scrapbox.io/api/pages/${PROJECT}/${title}`;
    let response_get = await fetch(url_from);
    let json = await response_get.json();
    if (json.lines.length == 1){
        let yest = new Date();
        yest.setDate(yest.getDate() - 1);
        let yest_str = `${yest.getFullYear()}/${yest.getMonth() + 1}/${yest.getDate()}`;
        let tomo = new Date();
        tomo.setDate(tomo.getDate() + 1);
        let tomo_str = `${tomo.getFullYear()}/${tomo.getMonth() + 1}/${tomo.getDate()}`;
        let body = encodeURIComponent(
            '\n'.repeat(20)
            + `[${yest_str}] -> [${year}/${month}]/${day} -> [${tomo_str}]`
        );
        window.open(
            `https://scrapbox.io/${scrapbox.Project.name}/${title}?body=${body}`,
            '_self'
        );
    }
    else{
        window.open(
            `https://scrapbox.io/${scrapbox.Project.name}/${title}`,
            '_self'
        );
    }
})();


