package com.css.hotel.repository;

import com.css.hotel.model.Room;
import com.css.hotel.model.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    // Custom query to find rooms by their status
    List<Room> findByStatus(RoomStatus status);
}