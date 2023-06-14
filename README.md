# Automation Center Report Viewer

Automation Center 実行時に出力されるレポートファイルの Viewer。
そのまま素のブラウザで見るにはやや面倒だったので、少しでも楽できるように作ってみた。

## Feature

- 任意のレポートファイルを表示可能
- 直前に実行したレポートの表示
- 実行したサブレシピのツリー表示
  - ツリーから任意のレシピを開く
- エラーが発生したレシピのハイライト
- レシピを Automation Center で開く

## Milestone

- エラーが発生したアクティビティを開く
- アクティビティ検索
- 全レシピ横断のテキスト検索

## How to Use

### Install

1. [最新のリリース](https://github.com/shamada4151/recipe-report-viewer/releases)からインストーラーをダウンロードする
2. インストーラーを実行

### Basic

1. Top 画面で閲覧したいレポートを選択する
   1. `Open Report` ボタンを押すとファイル選択画面が開かれるので任意の `Report.html` を選択
   2. `Open Latest` ボタンを押すと最新のレポートを自動で開く
   3. 直近に開いた10件分のレポート一覧から開くことも可能
2. レポートを開いたら解析結果を確認する

その多機能については[こちら](./docs/introduction/index.md)

## Development

```shell
> yarn install --frozen-lockfile
> yarn dev
```
