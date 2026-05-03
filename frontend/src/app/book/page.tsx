'use client';

import { useState, useEffect, FormEvent } from 'react';
import { User, CalendarDays, Bed, Wallet, CheckCircle2, Ban } from 'lucide-react';

interface Room {
  id: number;
  roomNumber: string;
  type: string;
  pricePerNight: number;
  status: string;
}

export default function BookRoomPage() {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    guestName: '', contactNumber: '', idProofType: 'Aadhar', idProofNumber: '',
    roomId: '', checkInDate: '', checkOutDate: '', advancePaid: ''
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`)
      .then(res => res.json())
      .then((data: Room[]) => {
        setAvailableRooms(data.filter(room => room.status?.toUpperCase() === 'AVAILABLE'));
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const payload = {
      ...formData,
      roomId: parseInt(formData.roomId),
      advancePaid: parseFloat(formData.advancePaid) || 0
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: 'success', text: `Booking Confirmed! Total: ₹${result.totalAmount} | Remaining: ₹${result.remainingBalance}` });
        setFormData({ guestName: '', contactNumber: '', idProofType: 'Aadhar', idProofNumber: '', roomId: '', checkInDate: '', checkOutDate: '', advancePaid: '' });
        setAvailableRooms(prev => prev.filter(r => r.id !== payload.roomId));
      } else {
        const errorText = await response.text();
        setMessage({ type: 'error', text: `Failed: ${errorText}` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Is Spring Boot running?' });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64 animate-page-enter">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
    </div>
  );

  return (
    // YAHAN ANIMATION CLASS ADD KI HAI
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-page-enter">
      
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create New Booking</h2>
        <p className="text-slate-500 mt-2 font-medium">Fill in the details below to reserve a room for your guest.</p>
      </div>

      {message && (
        <div className={`p-5 mb-8 rounded-xl flex items-center gap-3 font-bold animate-row ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {message.type === 'success' ? <CheckCircle2 /> : <Ban />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Guest Details Section */}
        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-6 flex items-center gap-2"><User size={18}/> Guest Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Guest Name</label>
              <input type="text" name="guestName" required value={formData.guestName} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
              <input type="tel" name="contactNumber" required value={formData.contactNumber} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ID Proof Type</label>
              <select name="idProofType" value={formData.idProofType} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer">
                <option value="Aadhar">Aadhar</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">ID Proof Number</label>
              <input type="text" name="idProofNumber" required value={formData.idProofNumber} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
            </div>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-6 flex items-center gap-2"><Bed size={18}/> Reservation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Room</label>
              <select name="roomId" required value={formData.roomId} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer">
                <option value="" disabled className="text-gray-500">-- Choose an Available Room --</option>
                {availableRooms.length === 0 ? (
                  <option disabled>No rooms available right now!</option>
                ) : (
                  availableRooms.map(room => (
                    <option key={room.id} value={room.id}>
                      Room {room.roomNumber} ({room.type}) - ₹{room.pricePerNight} / night
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><CalendarDays size={16}/> Check-In</label>
              <input type="date" name="checkInDate" required value={formData.checkInDate} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><CalendarDays size={16}/> Check-Out</label>
              <input type="date" name="checkOutDate" required value={formData.checkOutDate} onChange={handleChange}
                className="w-full bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Wallet size={16}/> Advance Paid (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-bold">₹</span>
                <input type="number" name="advancePaid" min="0" value={formData.advancePaid} onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-8 bg-white text-slate-900 border border-slate-200 p-3.5 rounded-xl font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg font-black py-4 px-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center gap-2">
          <CheckCircle2 size={24} /> Confirm Reservation
        </button>
      </form>
    </div>
  );
}