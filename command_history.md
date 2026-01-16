# wranglerで workers & pagesを使う

## 手順

1. まずはプロジェクトの新規作成（対話型）
`npx wrangler init`

  a. 新規プロジェクトの名前設定（後で変えられるのでなんでもいい）

  b. Frameworkを選び、今回はAstroを選択（Next.jsやHonoなどでも良い）


2. WranglerでCloudflareにログイン

下記２つの方法がある

- 環境変数を使うやり方
- 環境変数を使わないやり方

環境変数を設定しない場合、
`npx wrangler login`でログインすれば良い。

ただしDockerコンテナの中（Dev Container含む）の場合に
ログイン後のWebページからlocalhostへのリダイレクトを処理の都合上で認証ができない。
その場合は環境変数を使ったやり方を行う。

```bash
export CLOUDFLARE_API_TOKEN=
export CLOUDFLARE_ACCOUNT_ID=
```

3. プロジェクトの静的コンテンツを作成（Astroなど静的サイトを使う場合のみ）

`npm run build` など

4. Cloudflare Workersの名前を設定

wrangler.jsonc

```json
{
 	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "wrangler-example", // ←この名前を変える。変えるだけで別のworkers扱いになる
	"main": "./dist/_worker.js/index.js",
	"compatibility_date": "2025-09-27",
}
```

5. Cloudflareにデプロイ

`npm run wrangler deploy`

6. GitHubにリポジトリを置いておき、CloudflareのWorkers & PagesにてGitリポジトリと接続すると、
次回以降はリポジトリの特定ブランチのプッシュに反応してデプロイしてくれる

## 補足

### APIトークン取得方法

Cloudflareのページで
「アカウントの管理」
↓
「アカウントAPIトークン」
↓
「トークンを作成する」
↓
「APIトークンテンプレート」の「Cloudflare Workers を編集する」の「テンプレートを使用する」
↓
「ゾーンリソース」にて
- ドメインを指定する場合は「含む」「特定のゾーン」「{ドメイン}」
- アカウントを指定する場合は「含む」「アカウントにあるすべてのゾーン」「{Cloudflareアカウント名}」
↓
お好みで「クライアントIPアドレスフィルタリング」と「TTL（有効期間）」を設定
↓
「概要に進む」
↓
「トークンを作成する」
↓
トークンが発行されるのでコピーする
※セキュリティの都合上、一度ページを閉じると確認できなくなってしまい再発行するしかないので注意

### アカウントID取得方法

CloudflareのページのURLの
<https://dash.cloudflare.com/{アカウントID}/*******>
から取得