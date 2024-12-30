import './App.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Context from './Context/Context';


function App() {
 return (
         <>    
                <Context.Provider>
                         
                <ToastContainer
                            position="top-center"
                             autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
               
              />
                <main>
                    <Outlet/>
                </main>
                   
                </Context.Provider>
          </>
  )
}

export default App
