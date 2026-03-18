import { Button } from "@/components/ui/button";

const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

export function ShopYourSize() {
  return (
    <section className="w-full py-12 bg-background border-t border-b border-border">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase mb-8">
          SHOP YOUR SIZE
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {SIZES.map((size) => (
            <Button
              key={size}
              variant="outline"
              className="rounded-full w-14 h-14 md:w-16 md:h-16 text-lg font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
