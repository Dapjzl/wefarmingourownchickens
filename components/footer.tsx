export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ChickieMart</h3>
            <p className="text-sm opacity-90">Fresh chicken, delivered fast. Quality cuts without stress.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm opacity-90">Phone: +234 (0) 123 456 7890</p>
            <p className="text-sm opacity-90">Email: hello@chickiemart.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Address</h4>
            <p className="text-sm opacity-90">123 Market Street</p>
            <p className="text-sm opacity-90">Lagos, Nigeria</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 ChickieMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
