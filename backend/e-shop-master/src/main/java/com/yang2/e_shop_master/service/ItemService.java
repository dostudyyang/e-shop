package com.yang2.e_shop_master.service;

import com.yang2.e_shop_master.dao.ItemRepository;
import com.yang2.e_shop_master.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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


    public Page<Item> sortItems(List<Item> items, String sortBy, String direction, int page, int size) {
        // Sort the items
        Comparator<Item> comparator = createComparator(sortBy, direction);
        items.sort(comparator);

        // Paginate the items
        int start = page * size;
        int end = Math.min(start + size, items.size());
        List<Item> paginatedItems = items.subList(start, end);

        // Return as a Page object
        return new PageImpl<>(paginatedItems, PageRequest.of(page, size), items.size());
    }

    private Comparator<Item> createComparator(String sortBy, String direction) {
        Comparator<Item> comparator;

        // Determine the field to sort by
        switch (sortBy) {
            case "price":
                comparator = Comparator.comparing(Item::getPrice);
                break;
            case "name":
            default:
                comparator = Comparator.comparing(Item::getName, String.CASE_INSENSITIVE_ORDER);
                break;
        }

        // Reverse if direction is "desc"
        if ("desc".equalsIgnoreCase(direction)) {
            comparator = comparator.reversed();
        }

        return comparator;
    }


    public void updateItemQuantity(Long itemId, Integer quantity) throws Exception {

        Optional<Item> item = itemRepository.findById(itemId);
        if (!item.isPresent()){
            throw new Exception("Item is not exist!");
        }

        item.get().setQuantity(quantity);
        itemRepository.save(item.get());
    }

}
