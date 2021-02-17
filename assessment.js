'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param{htmlElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        //子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
} 

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が入力されていない時は処理を終了する
        return;
    }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p')
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

     //ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
    　'https://twitter.com/intent/tweet?button_hashtag=' 
      + encodeURIComponent('あなたのいいところ') 
      + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor)

    //wings.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところは真面目さです。{userName}は物事を確実にやり遂げます。',
    '{userName}のいいところは度胸の良さです。{userName}はチャンスと思う場面では臆せず挑戦出来ます。',
    '{userName}のいいところは頭の柔らかさです。{userName}は自由に物を考えて行動します。',
    '{userName}のいいところはブレの無さです。{userName}は経験に基づく人生観や世界観がはっきりしています。',
    '{userName}のいいところは集中力です。{userName}は何かを好きになったらとことんやります。',
    '{userName}のいいところは誠実さです。{userName}は人に気を遣うのが上手です。',
    '{userName}のいいところは社交性です。{userName}は誰とでも打ち解られることが出来ます。',
    '{userName}のいいところは度量の大きさです。{userName}は細かい事には動じません。',
    '{userName}のいいところは慎重さです。{userName}は細かいところまで考え抜いて行動します。',
    '{userName}のいいところは人情の厚さです。{userName}は恩は決して忘れません。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

 function assessment(userName) {
     //文字のコード番号を取得してそれを足し合わせる//
     let sumOfCharCode = 0;
     for (let i = 0; i < userName.length; i++) {
         sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
     }

     //文字のコード番号の合計を回答の数で割って添字の数値を求める//
     const index =sumOfCharCode % answers.length;
     let result = answers[index];
     result = result.replace(/\{userName\}/g, userName);
     return result;
 }

console.assert(
    assessment('あ')　===
    'あのいいところは集中力です。ああは何かを好きになったらとことんやります。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('あ')　=== assessment('あ'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'　
)
