import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="w-full py-24 bg-card border-y border-border px-4 md:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-5xl md:text-8xl font-bebas tracking-tighter mb-6 leading-none">
          JOIN THE <span className="text-primary italic">REBELLION</span>
        </h2>
        <p className="font-space text-muted-foreground tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
          GET EXCLUSIVE ACCESS TO DROPS AND SECRETS OF THE GRID.
        </p>
        
        <form className="flex flex-col md:flex-row gap-4 items-center justify-center font-space">
          <Input 
            type="email" 
            placeholder="ENTER YOUR EMAIL@OFFGRIDS.STORE" 
            className="rounded-none border-border bg-background h-16 md:w-96 text-center md:text-left px-6 tracking-widest focus-visible:ring-primary focus-visible:ring-1"
            required
          />
          <Button 
            type="submit"
            className="rounded-none h-16 px-12 bg-primary text-primary-foreground font-bold tracking-[0.2em] shadow-brutal hover:bg-white transition-all w-full md:w-auto"
          >
            SUBSCRIBE NOW
          </Button>
        </form>
        
        <p className="text-[10px] font-space text-muted-foreground mt-8 tracking-widest uppercase">
          BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY POLICY. NO SPAM, JUST RAW ENERGY.
        </p>
      </div>
    </section>
  );
}
