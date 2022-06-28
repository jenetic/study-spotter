package com.google.sps.data;

public final class Review {
    private final long id;
    private final String rating;
    private final String description;

    public Review(long id, String rating, String description) {
        this.id = id;
        this.rating = rating;
        this.description = description;
    }
}