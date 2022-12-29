import Collection from '../components/collection'
import { useAccount } from '@starknet-react/core'

export default function MyCollection() {
  const { account, address, status } = useAccount()

  return (

    <div className="pt-24 pb-24" >
      <Collection />
    </div>


  )
}
