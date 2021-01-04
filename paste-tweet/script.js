import {insertText} from '/api/code/programming-notes/テキストを挿入するUserScript/script.js'
import {convertWholeText} from '/api/code/programming-notes/URLからtweetを引用するUserScript/convert.js';
 
scrapbox.PopupMenu.addButton({
  title: `　\uf099　`,  // FontAwesomeのアイコン
  onClick: text => {
    if (!/https:\/\/twitter\.com\S+\/status\/\d+/.test(text)) return; // URLがなければ無視
    
    const cursor = document.getElementById('text-input')
    Promise.all(text.split('\n').map(line => {
      const matches = line.match(/^\s+|.*/g);
      const indent = /^\s+$/.test(matches[0])? matches[0] : '';
      const content = /^\s+$/.test(matches[0])? matches[1] : matches[0];
      console.log([indent,content]);
      return convertWholeText(content, indent)
    })).then(lines => insertText({
        text: lines.join('\n'),
        cursor: cursor
    }));
    
    // 入力しやすいよう選択範囲を先に消しておく
    return '';
  },
});