'use client'; 

import { useState, useEffect } from 'react';
import { BedDouble, CheckCircle2, Ban } from 'lucide-react';

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
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.status === 'AVAILABLE').length;
  const occupiedRooms = rooms.filter(room => room.status === 'OCCUPIED').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Overview</h2>
        <p className="text-slate-500 text-lg">Here is what's happening at your hotel today.</p>
      </div>

      {/* Modern KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Total Rooms Card */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
             <BedDouble size={80} className="text-blue-600" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <BedDouble size={28} />
            </div>
            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm">Total Rooms</h3>
          </div>
          <p className="text-5xl font-black text-slate-800">{totalRooms}</p>
        </div>

        {/* Available Rooms Card */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
             <CheckCircle2 size={80} className="text-emerald-600" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm">Available</h3>
          </div>
          <p className="text-5xl font-black text-emerald-600">{availableRooms}</p>
        </div>

        {/* Occupied Rooms Card */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-rose-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
             <Ban size={80} className="text-rose-600" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-rose-50 p-3 rounded-xl text-rose-600">
              <Ban size={28} />
            </div>
            <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm">Occupied</h3>
          </div>
          <p className="text-5xl font-black text-rose-600">{occupiedRooms}</p>
        </div>

      </div>
    </div>
  );
}