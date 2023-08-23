import React from 'react'
import { useRef, useState } from 'react'
import { Avatar } from 'antd';


const ImgUpdate = () => {
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const fileInput = useRef(null);

  
  const onChange = (e) =>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }else{
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
      return
    }
    const reader = new FileReader();

    reader.onload = () => {
      if(reader.readyState === 2){
        setImage(reader.result)
      }
    }
    
    reader.readAsDataURL(e.target.files[0])
  }
  return(
    <div>
    <Avatar 
          src={Image} 
          style={{margin:'20px'}} 
          size={200} 
          onClick={()=>{fileInput.current.click()}}/>
    <input type="file"  style={{display:'none'}} accept='image/jpg,image/png,image/jpeg' name='profile_ing' onChange={onChange} ref={fileInput}/>
    </div>
    )
}


export default ImgUpdate