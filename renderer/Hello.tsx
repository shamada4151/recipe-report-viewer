import { useEffect } from 'react'
import { trpc } from './utils/trpc'
import TreeView from './components/TreeView'

export function HelloElectron() {
  const { data } = trpc.greeting.useQuery({ name: 'Electron' })
  trpc.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data)
    },
  })
  const mutation = trpc.report.open.useMutation()
  const treeMutation = trpc.report.tree.useMutation()

  const handleClick = () => {
    mutation.mutate()
  }

  useEffect(() => {
    if (mutation.data?.root) {
      console.log(mutation.data.root)
      treeMutation.mutate({ root: mutation.data.root })
    }
  }, [mutation.data?.root])

  if (!data) {
    return null
  }

  return (
    <div>
      <p>{data.text}</p>
      <button onClick={handleClick}>Open Report</button>
      {mutation.data?.port && <iframe src={`http://127.0.0.1:${mutation.data.port}/Report.html`} />}
      <p></p>
      {treeMutation.data && <TreeView item={treeMutation.data.tree} />}
    </div>
  )
}
