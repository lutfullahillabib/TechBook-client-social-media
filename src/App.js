// import logo from './logo.svg';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Components/Pages/Routes/Routes';

function App() {



  return (

    <div className="App bg-black">
      <RouterProvider router={router}></RouterProvider>
    </div>

  );
}

export default App;

