package com.css.hotel.controller;

import com.css.hotel.dto.BookingRequestDTO;
import com.css.hotel.model.Booking;
import com.css.hotel.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*") // Allows your Next.js frontend to talk to this API
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Endpoint to create a new booking
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequestDTO request) {
        try {
            Booking booking = bookingService.createBooking(request);
            return new ResponseEntity<>(booking, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint to get all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // Endpoint to process a check-out
    @PutMapping("/{id}/checkout")
    public ResponseEntity<?> checkoutGuest(@PathVariable Long id) {
        try {
            Booking updatedBooking = bookingService.processCheckout(id);
            return ResponseEntity.ok(updatedBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}