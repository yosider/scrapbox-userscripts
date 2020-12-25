import {sendPage} from '/api/code/programming-notes/他のプロジェクトにページを送るUserScript/sendpage.js'
const targetProjectName = 'your project';  // 出力先プロジェクトの(URL上の)名前
const targetUserName = 'your name';  // 出力先プロジェクトのユーザーの表示名
const publicTag = 'public';  // 公開したページに付けるタグ(#は除く, 不要なら'')
const privateTag = 'private';  // 非公開のページに付けるタグ(#は除く, 不要なら'')
const image = 'https://i.gyazo.com/cffb30bfd8252ba088573f3d8b5bd47a.png';  // アイコン
sendPage(targetProjectName, targetUserName, publicTag, privateTag);