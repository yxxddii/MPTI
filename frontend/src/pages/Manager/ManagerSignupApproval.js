import React, { useEffect, useState } from 'react';
import styles from './ManagerSignupApproval.module.css';
import trainerImg from '../../assets/img/trainer.PNG';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signupTrainerList, signupApproval } from '../../store/admin';
import Pagination from './Pagination'



const ManagerSignupApproval = () => {
    const [signupList, setSignupList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const dispatch =useDispatch();
    
    useEffect( ()=>{
    //가입신청 리스트
    dispatch(signupTrainerList(0)).then((res)=> setSignupList(res.slice(0,4)))
    }, [])
   

    //가입 승인 반려 신청 (승인, 반려 신청 반응 ok but 신청 목록이 변함이 없음)
    const approveHandler = (email)=>{
        if(window.confirm("가입신청을 승인 하시겠습니까?")){
            console.log(email);
            dispatch(signupApproval({email:email, approved: true}))
        }else{
            return;
        }
    }
    const negativeHandler = (email)=>{
        if(window.confirm("가입신청을 거절 하시겠습니까?")){
            dispatch(signupApproval({email:email, approved: false}))
        }else{
            return;
        }
    }

    return (
        <>
                <div className={styles.info_content_box}>
                    <div className={styles.content_title}>가입승인 <span className={styles.square}>&#9660;</span></div>
                     <span>MPTI에 지원하신 트레이너님들의 목록을 확인하세요</span>
                    <div className={styles.content_content}>
              
                        <ul className={styles.content_list}>
                            {signupList.map(it=>{

                                    
                                    return(
                                        <li  key={it.email} className={styles.content_item}>
                                        <div className={styles.item_img}>
                                        <img src={trainerImg}></img>
                                        </div>
        
                                        <div className={styles.item_info_box}>
                                            <div className={styles.item_info} > 
                                                <div>신청자 성명: {it.name}</div>
                                                <div>E-MAIL: {it.email} </div>
                                                <div>생년월일 : {it.birthday}</div>
                                                <div>수상내역 : {it.awards}</div>
                                                <div>자격증 : {it.license}</div>
                                                <div>근무이력 : {it.career}</div>
                                            </div>
        
                                            <div className={styles.item_btn}>
                                                <button className={styles.btn_positive} onClick={()=>approveHandler(it.email)}>승인</button>
                                                <button className={styles.btn_negative} onClick={()=>negativeHandler(it.email)}>거절</button>
                                            </div>
                                        </div>
      
                                    </li>
                                    )
                                     
                            })}
                        </ul>
                        
                    </div>
                    <div className={styles.pagenation}>

                    <h1>Page {currentPage} of {totalPages}</h1>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
                        
                    </div>
                </div>
       </>
    );
};

export default ManagerSignupApproval;

          