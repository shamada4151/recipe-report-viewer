import { trpc } from './utils/trpc'

export function HelloElectron() {
  const { data } = trpc.greeting.useQuery({ name: 'Electron' })
  trpc.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data)
    },
  })
  const mutation = trpc.report.open.useMutation()

  const handleClick = () => {
    mutation.mutate()
  }

  console.log(mutation.data)

  if (!data) {
    return null
  }

  return (
    <div>
      <p>{data.text}</p>
      <button onClick={handleClick}>Open Report</button>
      {mutation.data?.port && <iframe src={`http://127.0.0.1:${mutation.data.port}/Report.html`} />}
    </div>
  )
}
