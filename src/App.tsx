// hooks
import { useState, useEffect } from "react";
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
  const [total, setTotal] = useState(0);
  const { data, isLoading, error } = useQuery<iProduct[]>("products", getProducts);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => acc + item.amount!, 0));
  }, [cartItems]);

  const addToCartHandler = (clickedItem: iProduct) => {
    let itemsInstance = [...cartItems];
    let isExist: boolean = false;

    for (const i in itemsInstance) {
      if (itemsInstance[i].id === clickedItem.id) {
        itemsInstance.splice(Number(i), 1, {
          ...itemsInstance[i],
          amount: itemsInstance[i].amount! + 1,
        });
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      setCartItems([...cartItems, { ...clickedItem, amount: 1 }]);
    } else {
      setCartItems(itemsInstance);
    }
  };

  const removeFromCartHandler = (cartId: number) => {
    for (const i in cartItems) {
      if (cartItems[i].id === cartId && cartItems[i].amount === 1) {
        setCartItems([...cartItems.filter(item => item.id !== cartId)]);
        return;
      }

      if (cartItems[i].id === cartId && cartItems[i].amount! > 1) {
        let itemsCopy = [...cartItems];
        itemsCopy.splice(Number(i), 1, { ...cartItems[i], amount: cartItems[i].amount! - 1 });
        setCartItems(itemsCopy);
        return;
      }
    }
  };

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
        <Badge badgeContent={total} color="error">
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
