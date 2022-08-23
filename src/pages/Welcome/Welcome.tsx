import React, { FC, ReactNode, useContext } from 'react'
import Darkreader from 'react-darkreader';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../../assets/svg/group.svg'
import { StoreContext } from '../../context';
import { flexer, maxWidth } from '../../styles/globalStyles';

interface Props {
  children?: ReactNode
}

const Welcome:FC<Props> = ({ children }) => {
  const { user,handleContext,theme,token } = useContext(StoreContext)

  const logout = () => {
    localStorage.clear()
    handleContext('user',undefined)
    handleContext('token',undefined)
  }

  const handleThemeChange = (checked:boolean) => {
    handleContext('theme',checked ? 'dark' : 'light')
  }

  return (
    <div className="h-full">
      <header className={"relative p-5"}>
        <div className={"relative z-10" + flexer + maxWidth}>
          <h3 className="text-white font-extrabold text-xl" >Company Z</h3>
          <ul className={"w-6/12 lg:w-2/6"+flexer}>
            {
              !token ?
               <>
                <li className='text-white'>
                  <NavLink className="px-3 py-2 rounded-md" to="/">
                    Sign In
                  </NavLink>
                </li>
                <li className='text-white'>
                  <NavLink className="px-3 py-2 rounded-md" to="/signup">
                    Sign up
                  </NavLink>
                </li>
               </>:
               <>   
                  {
                    user?.status === '3' ?
                    <li className='text-white'>
                      <NavLink className="px-3 py-2 rounded-md" to="/profile">
                        Profile
                      </NavLink>
                    </li> : <li/>
                  }
                  <li className='text-white' onClick={logout}>
                    <NavLink className="px-3 py-2 rounded-md" to="/">
                      Sign Out
                    </NavLink>
                  </li>
                </>
              }
            <li>
              <Darkreader defaultDarken={theme === 'dark'} onChange={handleThemeChange} />
            </li>
          </ul>
        </div>
        <div className="z-0 absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark " />
      </header>
      <div className={"mx-auto pt-10 pb-20 px-50 lg:px-96  h-full overflow-y-scroll"}>
        { children || <Outlet /> }
      </div>
      <img  src={Logo} alt="" className='fixed bottom-0 right-0' />
    </div>
  )
}

export default Welcome
