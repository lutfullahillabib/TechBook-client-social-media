// import logo from './logo.svg';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Components/Pages/Routes/Routes';
import Log from './Components/Pages/Shared/LeftNavInner/Log/Log';

function App() {



  return (

    <div className="App bg-black">

      <RouterProvider router={router}></RouterProvider>

      <Log />
      {/* <PostModal /> */}

      <Toaster />

    </div>

  );
}

export default App;

