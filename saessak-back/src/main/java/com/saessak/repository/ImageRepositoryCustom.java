package com.saessak.repository;

import com.saessak.admin.AdminImageDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ImageRepositoryCustom {
  Page<AdminImageDTO> getAdminImagePage(Pageable pageable);

}
