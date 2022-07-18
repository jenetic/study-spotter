package com.google.sps.data;

public final class Review {
    private final long id;
    private final long timestamp;
    private final String college;
    private final String location;
    private final String name;
    private final double rating;
    private final String description;

    public Review(
                long id,
                long timestamp, 
                String college,
                String location,
                String name, 
                double rating, 
                String description) {
        this.id = id;
        this.timestamp = timestamp;
        this.college = college;
        this.location = location;
        this.name = name;
        this.rating = rating;
        this.description = description;
    }
}