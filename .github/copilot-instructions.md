- 概要
  - このwebサイトは新入生向けの部活動(STEM研究部web班)の紹介サイトである

- 開発環境
  - OS:Windows 11
  - Node.js(24.14.1)
  - npm(11.11.0)
- 使用技術
  - フロントエンド
    - React(19.2.4)
    - vite(8.0.1)
    - 詳しくはweb-shoukai\package.jsonを参照
  - 使用言語
    - HTML
    - CSS
    - JavaScript
  - バックエンドはなし
- コーディング規約
  - 変数名はキャメルケースで命名する
  - 定数は全て大文字でアンダースコアで区切る
  - コメントは必要に応じて記述する
  - Reactコンポーネントは1ファイル1コンポーネントとする
  - フォルダ構成は以下のようにする
    web-shoukai/
     └── src/
         ├── components/ 
         ├── pages/ 
         |     ├── Activity.jsx
         |     ├── QA.jsx
         |     ├── Shoukai.jsx
         ├── styles/ 
         └── assets/
  - 関数およびコンポーネントは単一責任とする
  - グローバル変数を乱用しない
- ページ構成
  - 全体構成
    - トップページのみで構成する(暫定的に)
    - 全体のデザインはVisual Studio Code風のUIを参考にしたレイアウトとする。(images\sample.pngを参考に)
    - レスポンシブ対応は考えなくてよい（フルスクリーン時のみ考慮する）

    - 画面構成は以下の3つの領域で構成する。
      - 左側：Header（サイドバー）
      - 右側：Main（メインコンテンツ）
      - 下部：Footer（投稿フォーム）
    - Header(サイドバー)
      - 画面左側に配置
      - widthはユーザーが調整可能とする（実装済み）
      - headerのwidthが0の時は中身を非表示にする
      - VsCodeのサイドバーを参考に、背景色はダークグレー、文字色は白とする(images\sample.pngを参考に)
      - 現在id="sidebtn"でスライドするように実装されているが#sidebtnを削除しページ遷移リンクを上部、ページ移動リンクを下部に配意する
      - リンクを配置する
        - ページ遷移リンク（上部）
          - 活動内容(Activity.jsxに遷移)
          - Q&A(QA.jsxに遷移)
          - 作品紹介(Shoukai.jsxに遷移)
            - ReactRouterを使用
        - ページ移動リンク（下部）
          - 学校ホームページ
          - 専攻科紹介ページ
          - Stem研究部紹介ページ
            - aタグを使用して外部リンクに遷移させる(リンクは後で張るので、#を指定しておく)
    - Main(メインコンテンツ)
      - 画面右側に配置
      - Headerの幅に応じて可変レイアウトとする
      - 表示内容は変えずにstyleだけ変更してほしい
      - class="content"のcssを.mdの文法にのっとったのuiにする
      - activity.jsx
        -  class="gaiyou"とclass="hero"の内容をactivity.jsxに表示
      - QA.jsx
        -  class="questions"とclass="hero"の内容をQA.jsxに表示
      - Shoukai.jsx
        -  class="taikai"の内容をShoukai.jsxに表示
        -  class="shoukai"の内容をShoukai.jsxに表示
        -  とclass="hero"の内容をShoukai.jsxに表示
    - Footer(投稿フォーム)
      - 画面下部に配置
      - Headerの幅に応じて可変レイアウトとする
      - PowerShell風のUIにする
      - 投稿時の表示形式
        - 「名前：[名前]＞メッセージ: [メッセージ]」として表示する
        - 各投稿には削除ボタンを設置する
        - powershellと同じように、記入欄が下、投稿が上に順に表示されるようにする
          - 例
          名前：＞投稿1
          名前：＞投稿2
          名前：＞投稿3
          入力欄（名前: \ [入力欄]> メッセージ: [入力欄]）
          - 投稿は新しいものが下に表示されるようにする
          - 記入欄は投稿の表示と同じように上に詰めて表示する。投稿が一つもない場合は、footerの最上部に表示する
        - 投稿データはブラウザのLocalStorageに保存する
        - ページ再読み込み後も投稿内容は保持される
    
