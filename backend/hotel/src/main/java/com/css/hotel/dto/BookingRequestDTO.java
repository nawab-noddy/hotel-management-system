package com.css.hotel.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BookingRequestDTO {
    // Guest Details
    private String guestName;
    private String contactNumber;
    private String idProofType;
    private String idProofNumber;

    // Booking Details
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    // Initial Payment
    private BigDecimal advancePaid;
}