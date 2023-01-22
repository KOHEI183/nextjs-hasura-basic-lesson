import { makeVar } from '@apollo/client'
interface Task {
  title: string
}
// makeVarのstate
// todoVarというもので管理される
// GQLのサーバーにはアクセスしていないのでリロードしたら消える
export const todoVar = makeVar<Task[]>([])

// 何個もstate管理できる
interface Nemui {
  title: string
}
export const todoNemui = makeVar<Nemui[]>([])
