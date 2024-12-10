package com.kh.MINI.admin3.vo3;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ResponseMessage {
    private boolean success;
    private String message;

    // 생성자, getter, setter
    public ResponseMessage(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
