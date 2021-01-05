export function setShortcut(aliases) {
    document.addEventListener('keydown', (e) => {
        //if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        if (e.altKey && !e.ctrlKey) {
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
