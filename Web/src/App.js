// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, {  } from 'react'
// import { useDispatch } from 'react-redux'
import ContextProvider from './context/context';
import Layout from './components/Layout/Layout';
// import { token } from "./store/slices/userSlice"
 
function App() { 
  // const dispatch = useDispatch()  

  // useEffect(() => {
  //   try { 
  //     dispatch(token())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])
  return (
    <ContextProvider >
      <Layout />
    </ContextProvider>
  );
}

export default App;
