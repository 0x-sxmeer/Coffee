export default function Footer() {
  return (
    <footer className="bg-homie-green text-white py-20 px-6 box-border">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <h3 className="font-serif text-3xl font-bold mb-6">HOMIE.</h3>
          <p className="text-white/70 font-light leading-relaxed">
            Crafting the finest coffee experiences since 2024. 
            From the farm to your cup, we ensure quality at every step.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div>
            <h4 className="font-bold tracking-widest mb-6">EXPLORE</h4>
            <ul className="space-y-4 text-white/70">
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Shop Coffee</a></li>
              <li><a href="#" className="hover:text-white">Merchandise</a></li>
              <li><a href="#" className="hover:text-white">Wholesale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-widest mb-6">VISIT</h4>
            <ul className="space-y-4 text-white/70">
              <li>Haldwani, Uttarakhand</li>
              <li>India</li>
              <li className="pt-4">20sameer90@gmail.com</li>
              <li>+91 7017897102</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
        <p>&copy; 2026 HOMIE Coffee. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>Twitter</span>
        </div>
      </div>
    </footer>
  );
}
