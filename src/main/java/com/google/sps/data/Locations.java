package com.google.sps.data;

public final class Locations {
    private final long id;
    private final String name;
    private final String time;
    private final String description;

    public Locations(
                long id,
                String name, 
                String time, 
                String description) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.description = description;
    }
}