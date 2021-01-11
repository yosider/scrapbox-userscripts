import {sendPage} from '/api/code/programming-notes/他のプロジェクトにページを送るUserScript/sendpage.js'
sendPage(
	'your project', // 出力先プロジェクトの(URL上の)名前
	'your name', // 出力先プロジェクトのユーザーの表示名
	'private', // 非公開のページに付けるタグ(#は除く, 不要なら'')
	'https://i.gyazo.com/cffb30bfd8252ba088573f3d8b5bd47a.png', // アイコン画像URL(例),
	true,  // 送り先ページへのリンクをつけるか(sent to [$target])
	false,　// 送り元ページへのリンクをつけるか(from [$src])
	);