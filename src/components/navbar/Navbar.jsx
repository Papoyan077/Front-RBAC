import * as React from 'react';
import "./style.css"
import NavbarModuleList from './NavbarModuleList';
export default function Navbar() {
  return (
    <nav  id='navbar'>
        <div className="border-blue" style={{height: "100%"}}>
            <NavbarModuleList/>
        </div>
    </nav>
  )
}
