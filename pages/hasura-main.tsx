/**
 * Queryを叩いてGQLサーバーからdataを取得する
 */
import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries/queries'
// 自動生成された型
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  // useQueryを叩いた段階でcacheに保存される
  // __typenameとidでキャシュに存在しているか見に行くメカニズムになっている
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // cacheのoption デフォルトだとfetchPolicy: 'cache-first',
    //fetchPolicy: 'network-only',　// 常にGQLサーバーに見に行く。常にcacheに保存する　通信が完了した段階で画面に表示される
    fetchPolicy: 'cache-and-network', // 常にGQLサーバーに見に行く。取得している間は前のcacheを表示して取得完了時上書きをする
    //fetchPolicy: 'cache-first',　// 最初の処理はGQLサーバーに見に行く。２回目以降cacheがあれば常にcacheを参照する。dataが頻繁に変わるようなserviceであれば向かない。
    //fetchPolicy: 'no-cache',　// 常にGQLサーバーに見に行く。cacheに入れない　@Clientで見ても参照できない
  })

  // const { data, error } = useQuery<GetUsersQuery>(
  //   gql`
  //     query GetUsers {
  //       users(order_by: { created_at: desc }) {
  //         id
  //         name
  //         created_at
  //       }
  //     }
  //   `,
  //   {
  //     //fetchPolicy: 'network-only',
  //     fetchPolicy: 'cache-and-network',
  //     //fetchPolicy: 'cache-first',
  //     //fetchPolicy: 'no-cache',
  //   }
  // )

  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  console.warn(data, 'data')
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
