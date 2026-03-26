"use client";

import { useShop } from "@/context/shop-context";
import { PRODUCTS } from "@/lib/dummy-data";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Pagination } from "@/components/products/pagination";
import { motion } from "framer-motion";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const FITS = ["Oversized", "Regular", "Slim", "Korean Fit"];
const COLORS = ["Black", "White", "Grey", "Beige", "Olive", "Navy"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' as any }
  }
};

export function CategoryView() {
  const { activeCategory, filters, setFilters } = useShop();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, filters, currentPage]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory && product.category !== activeCategory) return false;
      
      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some(s => product.sizes.includes(s))) return false;
      
      // Fit filter
      if (filters.fits.length > 0 && !filters.fits.includes(product.fit)) return false;
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      
      // Color filter
      if (filters.colors.length > 0 && !filters.colors.some(c => product.colors.includes(c))) return false;
      
      return true;
    }).sort((a, b) => {
      if (filters.sort === "price-low") return a.price - b.price;
      if (filters.sort === "price-high") return b.price - a.price;
      return 0; // Default: newest (mocked)
    });
  }, [activeCategory, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const toggleFilter = (type: "sizes" | "fits" | "colors", value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v: string) => v !== value)
        : [...prev[type], value]
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const clearAll = () => {
    setFilters({
      sizes: [],
      priceRange: [299, 2999],
      fits: [],
      colors: [],
      sort: "newest"
    });
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 space-y-8">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <h2 className="font-bebas text-2xl tracking-widest">FILTERS</h2>
            {(filters.sizes.length > 0 || filters.fits.length > 0 || filters.colors.length > 0) && (
              <button 
                onClick={clearAll}
                className="font-space text-[10px] text-primary hover:underline tracking-widest uppercase"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Size Filter */}
          <div className="space-y-4">
            <h3 className="font-space text-xs font-bold tracking-widest uppercase">Size</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => toggleFilter("sizes", size)}
                  className={`w-10 h-10 border font-space text-[10px] transition-all flex items-center justify-center ${
                    filters.sizes.includes(size) ? "bg-primary text-black border-primary" : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Fit Filter */}
          <div className="space-y-4">
            <h3 className="font-space text-xs font-bold tracking-widest uppercase">Fit Type</h3>
            <div className="space-y-2">
              {FITS.map(fit => (
                <label key={fit} className="flex items-center gap-2 group cursor-pointer">
                  <div 
                    onClick={() => toggleFilter("fits", fit)}
                    className={`w-4 h-4 border transition-colors flex items-center justify-center ${
                      filters.fits.includes(fit) ? "bg-primary border-primary" : "border-border"
                    }`}
                  >
                    {filters.fits.includes(fit) && <X className="w-3 h-3 text-black" />}
                  </div>
                  <span className="font-space text-[10px] tracking-widest uppercase group-hover:text-primary transition-colors">{fit}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-4">
            <h3 className="font-space text-xs font-bold tracking-widest uppercase">Colors</h3>
            <div className="flex flex-wrap gap-3">
              {COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => toggleFilter("colors", color)}
                  title={color}
                  className={`w-6 h-6 border transition-all relative ${
                    filters.colors.includes(color) ? "border-primary scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                >
                  {filters.colors.includes(color) && <div className="absolute inset-0 flex items-center justify-center mix-blend-difference"><div className="w-1 h-1 bg-white" /></div>}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main id="product-grid-top" className="flex-1 space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-bebas text-4xl md:text-6xl tracking-widest uppercase leading-none">
                {activeCategory ? activeCategory : "ALL COLLECTIONS"}
              </h1>
              <p className="font-space text-[10px] text-muted-foreground tracking-[0.3em] uppercase mt-2">
                {filteredProducts.length} PRODUCTS FOUND
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Button variant="outline" className="md:hidden flex-1 rounded-none border-border font-space text-[10px] tracking-widest uppercase">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
              <div className="relative flex-1 md:flex-initial">
                <select 
                  value={filters.sort}
                  onChange={(e) => setFilters((prev: any) => ({ ...prev, sort: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-2 font-space text-[10px] tracking-widest uppercase focus:outline-none focus:border-primary appearance-none cursor-pointer"
                >
                  <option value="newest">Featured / Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          <div className="flex flex-wrap gap-2 min-h-6">
            {[...filters.sizes, ...filters.fits, ...filters.colors].map(f => (
              <button 
                key={f}
                onClick={() => {
                  if (SIZES.includes(f)) toggleFilter("sizes", f);
                  else if (FITS.includes(f)) toggleFilter("fits", f);
                  else toggleFilter("colors", f);
                }}
                className="bg-secondary text-[10px] font-space tracking-widest uppercase px-3 py-1 flex items-center gap-2 border border-border hover:border-primary transition-colors"
              >
                {f} <X className="w-3 h-3" />
              </button>
            ))}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(productsPerPage)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse border border-border" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-6">
              <p className="font-bebas text-4xl tracking-widest text-muted-foreground opacity-20">NO PRODUCTS FOUND</p>
              <Button onClick={clearAll} variant="link" className="text-primary font-space tracking-widest text-xs uppercase">Reset All Filters</Button>
            </div>
          ) : (
            <>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                {currentProducts.map((product) => (
                  <motion.div key={product.id} variants={cardVariants}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
