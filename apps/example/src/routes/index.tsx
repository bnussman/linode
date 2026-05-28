import { createFileRoute } from '@tanstack/react-router'
import { getProfileOptions } from '@bnussman/linode-api';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { data } = useQuery(getProfileOptions());

  return (
    <div>
      <h1>Linode</h1>
      {data && <p>Hello {data.username}</p>}
    </div>
  )
}
