import { Outlet } from "react-router"
import { LayoutComponent } from "../shared/components/LayoutComponent/LayoutComponent"
import { NavbarComponent } from "../shared/components/Navbar/NavbarComponent"

export const Layout = () => {
    return (
        <LayoutComponent>
            <LayoutComponent.NavbarContent>
                <NavbarComponent />
            </LayoutComponent.NavbarContent>
            <LayoutComponent.OutLetContent>
                <Outlet />
            </LayoutComponent.OutLetContent>
        </LayoutComponent>
    )
}