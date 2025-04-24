import './App.css';

import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
const AboutUsPage = lazy(()=>import( './pages/AboutUs'));
const ContactUs = lazy(()=>import("./pages/ContactUs")) ;
const Navbar = lazy(() =>import('./componants/Navbar'));
const Home = lazy(()=>import('./pages/Home'))
const Single = lazy(()=> import('./pages/Single')) 
const Footer = lazy(()=> import('./componants/Footer'))
const SignUp = lazy(()=> import('./pages/SignUp'))
const Login = lazy(()=> (import('./pages/Login')))
const BlogsByCategories = lazy(()=> import('./pages/Categories'))
const Dashboard = lazy(()=>import('./pages/Dashboard'))
const CreateBlog = lazy(()=>import('./pages/CreateBlog'))
const UpdateBlog = lazy(()=> import ('./pages/UpdateBlog'));
const Profile = lazy(()=>import('./pages/Profile'))

const Layout = ()=>{
  return(
    <Suspense fallback = {"Loading..."}>
    <Navbar/>
    <Outlet/>
    <Footer/>
    <ToastContainer/>
    </Suspense>
  )
}
const AdminDashboard = ()=>{
  return(
  <Suspense fallback={"Loading..."}>
    <Outlet/>
    <ToastContainer/>
  </Suspense>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path: "/",
        element:<Home/>,
      },
      {
        path: "/Login",
        element:<Login/>,
      },
      {
        path: "/post/:id",
        element:<Single/>,
      },
      {
        path: "/SignUp",
        element:<SignUp/>,
      },
      {
        path: "/category/:category",
        element:<BlogsByCategories/>,
      },
      {
        path: "/AboutUs",
        element:<AboutUsPage/>,
      },
      {
        path: "/ContactUs",
        element:<ContactUs/>,
      },
    ]
  },{
    path: "/Admin",
    element:<AdminDashboard/>,
    children:[{
      path: "/Admin/Dashboard",
        element:<Dashboard/>,
    },
    {
      path: "/Admin/createblog",
        element:<CreateBlog/>,
    },
    {
      path: "/Admin/Update/:id",
      element: <UpdateBlog/>
    },
    {
      path: "/Admin/profile/:id",
      element: <Profile/>
    }
  
  ]
  },
]);
function App() {
  return (
   
    <RouterProvider router={router} />
  );
}

export default App;
