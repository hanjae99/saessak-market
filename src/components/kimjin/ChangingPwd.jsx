import Password from 'antd/es/input/Password';
import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser } from '../../userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChangingPwd = () => {
  const movePage = useNavigate();
  const [password, setPassword] = useState('');
  const [massage, setMassage] = useState('');
  const users = useSelector(state => state.user);

  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const pwdChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.find(p => p.id === "jin").pwd === password) {
      movePage('/user/changing')
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }

    // dispatch({ type: "user/loginUser", payload: {id: "jin" , password} });
  };

  

  return (
    <div>
      <h2>비밀번호 확인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input type="text" placeholder={users[2].id}/>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={pwdChange} />
        </div>
        <button type='submit'>확인</button>
        <button onClick={() => movePage('/user/mypage')}>취소</button>
      </form>
      <p>{massage}</p>
    </div>

  )
}

export default ChangingPwd