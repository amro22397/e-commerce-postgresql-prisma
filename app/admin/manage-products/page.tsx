import { getCurrentUser } from '@/actions/getCurrentUser'
import getProducts from '@/actions/getProducts'
import Container from '@/components/Container'
import NullData from '@/components/NullData'
import React from 'react'
import ManageProductsClient from './ManageProductsClient'

const page = async () => {
    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser();

    console.log(`products array: ${products}`);

    if (!currentUser || currentUser?.user?.role !== "ADMIN") {
        return (
            <>
            <pre className="hidden">{JSON.stringify(currentUser, null, 2)}</pre>
            <NullData title="You are not allowed to access this page" />
            </>
        );
      }

  return (
    <div className="pt-8">
    <Container>
    <pre className="hidden">{JSON.stringify(products, null, 2)}</pre>
      <ManageProductsClient products={products} />
    </Container>
  </div>
  )
}

export default page
