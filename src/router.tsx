import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./components/cart";
import ProductDetails from "./components/productDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/cart",
    element: (
      <Cart />
    )
  },
  {
    path: "/product-detail/:id",
    element: (
      <ProductDetails />
    )
  },
  //   children: [
  //     {
  //       index: true,
  //       element: <Home />,
  //     },
  //     {
  //       path: "employees",
  //       element: <Outlet />,
  //       children: [
  //         {
  //           index: true,
  //           element: <Employees />,
  //         },
  //         {
  //           path: ":empId",
  //           element: <EmployeeDetail />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "leaves",
  //       element: <Leaves />,
  //     },
  //     {
  //       path: "locations",
  //       element: <Locations />,
  //     },
  //     {
  //       path: "success",
  //       element: <Success />,
  //     },
  //     {
  //       path: "employeedata",
  //       element: <Employeedata />,
  //     },
  //     {
  //       path: "leave-activity",
  //       element: <EmployeeActivity />,
  //     },
  //   ],
  // },
  // {
  //   path: "login",
  //   element: <Auth />,
  // },
]);

export default router;
