import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ProductProvider from "./context/productContext";
import Navbar from "./scenes/navbar";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query) => {
      if (query.meta?.errorMessage) {
        toast.error(
          (query.meta.errorMessage as unknown as string) ??
          "Something went wrong!"
        );
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ProductProvider>
    <QueryClientProvider client={ queryClient }>
      <Navbar />
      <RouterProvider router={ router } />
      <Toaster />
    </QueryClientProvider>
  </ProductProvider>
);
