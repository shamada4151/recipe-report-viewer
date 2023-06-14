# 細かい使い方の解説(エンジニア向け)

## レポートファイルの表示: Web Server

- レポートファイルの表示には静的ファイルを配信する簡易 Web Server を採用
  - アプリから Web Server へ http 通信でレポートを取得・表示
- Web Server 上ではレポートファイルの解析・整形を行う

![open report](./images/OpenReportFlowChart.png)

## レポートファイルの解析: サブレシピの Tree 化

- ファイル・フォルダ名だとなにか分からないので、いちいち開く必要があった

```shell
Report.html
|- 2/
  |- Report.html
  |- 2/
    |- Report.html
|- 3/
  |- Report.html
  |- 3-1/
    |- Report.html
...
```

## レポートファイルの解析: サブレシピの Tree 化 2

- ディレクトリを再帰的に探索して、レポートファイルの木構造を作った
  - Report.html があれば、レシピ名を `report.title` に保存
  - ファイル内にエラーメッセージがあれば `report.error = true`
  - ルートディレクトリからの相対パスを `href` に保存
  - サブディレクトリがあれば中身の Report.html の情報を `children` 配列に追加

```typescript
// data model
{
  report: {
    title: string,
    error: boolean
  },
  href: string
  children?: Array<this>
}
```

## レシピのエラー判定

- レポート内にエラーが起きたかどうかの判定は含まれていないので、自前で解析
- 各アクティビティの Output の内容を解析して、キーワードが含まれているか確認
  - キーワードは C#, Python の例外メッセージとした

![Alt text](./images/cpython.png)

- Output の内容はスクレイピングの要領で html を検索
- error が見つかったら以下のように表示

![error tree image](./images/error-tree.png)

## Automation Center でレシピを開く

- Report の中身を見てレシピを修正したいときに使う想定
  - ※Report 内にレシピ情報が残っていないので、別の場所に移動されると機能しない

### レシピの特定方法

- Report のデフォルトの出力先から推測
- Automation Center は設定に従って以下にレポートを保存する
- `{OutputDir}\Report\Local\{RecipePath}\YYYYMMDDHHmmSSfff_{process_id}\`
- この設定に従った場所に保存されている場合のみ `{RecipePath}` を抽出してレシピを開く

## Issue Report 機能

- バグ報告を忘れないように、アプリ上に報告機能を用意した
  - 自分用でもあるし、配布したとき用でもある
- 送信ボタンを押すと GitHub API を叩いて Issue を作成し通知を送る仕組み

![h:400](./images/issue-report.svg)
