import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context"

function Card({
  id,
  onFavorite,
  onPlus,
  title,
  imageUrl,
  price,
  favorited = false,
  loading = false,
}) {

  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onCLickPlus = () => {
    onPlus(obj);

  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };


  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={200}
          height={250}
          viewBox="0 0 210 250"
          backgroundColor="#e8e8e8"
          foregroundColor="#fafafa"
        >
          <rect x="21" y="31" rx="10" ry="10" width="150" height="90" />
          <rect x="136" y="95" rx="0" ry="0" width="25" height="22" />
          <rect x="21" y="131" rx="5" ry="5" width="150" height="15" />
          <rect x="21" y="152" rx="5" ry="5" width="100" height="15" />
          <rect x="21" y="182" rx="5" ry="5" width="100" height="25" />
          <rect x="147" y="182" rx="5" ry="5" width="25" height="25" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (<div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={isFavorite ? "img/liked.svg" : "img/unliked.svg"}
              alt="Unlicked"
            />
          </div>)}
          <img width={133} height={112} src={imageUrl} alt="" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (<img
              onClick={onCLickPlus}
              src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
              alt="Plus"
              className={styles.plus}
            />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
