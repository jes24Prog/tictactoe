package com.api.data.model;
import jakarta.persistence.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class Item {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private int qty;
    private String itemDateCreated;

    public Item(){
        Date createDate = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd:HH:mm");
        this.itemDateCreated = formatter.format(createDate);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemName() {
        return itemName;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public String getItemDateCreated() {
        return itemDateCreated;
    }
}
