package com.kh.MINI.computer2.dao;

import com.kh.MINI.computer2.vo.ItemVO;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ItemDAO {

    private List<ItemVO> items = new ArrayList<>();

    public ItemVO saveItem(ItemVO item) {
        // 실제로는 데이터베이스에 저장하는 코드가 들어가야 함
        items.add(item);
        return item; // 임시 저장
    }

    public List<ItemVO> getAllItems() {
        return items; // 임시로 저장된 아이템 목록 반환
    }
}
