(() => {
    const navbar = document.getElementsByClassName('navbar-menu')[0];
    const todayButton = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    span.setAttribute('class', 'kamon kamon-pencil'); // from https://nota.github.io/kamon/example/
    a.appendChild(span);
    todayButton.setAttribute('class', 'today-btn');
    todayButton.appendChild(a);
    navbar.appendChild(todayButton);

    const getdate = (i => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return [`${d.getFullYear()}`, `${d.getMonth() + 1}`, `${d.getDate()}`];
    })
    const projectName = scrapbox.Project.name;
    const today = getdate(0);
    const prev = getdate(-1);
    const next = getdate(1);
    const title = encodeURIComponent(`${today[0]}/${today[1]}/${today[2]}`);
    const todayPage = `https://scrapbox.io/api/pages/${projectName}/${title}`;
    const dateTag = `[${prev[0]}/${prev[1]}/${prev[2]}] -> [${today[0]}/${today[1]}]/${today[2]} -> [${next[0]}/${next[1]}/${next[2]}]`;
    fetch(todayPage).then(res => res.json()).then(json => {
        let body = '';
        if (json.lines.every(line => !line.text.includes(dateTag))) {
            body = encodeURIComponent(
                '\n'.repeat(8)  // 書く場所
                + dateTag
                + '\n'
            );
        }
        a.setAttribute('href', `https://scrapbox.io/${projectName}/${title}?body=${body}`);
    });
})();