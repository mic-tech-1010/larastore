import React, { useState } from "react"
import { Link, router, useForm } from "@inertiajs/react"
import { CartItem as CartItemType } from "@/types"
import { Input } from "../ui/input"
import CurrencyFormatter from "../app/currencyFormatter"
import { productRoute } from "@/helpers"
import { Separator } from "@/components/ui/separator"
import CartController from "@/actions/App/Http/Controllers/CartController"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button"

function CartItem({ item }: { item: CartItemType }) {

  const deleteForm = useForm({ option_ids: item.option_ids });

  const [error, setError] = useState('');


  const onDeleteClick = () => {
    deleteForm.delete(CartController.destroy(item.product_id).url, {
      preserveScroll: true
    })
  }

  const handleQuantityChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    router.put(CartController.update(item.product_id).url, {
      quantity: evt.target.value,
      option_ids: item.option_ids
    }, {
      preserveScroll: true,
      onError: (errors) => {
        setError(Object.values(errors)[0])
      }
    })
  };

  return (
    <>
      <div className="flex gap-6 p-3">
        <Link href={productRoute(item)} className="w-32 min-w-32 min-h-32 flex justify-center self-start">
          <img src={item.image} alt="" className="max-w-full max-h-full" />
        </Link>
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="mb-3 text-sm font-semibold">
              <Link href={productRoute(item)}>
                {item.title}
              </Link>
            </h3>
            <div className="text-xs">
              {item.options.map(option => (
                <div key={option.id}>
                  <strong className="text-bold">
                    {option.type.name}
                  </strong>
                  {option.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <div className="text-sm">Quantity:</div>
              <Tooltip open={!!error}>
                <TooltipTrigger>
                  <Input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onBlur={handleQuantityChange} />
                </TooltipTrigger>
                {error && (
                  <TooltipContent side="top" className="text-red-500">
                    {error}
                  </TooltipContent>
                )}
              </Tooltip>

            <Button variant={"ghost"} onClick={() => onDeleteClick()}>
                 Delete
            </Button>

            <Button variant={"ghost"}>
              Save for Later
            </Button>

              </div>
              <div className="font-bold text-lg">
                <CurrencyFormatter amount={item.price * item.quantity} />
              </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  )
}

export default CartItem
