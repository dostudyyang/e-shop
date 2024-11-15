package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.ItemRepository;
import com.yang2.e_shop_master.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ItemService {

    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Page<Item> findByNameContainingIgnoreCase(String name, Pageable pageable){
        return itemRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Item> findByCategory(String category, Pageable pageable){
        return itemRepository.findByCategory(category, pageable);
    }

    public Page<Item> findByBrand(String brand, Pageable pageable){
        return itemRepository.findByBrand(brand, pageable);
    }

}
