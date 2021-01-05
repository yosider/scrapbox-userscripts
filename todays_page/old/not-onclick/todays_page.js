scrapbox.PageMenu.addMenu({
    title: '今日のページ',
    image: 'https://gyazo.com/da34778fd15162d719904bd158a7c0f8/raw',
    onClick: () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        let yest = new Date();
        yest.setDate(yest.getDate() - 1);
        let yest_str = `${yest.getFullYear()}/${yest.getMonth() + 1}/${yest.getDate()}`;

        let tomo = new Date();
        tomo.setDate(tomo.getDate() + 1);
        let tomo_str = `${tomo.getFullYear()}/${tomo.getMonth() + 1}/${tomo.getDate()}`;

        let title = encodeURIComponent(`${year}/${month}/${day}`);
        let body = encodeURIComponent(
            `[${yest_str}] <- [${year}/${month}]/${day} -> [${tomo_str}]`
            + '\n'
            + '\n'
        );
        window.open(
            `https://scrapbox.io/${scrapbox.Project.name}/${title}?body=${body}`,
            '_self'
        );
    }
});