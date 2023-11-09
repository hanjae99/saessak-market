package com.saessak.admin;


import com.saessak.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

  private final ImageRepository imageRepository;


  public Page<AdminImageDTO> getImageList(Pageable pageable) {

    return imageRepository.getAdminImagePage(pageable);

  }
}
