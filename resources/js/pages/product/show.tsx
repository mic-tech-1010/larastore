import EmblaCarousel from "@/components/custom/productDetailsCarousel"
import { EmblaOptionsType } from 'embla-carousel'
import { Product } from "@/types"

function show(
  {
    product,
    variationOptions
  }: {
    product: Product,
    variationOptions: number[]
  }) {
  const OPTIONS: EmblaOptionsType = {}
  const SLIDE_COUNT = 10
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  )
}

export default show
