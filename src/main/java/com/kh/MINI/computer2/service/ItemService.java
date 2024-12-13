package com.kh.MINI.computer2.service;

import com.kh.MINI.computer2.dao.ItemDAO;
import com.kh.MINI.computer2.vo.ItemVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemDAO itemDAO;

    public ItemVO createItem(ItemVO item) {
        return itemDAO.saveItem(item);
    }

    public List<ItemVO> getAllItems() {
        return itemDAO.getAllItems();
    }
}
