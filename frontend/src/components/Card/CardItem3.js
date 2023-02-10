import styles from "./CardItem3.module.css"

function CardItem3(props) {
  const name = props.name;
  const gender = props.gender;
  const age = props.age;
  const time = props.time;
  const picture = props.picture;
  const setTargetClient = props.setTargetClient;
    return (
      <div className={styles.card_item}>
        <img className={styles.card_item_img} src="/profilepic.png" alt="profile"></img>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>성명</div>
          <div className={styles.card_item_info_txt}>성별/나이</div>
          <div className={styles.card_item_info_txt}>핸드폰 번호</div>
        </div>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>{props.name}</div>
          <div className={styles.card_item_info_txt}>({props.gender}), {age}세</div>
          <div>{props.phone}</div>
        </div>
        <button className={styles.button} onClick={()=>{setTargetClient(props.email)}}>관리</button>
      </div>
    );
  }
  
  export default CardItem3;