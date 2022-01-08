// style
import { DrawerWrapper } from "./style";

// components
import { DrawerItem } from "../drawerItem";

// types
import { iProduct } from "../../types/interfaces";

interface iDrawer {
  items: iProduct[];
  addToCart: (item: iProduct) => void;
  removeFromCart: (id: number) => void;
}

const Drawer: React.FC<iDrawer> = ({ items, addToCart, removeFromCart }) => {
  return (
    <DrawerWrapper>
      <h2>Your Shopping Cart</h2>
      {items.length === 0 ? <p>No items in cart</p> : null}
      {items.map(item => (
        <DrawerItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </DrawerWrapper>
  );
};

export default Drawer;
