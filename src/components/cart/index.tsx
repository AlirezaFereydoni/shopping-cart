// type
import { Button } from "@mui/material";
import { iProduct } from "../../types/interfaces";

// style
import { CardWrapper } from "./style";

interface iCard {
  item: iProduct;
  add: (clickedItem: iProduct) => void;
}

const Cart: React.FC<iCard> = ({ item, add }) => {
  return (
    <CardWrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>

      <Button onClick={() => add(item)}>Add to cart</Button>
    </CardWrapper>
  );
};

export { Cart };
