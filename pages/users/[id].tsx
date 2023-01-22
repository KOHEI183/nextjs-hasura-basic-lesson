import { VFC } from 'react'
import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { initializeApollo } from '../../lib/apolloClient'
import { GET_USERIDS, GET_USERBY_ID } from '../../queries/queries'
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from '../../types/generated/graphql'
import { Layout } from '../../components/Layout'
interface Props {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
}

const UserDetail: VFC<Props> = ({ user }) => {
  console.log(user, 'user')

  if (!user) {
    return <Layout title="loading">Loading...</Layout>
  }
  return (
    <Layout title={user.name}>
      <p className="text-xl font-bold">User detail</p>
      <p className="m-4">
        {'ID : '}
        {user.id}
      </p>
      <p className="mb-4 text-xl font-bold">{user.name}</p>
      <p className="mb-12">{user.created_at}</p>
      <Link href="/hasura-ssg">
        <div className="flex cursor-pointer mt-12">
          <ChevronDoubleLeftIcon
            data-testid="auth-to-main"
            className="h-5 w-5 mr-3 text-blue-500"
          />
          <span data-testid="back-to-main">Back to main-ssg-page</span>
        </div>
      </Link>
    </Layout>
  )
}
export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
  // 画面遷移をしてもう一度user情報を取得しないといけないためssで記載
  const apolloClient = initializeApollo()
  // user情報をすべて取る
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  })
  console.log(data, 'data')

  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }))
  console.log(paths, 'userlist全嫌悪path')
  return {
    paths,
    fallback: true, // 動的に個別ページを増やすことができる
    // user list分のページを生成
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params, 'パラメーターのdata')
  const apolloClient = initializeApollo()
  // useridをもとに
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USERBY_ID,
    // paramsidで検索をかけてcomponentにdataをわたす
    variables: { id: params.id },
  })
  // UserDetailにpropsする
  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1, // isrの再ビルド間隔
  }
}
