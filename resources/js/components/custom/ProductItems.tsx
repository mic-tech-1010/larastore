import { Product } from "@/types";
import { Link } from "@inertiajs/react";
import ProductController from "@/actions/App/Http/Controllers/ProductController";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import CurrencyFormatter from "../app/currencyFormatter";

function ProductItems({ product }: { product: Product }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <Link href={ProductController.show(product.slug)}>
            <figure>
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square object-cover"
              />
            </figure>
          </Link>
        </CardHeader>
        <CardContent>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>
            by <Link href={"/"} className="hover:underline">{product.user.name}</Link>&nbsp;
            in <Link href={"/"} className="hover:underline">{product.department.name}</Link>
          </CardDescription>
          <div className="flex items-center justify-between mt-3">
            <Button variant={"secondary"} className="bg-blue-500">Add to Cart</Button>
            <span className="text-2xl">
              <CurrencyFormatter amount={product.price} />
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductItems
