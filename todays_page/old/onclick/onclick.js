export function onclick(e) {
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
        console.log('*****' + e);
        // const evt = e || window.event;//e ? e:window.event;
        // console.log('*****' + evt);
        // let windowName = '_blank';
        // let windowName = '_self';
        // if (e.ctrlKey) { windowName = '_blank'; }
        // else if (e.shiftKey) { windowName = '_new'; }
        window.open(`https://scrapbox.io/${projectName}/${title}?body=${body}`);
    });
}