package com.css.hotel.model;

import com.css.hotel.model.enums.RoomStatus;
import com.css.hotel.model.enums.RoomType;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    private Integer capacity;

    private BigDecimal pricePerNight;

    @Enumerated(EnumType.STRING)
    private RoomStatus status = RoomStatus.AVAILABLE; // Default status
}