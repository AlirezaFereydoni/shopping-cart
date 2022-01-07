import { useQuery } from "react-query";

// types
import { iProduct } from "./types/interfaces";

// components
import { LinearProgress } from "@mui/material";

const getProducts = async () => await (await fetch("https://fakestoreapi.com/products")).json();

const App: React.FC = () => {
  const { data, isLoading, error } = useQuery<iProduct[]>("products", getProducts);

  console.log(data);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something went wrong...</div>;

  return <div className="App">hello</div>;
};

export default App;
