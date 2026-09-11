package com.ooadcraft.dto;

public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String university;
    private String department;
    private Integer batchYear;
    private String role;

    public UserDto() {}

    public UserDto(Long id, String email, String name, String university, String department, Integer batchYear, String role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.university = university;
        this.department = department;
        this.batchYear = batchYear;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getBatchYear() {
        return batchYear;
    }

    public void setBatchYear(Integer batchYear) {
        this.batchYear = batchYear;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
