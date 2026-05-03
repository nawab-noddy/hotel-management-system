'use client'; 

import { useState, useEffect } from 'react';
// YAHAN HOTEL ICON ADD KAR DIYA HAI
import { BedDouble, CheckCircle2, Ban, ArrowRight, Activity, Hotel } from 'lucide-react';
import Link from 'next/link';

interface Room {
  id: number;
  roomNumber: string;
  status: string;
}

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`)
      .then(res => res.json())
      .then((data: Room[]) => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-[70vh] animate-page-enter">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           <Hotel size={24} className="text-indigo-600 opacity-50" />
        </div>
      </div>
    </div>
  );

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.status === 'AVAILABLE').length;
  const occupiedRooms = rooms.filter(room => room.status === 'OCCUPIED').length;

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-page-enter">
      
      <div className="flex flex-col space-y-2">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">System Overview</h2>
        <p className="text-slate-500 text-lg font-medium flex items-center gap-2">
          <Activity size={18} className="text-indigo-500" /> Live metrics for your property today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 cursor-pointer relative overflow-hidden animate-row" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-indigo-100 p-3.5 rounded-2xl text-indigo-600"><BedDouble size={28} /></div>
              <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full text-xs uppercase tracking-widest">Total</span>
            </div>
            <p className="text-6xl font-black text-slate-800 tracking-tighter">{totalRooms}</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">Registered Rooms</p>
          </div>
        </div>

        <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 cursor-pointer relative overflow-hidden animate-row" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-emerald-100 p-3.5 rounded-2xl text-emerald-600"><CheckCircle2 size={28} /></div>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs uppercase tracking-widest">Free</span>
            </div>
            <p className="text-6xl font-black text-emerald-600 tracking-tighter">{availableRooms}</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">Available Now</p>
          </div>
        </div>

        <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:border-rose-200 transition-all duration-500 cursor-pointer relative overflow-hidden animate-row" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-rose-100 p-3.5 rounded-2xl text-rose-600"><Ban size={28} /></div>
              <span className="text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full text-xs uppercase tracking-widest">In Use</span>
            </div>
            <p className="text-6xl font-black text-rose-600 tracking-tighter">{occupiedRooms}</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-2">Currently Occupied</p>
          </div>
        </div>

      </div>

      {/* Quick Actions Section */}
      <div className="mt-12 bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200/60 p-8 shadow-sm animate-row" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-2xl font-black text-slate-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/book" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
            <div>
              <h4 className="font-bold text-lg text-slate-900 group-hover:text-indigo-700">Walk-in Reservation</h4>
              <p className="text-slate-500 text-sm mt-1">Book an available room for a new guest immediately.</p>
            </div>
            <ArrowRight className="text-slate-400 group-hover:text-indigo-600 transform group-hover:translate-x-1 transition-all" />
          </Link>
          <Link href="/bookings" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-colors group">
            <div>
              <h4 className="font-bold text-lg text-slate-900 group-hover:text-rose-700">Process Checkout</h4>
              <p className="text-slate-500 text-sm mt-1">Settle pending payments and free up occupied rooms.</p>
            </div>
            <ArrowRight className="text-slate-400 group-hover:text-rose-600 transform group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

    </div>
  );
}