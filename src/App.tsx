// hooks
import { useState } from "react";
import { useQuery } from "react-query";

// styles
import { AppWrapper, StyledButton } from "./AppStyle";

// types
import { iProduct } from "./types/interfaces";

// components
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Cart } from "./components/cart";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";

const getProducts = async () => await (await fetch("https://fakestoreapi.com/products")).json();

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<iProduct[]>([]);
  const { data, isLoading, error } = useQuery<iProduct[]>("products", getProducts);

  // const getTotalItem = (items: iProduct[]) => items.reduce((acc: number, item) => acc + item);
  const addToCartHandler = (clickedItem: iProduct) => {
    setCartItems([...cartItems, clickedItem]);
  };
  // const remoteFromCartHandler = () => null

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something went wrong...</div>;

  return (
    <AppWrapper>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        Cart goes here
      </Drawer>

      <StyledButton onClick={() => setIsOpen(true)}>
        <Badge badgeContent={cartItems.length} color="error">
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
