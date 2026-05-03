import './globals.css'
import Link from 'next/link'
import { LayoutDashboard, DoorOpen, CalendarCheck, PlusCircle, Hotel } from 'lucide-react'

export const metadata = {
  title: 'CSS Hotel Management',
  description: 'Hotel Management System for Computer Software Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Modern Gradient Navbar with Glass Effect */}
        <nav className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white sticky top-0 z-50 shadow-xl border-b border-indigo-500/20">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-2 rounded-lg shadow-lg shadow-indigo-500/30">
                <Hotel size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">Deskware</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-300 font-semibold -mt-1">Hotel Admin</p>
              </div>
            </div>

            {/* Navigation Links with Icons & Hover Effects */}
            <div className="flex items-center space-x-1">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link href="/rooms" className="flex items-center gap-2 px-4 py-2 rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm">
                <DoorOpen size={18} /> Rooms
              </Link>
              <Link href="/bookings" className="flex items-center gap-2 px-4 py-2 rounded-lg text-indigo-100 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-sm">
                <CalendarCheck size={18} /> Bookings
              </Link>
              
              {/* Call to Action Button */}
              <Link href="/book" className="ml-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 transform hover:-translate-y-0.5">
                <PlusCircle size={18} /> New Booking
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area with Fade-in Animation */}
        <main className="container mx-auto p-6 md:p-8 animate-in fade-in duration-500">
          {children}
        </main>
      </body>
    </html>
  )
}