package com.saessak.detail.dto;

import com.saessak.constant.Gender;
import com.saessak.constant.Role;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
public class DetailMemberDTO {
    private Long MemberId;
    private String nickName;
    private List<MemberProductDTO> productDTOList;
}
