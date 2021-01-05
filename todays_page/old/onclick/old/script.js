import { onclick } from '/api/code/programming-notes/今日のページをnavbarから開くUserScript/onclick.js';
(() => {
    const navbar = document.getElementsByClassName('navbar-menu')[0];
    const todayButton = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    span.setAttribute('class', 'kamon kamon-pencil'); // from https://nota.github.io/kamon/example/
    a.setAttribute('href', 'javascript:void(0);');
    a.appendChild(span);
    todayButton.setAttribute('class', 'today-btn');
    todayButton.appendChild(a);
    todayButton.addEventListener('click', onclick);
    navbar.appendChild(todayButton);
})();