import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 font-dmsans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-bebas text-4xl tracking-wider uppercase">
                OFFGRIDS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm font-space leading-relaxed">
              RAW URBAN STREETWEAR. REDEFINING THE THREADS OF MODERN CULTURE. PREPARE TO BREAK THE GRID.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-none border-border hover:border-primary hover:text-primary transition-colors hover:shadow-[4px_4px_0px_#E8FF00] hover:-translate-y-1 hover:-translate-x-1">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-none border-border hover:border-primary hover:text-primary transition-colors hover:shadow-[4px_4px_0px_#E8FF00] hover:-translate-y-1 hover:-translate-x-1">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-none border-border hover:border-primary hover:text-primary transition-colors hover:shadow-[4px_4px_0px_#E8FF00] hover:-translate-y-1 hover:-translate-x-1">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-none border-border hover:border-primary hover:text-primary transition-colors hover:shadow-[4px_4px_0px_#E8FF00] hover:-translate-y-1 hover:-translate-x-1">
                <Youtube className="h-4 w-4" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-space font-bold uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Return / Exchange</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-space font-bold uppercase tracking-widest mb-6">Collections</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/collections/new" className="hover:text-primary transition-colors text-primary">New Drops</Link></li>
              <li><Link href="/collections/best-sellers" className="hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link href="/collections/t-shirts" className="hover:text-primary transition-colors">T-Shirts</Link></li>
              <li><Link href="/collections/vests" className="hover:text-primary transition-colors">Vests</Link></li>
              <li><Link href="/collections/oversized" className="hover:text-primary transition-colors">Oversized Edit</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="font-space font-bold uppercase tracking-widest">Join The Grid</h3>
            <p className="text-sm text-muted-foreground font-space">
              SUBSCRIBE TO RECEIVE UPDATES, ACCESS TO EXCLUSIVE DEALS, AND MORE.
            </p>
            <div className="flex gap-2 font-space">
              <Input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="rounded-none border-border bg-background focus-visible:ring-1 focus-visible:ring-primary uppercase text-xs"
              />
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-white transition-colors shadow-[4px_4px_0px_#E8FF00] hover:shadow-[2px_2px_0px_#E8FF00] hover:translate-x-[2px] hover:translate-y-[2px]">
                SUBSCRIBE
              </Button>
            </div>
          </div>
          
        </div>

        <Separator className="bg-border mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-space">
          <p>© 2026 OFFGRIDS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 tracking-widest">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>AMEX</span>
            <span>UPI</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
