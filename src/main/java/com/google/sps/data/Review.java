package com.google.sps.data;

public final class Review {
    private final long id;
    private final long timestamp;
    private final String name;
    private final String rating;
    private final String description;

    public Review(
                long id,
                long timestamp, 
                String name, 
                String rating, 
                String description) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.rating = rating;
        this.description = description;
    }
}