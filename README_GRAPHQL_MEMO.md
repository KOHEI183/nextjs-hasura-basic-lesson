## GraphQL with Apollo Client

### state Management

- 別 component には@clinet をつけることにより GraphQL のキャッシュを見に行くことができるため
- redux などは使わずキャッシュ機構で管理できる

## cache とは

独立したローカル保存領域

### Local State Management

#### make Var

- local の領域に state を保存できる
- キャッシュとは別のクライアントの保存領域
- cache とは別の領域で状態を管理したい場合

#### useReactiveVar

- どの component からでも makeVar の中身を参照できる

### cache と makeVar は組み合わせることができる

1. クエリーを用いて GQL サーバーから data を取得すると cache に自動保存される
2. この段階で同時に make Var にも同じ値を入れる
3. cache にアクセスするには毎回 GQL のサーバー（クエリーを叩かないといけない）
4. 都度叩くより、いつでも取り出したいものは makeVar に入れて保存しておいたほうが良い
5. cache の更新タイミングが複雑なので完全に値を自分の管理下で管理したい場合は makeVar を使うと良い
