/**
 * ハスラ(GQLサーバー)とnextjsを連携するファイル
 */
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
const createApolloClient = () => {
  return new ApolloClient({
    // windowはブラウザで実行している場合　falseの場合サーバー側での処理をしていることになる
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL, //hasuraのendpoint
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),
    cache: new InMemoryCache(),
  })
}

// ssr,ssg,isrの場合は毎回ApolloClientをインスタンス化しないといけない
// くアイアンとサイドの場合は一回のみ
export const initializeApollo = (initialState = null) => {
  // ?? nullまたはundefinedは右辺なにか入っている場合は左辺が入る
  const _apolloClient = apolloClient ?? createApolloClient()
  // サーバーサイドの処理の場合
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
