import { trpc } from './utils/trpc'

export function HelloElectron() {
  const { data } = trpc.greeting.useQuery({ name: 'Electron' })
  trpc.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data)
    },
  })

  if (!data) {
    return null
  }

  return (
    <div>
      <p>{data.text}</p>
    </div>
  )
}
