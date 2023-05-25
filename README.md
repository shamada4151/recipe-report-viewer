# Automation Center Report Viewer

Automation Center 実行時に出力されるレポートファイルの Viewer。
そのまま素のブラウザで見るにはやや面倒だったので、少しでも楽できるように作ってみた。

## Feature

- 任意のレポートファイルを表示可能
- 直前に実行したレポートの表示
- 実行したサブレシピのツリー表示
  - ツリーから任意のレシピを開く
- エラーが発生したレシピのハイライト

## Milestone

- エラーが発生したアクティビティを開く
- レシピを Automation Center で開く
- アクティビティ検索
- 全レシピ横断のテキスト検索

## Development

```shell
> yarn install --frozen-lockfile
> yarn dev
```
