"use client";

import { useState } from "react";

import { PRODUCTS } from "@/lib/dummy-data";
import { ProductCard } from "@/components/product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  "ALL",
  "SHIRTS",
  "TROUSERS",
  "JEANS",
  "SUNGLASSES",
  "T-SHIRTS",
  "BAGS",
  "JACKETS",
  "SHOES",
  "SHORTS"
];

export function NewAndPopular() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredProducts = activeTab === "ALL" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category.toUpperCase() === activeTab);

  return (
    <section className="w-full py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center tracking-widest uppercase mb-10">
          NEW AND POPULAR
        </h2>

        {/* Custom Tabs Navigation */}
        <div className="w-full overflow-hidden mb-12 flex justify-center border-b border-border pb-px">
           <ScrollArea className="w-full max-w-4xl whitespace-nowrap">
             <div className="flex w-max items-center justify-center p-1">
               {TABS.map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`
                     px-4 md:px-6 py-2 text-xs md:text-sm font-medium tracking-widest transition-colors uppercase border-b-2
                     ${activeTab === tab 
                       ? "border-primary text-primary bg-muted/30" 
                       : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                   `}
                 >
                   {tab}
                 </button>
               ))}
             </div>
             <ScrollBar orientation="horizontal" className="invisible" />
           </ScrollArea>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="w-full py-20 text-center">
            <p className="text-muted-foreground text-lg tracking-widest">
              COMING SOON
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
