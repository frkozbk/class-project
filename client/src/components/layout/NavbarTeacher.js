import React from 'react'
import { Link } from 'react-router-dom'
import { Button} from 'reactstrap'
const NavbarTeacher = ({openCreateClassModal,image},handleLogout) => {
return (
    <nav>
    <Link className="nav-logo" to="/login">
        <img src={image} alt="logo" />
    </Link>

                <ul className="Navbar-Logged_menu">
                    <li>
                        <Button onClick={() => openCreateClassModal() } color="info">Sınıf Oluştur</Button>
                    </li>
                    <li>
                        <Link to="/classroom">Sınıflar</Link>
                    </li>
                    <li>
                        <Link to="/tasks">Ödevler</Link>
                    </li>
                    <li>
                        <Link to="/messages">Mesajlar</Link>
                    </li>

                    <li id="lastitem">
                        <Link to="/login" id="kayıt_ol" onClick={handleLogout}>
                            Çıkış Yap
                </Link>
                    </li>
                </ul>
            </nav>
)
}

export default NavbarTeacher
