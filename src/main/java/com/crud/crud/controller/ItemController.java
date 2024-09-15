package com.crud.crud.controller;

import com.crud.crud.model.Item;
import com.crud.crud.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @PostMapping
    public Item addItem(@RequestParam String itemName){
        Item item = new Item();
        item.setItemName(itemName);
        return itemService.addItem(item);
    }

    @PutMapping
    public Item updateItem(@RequestParam Long id, @RequestParam String itemName){
        Item updateItem = new Item();
        updateItem.setItemName(itemName);
        return  itemService.updateItem(id, updateItem);
    }

    @DeleteMapping
    public void deleteItem(@RequestParam Long id){
        itemService.deleteItem(id);
    }
}
