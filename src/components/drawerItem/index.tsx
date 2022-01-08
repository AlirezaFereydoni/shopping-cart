// style
import { DrawerItemWrapper } from "./style";

// components
import { Button } from "@mui/material";

// types
import { iProduct } from "../../types/interfaces";

interface iDrawerItem {
  item: iProduct;
  addToCart: (clickedItem: iProduct) => void;
  removeFromCart: (id: number) => void;
}

const DrawerItem: React.FC<iDrawerItem> = ({ item, addToCart, removeFromCart }) => {
  return (
    <DrawerItemWrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          {/* <p>Total: ${(item.amount * item.price).toFixed(2) }</p> */}
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          {/* {item.amount} */}
          <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}>
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </DrawerItemWrapper>
  );
};

export { DrawerItem };
