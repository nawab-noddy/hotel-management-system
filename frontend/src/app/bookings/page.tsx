'use client';

import { useState, useEffect } from 'react';
import { User, CalendarClock, DoorClosed, LogOut, CheckCircle2 } from 'lucide-react';

interface Booking {
  id: number;
  guest: { name: string; contactNumber: string };
  room: { roomNumber: string; type: string };
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  advancePaid: number;
  remainingBalance: number;
  paymentStatus: string;
  bookingStatus: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchBookings = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`)
      .then(res => res.json())
      .then((data: Booking[]) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckout = async (bookingId: number) => {
    if (!window.confirm("Are you sure you want to check-out this guest and collect the remaining balance?")) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/checkout`, {
        method: 'PUT',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Checkout successful! Remaining payment collected.' });
        fetchBookings();
      } else {
        const errorText = await response.text();
        setMessage({ type: 'error', text: `Checkout failed: ${errorText}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error during checkout.' });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 animate-page-enter">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto animate-page-enter">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Active Reservations</h2>
          <p className="text-slate-500 mt-1 font-medium">Process check-outs and collect pending payments.</p>
        </div>
      </div>

      {message && (
        <div className="p-4 mb-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-2 shadow-sm animate-row">
          <CheckCircle2 /> {message.text}
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 uppercase tracking-wider text-xs text-slate-500">
              <th className="px-6 py-5 font-black">Guest Info</th>
              <th className="px-6 py-5 font-black">Room</th>
              <th className="px-6 py-5 font-black">Stay Duration</th>
              <th className="px-6 py-5 font-black">Balance Due</th>
              <th className="px-6 py-5 font-black">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-bold text-lg">
                  No bookings found. Create a new booking!
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr 
                  key={booking.id} 
                  className="hover:bg-slate-50/50 transition-colors duration-200 animate-row"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><User size={20}/></div>
                      <div>
                        <p className="font-black text-slate-900">{booking.guest.name}</p>
                        <p className="text-xs font-bold text-slate-500">{booking.guest.contactNumber}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><DoorClosed size={20}/></div>
                      <div>
                        <p className="font-black text-slate-900">Room {booking.room.roomNumber}</p>
                        <p className="text-xs font-bold text-slate-500">{booking.room.type}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><CalendarClock size={20}/></div>
                      <div className="text-sm font-semibold text-slate-700">
                        <p>In: <span className="font-black text-slate-900">{booking.checkInDate}</span></p>
                        <p>Out: <span className="font-black text-slate-900">{booking.checkOutDate}</span></p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <div className="bg-rose-50 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl inline-block text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Pending</p>
                      <p className="text-xl font-black">₹{booking.remainingBalance}</p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    {booking.bookingStatus === 'ACTIVE' ? (
                      <button 
                        onClick={() => handleCheckout(booking.id)}
                        className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-rose-500/30 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <LogOut size={16} /> Check-Out
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 text-emerald-700 bg-emerald-50 font-black border border-emerald-200 px-4 py-2.5 rounded-xl">
                        <CheckCircle2 size={18} /> Settled
                      </span>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}