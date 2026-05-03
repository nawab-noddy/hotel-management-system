package com.css.hotel.controller;

import com.css.hotel.model.Room;
import com.css.hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*") // Allows your Next.js frontend to talk to this API
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Endpoint to get all rooms
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    // Endpoint to add a new room
    @PostMapping
    public ResponseEntity<Room> addRoom(@RequestBody Room room) {
        Room createdRoom = roomService.addRoom(room);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }
}