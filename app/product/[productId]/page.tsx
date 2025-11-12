import Container from "@/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";


interface Iprams {
    productId?: string;
}

/* interface HomeProps{
  searchParams: IProductParams
} */

const page = async ({ params }: { params: Iprams }) => {

  const product = await getProductById(params)
  const user = await getCurrentUser(); 

  if (!product) {
    return (
      <div className="text-center text-lg my-20">
        This product does not exist...
      </div>
    )
  }

  return (
    <div className="p-8 max-md:px-0 md:px-2 lg:px-8 w-full">
      <Container>
        <pre className="hidden">{JSON.stringify(user, null, 2)}</pre>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-8 max-md:px-4">
          {/* <p>ssss</p> */}
          <AddRating product={product} user={user?.user} />
          {/* <p>ssss</p> */}
        <ListRating product={product} user={user?.user} />
        </div>
      </Container>
    </div>
  )
}

export default page
