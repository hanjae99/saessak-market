package com.saessak.imgfile;

import lombok.extern.java.Log;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Log
public class FileService {

    public String uploadFile(String uploadPath, String originalFileName, byte[] fileData) throws Exception{

        File folder = new File(uploadPath);
        if (!folder.exists()) {
            try{
                if (folder.mkdir()) {
                    log.info("이미지 저장 폴더 생성 성공");
                } else {

                    File folder2 = new File(Arrays.stream(uploadPath.split("/")).limit(uploadPath.split("/").length-1).collect(Collectors.joining("/")));
                    if (folder2.mkdir()) {
                        if (folder.mkdir()) {
                            log.info("이미지 저장 폴더 생성 성공");
                        } else {
                            log.info("이미지 저장 폴더 생성 실패2");
                        }
                    } else {
                        log.info("이미지 저장 폴더 생성 실패");
                    }
                }
            }
            catch(Exception e){
                log.info(e.getMessage());
            }
        }

        UUID uuid = UUID.randomUUID();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String savedFileName = uuid.toString() + extension;
        String fileUploadFullUrl = uploadPath + "/" + savedFileName;
        FileOutputStream fos = new FileOutputStream(fileUploadFullUrl);
        fos.write(fileData);
        fos.close();

        return savedFileName;
    }

    public void deleteFile(String filePath)throws Exception{
        File deleteFile = new File(filePath);

        if (deleteFile.exists()){
            deleteFile.delete();
            log.info("파일을 삭제하였습니다.");
        }else {
            log.info("파일이 존재하지 않습니다.");
        }
    }

    // file 을 multipartfile 으로 변환하는 메소드
    public MultipartFile fileToMultipart(String filePath){

        try {
            File file = new File(filePath);
            FileItem fileItem = new DiskFileItem("changeMultipart", Files.probeContentType(file.toPath()),
                    false, file.getName(), (int) file.length(), file.getParentFile());
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
            MultipartFile multipartFile = new CommonsMultipartFile(fileItem);

            return multipartFile;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
