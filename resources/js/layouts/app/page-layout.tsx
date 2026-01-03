import ProductItems from '@/components/custom/ProductItems';
import { dashboard, login, register } from '@/routes';
import { CartItem, PaginationProps, Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CartController from '@/actions/App/Http/Controllers/CartController';
import ProductController from '@/actions/App/Http/Controllers/ProductController';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ShoppingCart } from 'lucide-react';
import CurrencyFormatter from '@/components/app/currencyFormatter';


function Layout({
  canRegister = true,
  children
}: {
  canRegister?: boolean;
  children: React.ReactNode;
}) {

  const { auth, totalPrice, totalQuantity, miniCartItems } = usePage<SharedData>().props;

  return (
    <>
      <header className="flex items-center justify-between border-b border-sidebar-border/70 bg-white/50 px-6 py-4 backdrop-blur-md dark:bg-black/50">
        <Link href="#">LaraStore</Link>
        <nav className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger className='relative rounded-full p-1.5 border-1 cursor-pointer'>
              <ShoppingCart size={22} />
              <Badge className="absolute -right-[4px] -top-[4px] rounded-full p-1 aspect-square text-sm font-mono tabular-nums">
                {totalQuantity}
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className='grid'>
                <span>{totalQuantity} Items</span>

                <div className='my-4 max-h-[300px] overflow-auto'>
                  {miniCartItems.length === 0 && (
                    <div className='py-2 text-gray-500 text-center'>
                      No item in the cart
                    </div>
                  )}
                  {miniCartItems.map((item: CartItem) => (
                    <div key={item.id} className='flex gap-4 p-3'>
                      <Link href={ProductController.show(item.slug)}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className='max-w-12 max-h-full'
                        />
                      </Link>
                      <div className='flex-1'>
                        <h3 className='mb-3 font-semibold'>
                          <Link href={ProductController.show(item.slug)}>
                            {item.title}
                          </Link>
                        </h3>
                        <div className='flex justify-between text-sm'>
                          <span>
                            Quantity:  {item.quantity}
                          </span>
                          <span>
                            <CurrencyFormatter amount={item.quantity * item.price} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <span className='space-x-2'>
                  <span>Subtotal:</span>
                  <span><CurrencyFormatter amount={totalPrice} /></span>
                </span>
                <Button variant="secondary" className='bg-blue-400 text-white' asChild>
                  <Link href={CartController.index()} className=''>View Cart</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {auth.user ? (
            <Link
              href={dashboard()}
              className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href={login()}
                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
              >
                Log in
              </Link>
              {canRegister && (
                <Link
                  href={register()}
                  className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                  Register
                </Link>
              )}
            </>
          )}
        </nav>
      </header>

      {children}
    </>

  )
}

export default Layout
