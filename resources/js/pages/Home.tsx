import ProductItems from '@/components/custom/ProductItems';
import Layout from '@/layouts/app/page-layout';
import { CartItem, PaginationProps, Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Home({
  products
}: {
  products: PaginationProps<Product>;
}) {

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      <main>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8'>
          {products.data.map(product => (
            <ProductItems product={product} key={product.id} />
          ))}
        </div>

      </main>

    </>
  );
}

Home.layout = (page: React.ReactNode) => <Layout children={page} />
