export default function Footer() {
  return (
<footer className="bg-black text-white mt-16 py-8 px-4 shadow-inner">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Logo + Address */}
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            🧘 <span className="tracking-wide">YOGIO</span>
          </h2>
          <p className="text-sm">4652 Wilkens Avenue</p>
          <p className="text-sm">Baltimore, Maryland 21229</p>
          <div className="mt-2 space-y-1 text-sm">
            <p>📞 410-242-2748</p>
            <p>✉️ info@yogioapp.com</p>
          </div>
        </div>

        {/* Middle: Site Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Site Map</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/instructor" className="hover:underline">Instructors</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Right: Social + Copyright */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Social</h3>
          <div className="flex space-x-4 text-sm">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">📘 Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">📸 Instagram</a>
          </div>
          <p className="text-xs text-gray-100 mt-6">© {new Date().getFullYear()} YOGIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}