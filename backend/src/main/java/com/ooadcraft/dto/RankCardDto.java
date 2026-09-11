package com.ooadcraft.dto;

public class RankCardDto {
    private String title;
    private int rank;
    private int change; // e.g. +3 positions

    public RankCardDto() {}

    public RankCardDto(String title, int rank, int change) {
        this.title = title;
        this.rank = rank;
        this.change = change;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getChange() {
        return change;
    }

    public void setChange(int change) {
        this.change = change;
    }
}
