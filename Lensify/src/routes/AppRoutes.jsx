import { Routes, Route } from "react-router-dom";

/* Layout */
import Layout from "../components/layout/Layout";

/* Auth */
import Login from "../pages/Auth/Login";

/* Dashboard */
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/Auth/Register";

/* Customers */
import CustomerList from "../pages/Customers/CustomerList";
import AddCustomer from "../pages/Customers/AddCustomer";
import EditCustomer from "../pages/Customers/EditCustomer";
import CustomerDetails from "../pages/Customers/CustomerDetails";

/* Prescriptions */
import PrescriptionList from "../pages/Prescriptions/PrescriptionList";
import AddPrescription from "../pages/Prescriptions/AddPrescription";
import ViewPrescription from "../pages/Prescriptions/ViewPrescription";
import EditPrescription from "../pages/Prescriptions/EditPrescription";

/* Receipts */
import ReceiptList from "../pages/Receipts/ReceiptList";
import CreateReceipt from "../pages/Receipts/CreateReceipt";
import ViewReceipt from "../pages/Receipts/ViewReceipt";
import EditReceipt from "../pages/Receipts/EditReceipt";

/* Search */
import SearchPage from "../pages/Search/SearchPage";

/* Users */
import UserList from "../pages/Users/UserList";

import EditUser from "../pages/Users/EditUser";

/* Inventory */
import ProductList from "../pages/Products/ProductList";
import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";
import CategoryList from "../pages/Categories/CategoryList";
import AddCategory from "../pages/Categories/AddCategory";
import EditCategory from "../pages/Categories/EditCategory";

/* Appointments */
import AppointmentList from "../pages/Appointments/AppointmentList";
import AddAppointment from "../pages/Appointments/AddAppointment";
import ViewAppointment from "../pages/Appointments/ViewAppointment";
import EditAppointment from "../pages/Appointments/EditAppointment";

/* Reports */
import Reports from "../pages/Reports/Reports";

/* Settings */
import Settings from "../pages/Settings/Settings";

/* Not Found */
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />


      {/* PRIVATE ROUTES */}
      <Route element={<Layout />}>

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />}/>

        {/* Customers */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />

        {/* Prescriptions */}
        <Route path="/prescriptions" element={<PrescriptionList />} />
        <Route path="/prescriptions/add" element={<AddPrescription />} />
        <Route path="/prescriptions/:id" element={<ViewPrescription />} />
        <Route path="/prescriptions/edit/:id" element={<EditPrescription />}/>

        {/* Receipts */}
        <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/receipts/create" element={<CreateReceipt />} />
        <Route path="/receipts/:id" element={<ViewReceipt />} />
        <Route path="/receipts/edit/:id" element={<EditReceipt />}/>

        {/* Search */}
        <Route path="/search" element={<SearchPage />} />

        {/* User Management */}
        <Route path="/users" element={<UserList />} />
   
        <Route path="/users/edit/:id" element={<EditUser />} />

        {/* Inventory */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />}/>
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/add"  element={<AddCategory />}/>
        <Route path="/categories/edit/:id" element={<EditCategory />}/>

        {/* Appointments */}
       <Route path="/appointments" element={<AppointmentList />} />

      <Route path="/appointments/add" element={<AddAppointment />} />

      <Route path="/appointments/view/:id" element={<ViewAppointment />} />

      <Route path="/appointments/edit/:id" element={<EditAppointment />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />

      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
