package com.example.saree.entity.user;


import jakarta.persistence.*;

@Entity
@Table(name="Roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Role() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }




}
