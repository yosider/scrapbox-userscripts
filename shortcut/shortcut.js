export function setShortcut(aliases) {
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            const cursor = document.getElementById('text-input');
            const value = aliases[e.code];
            if (value) {
                e.preventDefault();
                cursor.focus();
                document.execCommand('insertText', null, value);
            }
        }
    });
}

setShortcut({
    KeyS: '[/icons/すごい.icon]',
    KeyA: '#NICE_TAG',
})