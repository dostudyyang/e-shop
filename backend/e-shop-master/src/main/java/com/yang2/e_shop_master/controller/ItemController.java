package com.yang2.e_shop_master.controller;


import com.yang2.e_shop_master.entity.Item;
import com.yang2.e_shop_master.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/items")
public class ItemController {

    private ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    /**
     *
     * @param name
     * @param sortBy price or name
     * @param direction asc or desc
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/find/findByName")
    public Page<Item> findByName(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "5") int size){

        Sort sort = createSort(sortBy, direction);

        Pageable pageable = PageRequest.of(page, size, sort);
        return itemService.findByNameContainingIgnoreCase(name, pageable);
    }

    /**
     *
     * @param category
     * @param sortBy price or name
     * @param direction asc or desc
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/find/findByCategory")
    public Page<Item> findByCategory(
            @RequestParam(value = "category") String category,
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "5") int size){

        Sort sort = createSort(sortBy, direction);

        Pageable pageable = PageRequest.of(page, size, sort);
        return itemService.findByCategory(category, pageable);
    }
    /**
     *
     * @param brand
     * @param sortBy price or name
     * @param direction asc or desc
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/find/findByBrand")
    public Page<Item> findByBrand(
            @RequestParam(value = "brand") String brand,
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "direction", required = false) String direction,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "5") int size){

        Sort sort = createSort(sortBy, direction);

        Pageable pageable = PageRequest.of(page, size, sort);
        return itemService.findByBrand(brand, pageable);
    }

    @PutMapping("/update/itemQuantity")
    public void updateItemQuantity(@RequestParam("itemId") Long itemId, @RequestParam("quantity") Integer quantity) throws Exception {
        itemService.updateItemQuantity(itemId, quantity);
    }

    private Sort createSort(String sortBy, String direction){
        if (sortBy != null && !sortBy.isEmpty()) {
            if (direction != null && !direction.isEmpty()) {
                return Sort.by(Sort.Direction.fromString(direction), sortBy);
            } else {
                return Sort.by(sortBy).ascending();
            }
        }
        return Sort.unsorted();
    }
}
