package com.api.data.controller;

import com.api.data.model.Item;
import com.api.data.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item")
@CrossOrigin("*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public Optional<Item> getItemById(@PathVariable Long id){
        return itemService.getItemsById(id);
    }

    @PostMapping
    public Item addItem(@RequestParam String itemName){
        Item item = new Item();
        item.setId(itemService.generateUniqueId());
        item.setItemName(itemName);
        item.setQty(0);
        return itemService.addItem(item);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestParam String itemName){
        return itemService.updateItem(id, itemName);
    }

    @PutMapping("/qty/{id}")
    public Item updateItemQty(@PathVariable Long id, @RequestParam String itemName, @RequestParam int qty){
        return itemService.updateItemQty(id, itemName, qty);
    }

    @DeleteMapping
    public void deleteItem(@RequestParam Long id){
        itemService.deleteItemById(id);
    }
}
