"use client";

import { PRODUCTS } from "@/lib/dummy-data";
import { ProductCard } from "./product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FeaturedCollectionsProps {
  title: string;
  category?: string;
}

export function FeaturedCollections({ title, category }: FeaturedCollectionsProps) {
  const filteredProducts = category 
    ? PRODUCTS.filter(p => p.category === category)
    : PRODUCTS;

  return (
    <section className="w-full py-20 bg-background overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto mb-10 border-l-4 border-primary pl-6">
        <h2 className="text-4xl md:text-6xl font-bebas tracking-widest uppercase">
          {title}
        </h2>
        <p className="font-space text-muted-foreground text-xs md:text-sm tracking-[0.3em] mt-2">
          READY TO DISRUPT THE GRID.
        </p>
      </div>

      <ScrollArea className="w-full whitespace-nowrap px-4 md:px-6">
        <div className="flex w-max space-x-4 pb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-[280px] md:w-[350px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-secondary" />
      </ScrollArea>
    </section>
  );
}
