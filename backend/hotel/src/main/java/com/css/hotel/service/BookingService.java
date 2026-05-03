package com.css.hotel.service;

import com.css.hotel.dto.BookingRequestDTO;
import com.css.hotel.model.Booking;
import com.css.hotel.model.Guest;
import com.css.hotel.model.Room;
import com.css.hotel.model.enums.BookingStatus;
import com.css.hotel.model.enums.PaymentStatus;
import com.css.hotel.model.enums.RoomStatus;
import com.css.hotel.repository.BookingRepository;
import com.css.hotel.repository.GuestRepository;
import com.css.hotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Transactional
    public Booking createBooking(BookingRequestDTO request) {

        // BUG FIX: Date Validation
        if (request.getCheckOutDate().isBefore(request.getCheckInDate()) || request.getCheckOutDate().isEqual(request.getCheckInDate())) {
            throw new RuntimeException("Invalid Dates: Check-out date must be after the Check-in date.");
        }

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new RuntimeException("Room is not available for booking");
        }

        Guest guest = new Guest();
        guest.setName(request.getGuestName());
        guest.setContactNumber(request.getContactNumber());
        guest.setIdProofType(request.getIdProofType());
        guest.setIdProofNumber(request.getIdProofNumber());
        guest = guestRepository.save(guest);

        Booking booking = new Booking();
        booking.setGuest(guest);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());

        long nights = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        booking.setTotalNights((int) nights);

        BigDecimal totalCharge = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));
        booking.setTotalAmount(totalCharge);

        BigDecimal advance = request.getAdvancePaid() != null ? request.getAdvancePaid() : BigDecimal.ZERO;
        booking.setAdvancePaid(advance);

        BigDecimal remaining = totalCharge.subtract(advance);
        booking.setRemainingBalance(remaining);

        if (remaining.compareTo(BigDecimal.ZERO) <= 0) {
            booking.setPaymentStatus(PaymentStatus.PAID);
            booking.setRemainingBalance(BigDecimal.ZERO);
        } else if (advance.compareTo(BigDecimal.ZERO) > 0) {
            booking.setPaymentStatus(PaymentStatus.PARTIAL);
        } else {
            booking.setPaymentStatus(PaymentStatus.PENDING);
        }

        room.setStatus(RoomStatus.OCCUPIED);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking processCheckout(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Guest is already checked out!");
        }

        booking.setPaymentStatus(PaymentStatus.PAID);
        booking.setRemainingBalance(BigDecimal.ZERO);
        booking.setBookingStatus(BookingStatus.COMPLETED);

        Room room = booking.getRoom();
        room.setStatus(RoomStatus.AVAILABLE);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }
}