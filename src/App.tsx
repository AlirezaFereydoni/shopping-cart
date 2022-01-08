// hooks
import { useState } from "react";
import { useQuery } from "react-query";

// styles
import { AppWrapper, StyledButton } from "./AppStyle";

// types
import { iProduct } from "./types/interfaces";

// components
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DrawerSection from "./components/drawer";
import { Cart } from "./components/cart";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";

const getProducts = async () => await (await fetch("https://fakestoreapi.com/products")).json();

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<iProduct[]>([]);
  const { data, isLoading, error } = useQuery<iProduct[]>("products", getProducts);

  const addToCartHandler = (clickedItem: iProduct) => {
    let isExist: boolean = false;
    let ExistItem: iProduct = {} as iProduct;

    for (const i in cartItems) {
      if (cartItems[i].id === clickedItem.id) {
        isExist = true;
        ExistItem = cartItems[i];
      }
    }

    if (isExist) {
      setCartItems([...cartItems, { ...clickedItem, amount: ExistItem.amount! + 1 }]);
    } else {
      setCartItems([...cartItems, { ...clickedItem, amount: 1 }]);
    }
  };

  const removeFromCartHandler = (cartId: number) => {
    for (const i in cartItems) {
      if (cartItems[i].id === cartId && cartItems[i].amount === 1) {
        setCartItems([...cartItems.splice(Number(i), 1)]);
        return;
      }

      if (cartItems[i].id === cartId && cartItems[i].amount! > 1) {
        setCartItems([
          ...cartItems.splice(Number(i), 1, { ...cartItems[i], amount: cartItems[i].amount! - 1 }),
        ]);
        return;
      }
    }
  };

  const getTotalItems = (items: iProduct[]) => items.reduce((acc, item) => acc + item.amount!, 0);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something went wrong...</div>;

  return (
    <AppWrapper>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerSection
          items={cartItems}
          addToCart={addToCartHandler}
          removeFromCart={removeFromCartHandler}
        />
      </Drawer>

      <StyledButton onClick={() => setIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Cart item={item} add={addToCartHandler} />
          </Grid>
        ))}
      </Grid>
    </AppWrapper>
  );
};

export default App;
