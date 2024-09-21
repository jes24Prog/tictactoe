package com.api.data.service;

import com.api.data.model.Item;
import com.api.data.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    public Optional<Item> getItemsById(long id){
        return itemRepository.findById(id);
    }

    public Item addItem(Item item){
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, String itemName){
       Optional<Item> existingItemCheck = itemRepository.findById(id);

       if(existingItemCheck.isPresent()){
           Item existingItem = existingItemCheck.get();
           existingItem.setItemName(itemName);
           return itemRepository.save(existingItem);
       }else{
           throw new RuntimeException("Item Not Found" + id);
       }
    }

    public Item updateItemQty(Long id, String itemName, int qty){
        Optional<Item> existingItemCheck = itemRepository.findById(id);

        if(existingItemCheck.isPresent()){
            Item existingItem = existingItemCheck.get();
            existingItem.setItemName(itemName);
            existingItem.setQty(qty);
            return itemRepository.save(existingItem);
        }else{
            throw new RuntimeException("Item Not Found" + id);
        }
    }

    public void deleteItemById(long id){
        itemRepository.deleteById(id);
    }

    public boolean isIdUnique(Long id) {
        return !itemRepository.existsById(id);
    }

    public Long generateUniqueId() {
        Random random = new Random();
        Long id;
        do {
            id = 1000L + random.nextInt(9000); // Generate a 4-digit number between 1000 and 9999
        } while (!isIdUnique(id));
        return id;
    }
}
