package com.css.hotel.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "guests")
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String contactNumber;

    private String idProofType; // e.g., Aadhar, Passport
    private String idProofNumber;
}