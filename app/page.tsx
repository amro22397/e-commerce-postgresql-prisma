export const revalidate = 0;

import Container from "../components/Container";
import HomeBanner from "../components/HomeBanner";
// import { truncateText } from "@/utils/truncateText";
import ProductCard from "../components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "../components/NullData";
import Link from "next/link";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = (await getProducts(searchParams)) || [];

  if (products.length === 0) {
    return (
      <NullData title='Oops! No products found. Click "All" to clear filters' />
    );
  }

  //Fisher-Yates shuffle algorithm
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);

  const user = await getCurrentUser();

  return (
    <div className="p-8 max-md:px-0 md:px-2 lg:px-8">
      <Container>
        {user?.user?.email === "amroalmutasim22@gmail.com" && (
          <Link href={"/checkout"}>Go to checkout</Link>
        )}

        {/* <pre className="">{JSON.stringify(user, null, 2)}</pre> */}
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
