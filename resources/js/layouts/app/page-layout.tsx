import { dashboard, login, register } from '@/routes';
import { CartItem, PaginationProps, Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CartController from '@/actions/App/Http/Controllers/CartController';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart } from 'lucide-react';
import CurrencyFormatter from '@/components/app/currencyFormatter';
import { productRoute } from '@/helpers';
import { useEffect, useRef, useState } from 'react';


function Layout({
  canRegister = true,
  children
}: {
  canRegister?: boolean;
  children: React.ReactNode;
}) {

  const { auth, totalPrice, totalQuantity, miniCartItems, error, success } = usePage<SharedData>().props;

  const [successMessages, setSuccessMessages] = useState<any[]>([]);
  const timeoutRefs = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});

  useEffect(() => {
    if (success?.message) {
      const newMessage = {
        ...success,
        id: success.time
      }

      setSuccessMessages((prevMessages) => [ newMessage, ...prevMessages]);

      const timeoutId = setTimeout(() => {
        setSuccessMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== newMessage.id)
        );
        delete timeoutRefs.current[newMessage.id];
      }, 5000);

      timeoutRefs.current[newMessage.id] = timeoutId;
    }
  }, [success]);

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
                      <Link href={productRoute(item)} className='w-12 flex justify-center self-start'>
                        <img
                          src={item.image}
                          alt={item.title}
                          className='max-w-12 max-h-full'
                        />
                      </Link>
                      <div className='flex-1'>
                        <h3 className='mb-3 font-semibold'>
                          <Link href={productRoute(item)}>
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

       {successMessages.length > 0 && (
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {successMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline ml-2">{msg.message}</span>
            </div>
          ))}
        </div>
       )}
      {children}
    </>

  )
}

export default Layout
