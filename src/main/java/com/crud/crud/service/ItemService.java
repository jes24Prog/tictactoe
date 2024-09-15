package com.crud.crud.service;
import com.crud.crud.model.Item;
import com.crud.crud.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    public Item addItem(Item item){
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, Item newItem) {
        Optional<Item> existingItemOpt = itemRepository.findById(id);
        if (existingItemOpt.isPresent()) {
            Item existingItem = existingItemOpt.get();
            existingItem.setItemName(newItem.getItemName());
            return itemRepository.save(existingItem);
        } else {
            throw new RuntimeException("Item not found with id " + id);
        }
    }

    public void deleteItem(Long id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
        } else {
            throw new RuntimeException("Item not found with id " + id);
        }
    }
}
