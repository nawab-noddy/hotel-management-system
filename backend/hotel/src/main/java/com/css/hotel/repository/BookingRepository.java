package com.css.hotel.repository;

import com.css.hotel.model.Booking;
import com.css.hotel.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Query to find active bookings
    List<Booking> findByBookingStatus(BookingStatus status);
}