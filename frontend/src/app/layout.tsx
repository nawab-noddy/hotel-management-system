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
      <body className="font-sans selection:bg-indigo-200 selection:text-indigo-900">
        
        {/* Floating Glassmorphism Navbar */}
        <div className="p-4 w-full">
          <nav className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/40 shadow-xl shadow-indigo-100/50 rounded-2xl text-slate-800 sticky top-4 z-50">
            <div className="px-6 py-4 flex justify-between items-center">
              
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-indigo-600 to-blue-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
                  <Hotel size={22} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">Deskware<span className="text-indigo-600">.</span></h1>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Admin Portal</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/50">
                <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm hover:text-indigo-700 transition-all duration-300 font-bold text-sm">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link href="/rooms" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm hover:text-indigo-700 transition-all duration-300 font-bold text-sm">
                  <DoorOpen size={18} /> Rooms
                </Link>
                <Link href="/bookings" className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-sm hover:text-indigo-700 transition-all duration-300 font-bold text-sm">
                  <CalendarCheck size={18} /> Bookings
                </Link>
              </div>
                
              <Link href="/book" className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">
                <PlusCircle size={18} /> New Booking
              </Link>

            </div>
          </nav>
        </div>

        <main className="container mx-auto px-6 md:px-8 pb-12 pt-4">
          {children}
        </main>
      </body>
    </html>
  )
}