import getOrders from '@/actions/getOrders'
import getProducts from '@/actions/getProducts'
import getUsers from '@/actions/getUsers'
import Container from '@/components/Container';
import React from 'react'
import Summary from './Summary';
// import getGraphData from '@/actions/getGraphData';
// import BarGraph from './BarGraph';

const page = async () => {

    const products = await getProducts({category: null})
  const orders = await getOrders()
  const users = await getUsers()

  // const graphData = await getGraphData();



  return (
    <div className="p-8 max-md:px-1 md:px-2 lg:px-8">
    <Container>
      <Summary products={products} orders={orders} users={users} />
      <div className="mt-4 mx-auto max-w-[1150px]">
      {/* <BarGraph data = {graphData}/> */}
      </div>
    </Container>
    </div>
  )
}

export default page
