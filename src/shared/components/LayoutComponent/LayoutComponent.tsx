import React from "react";

type LayoutProps = {
    children: React.ReactNode
}

export const LayoutComponent = (props: LayoutProps) => {
    const { children } = props;
    const [navbarComponent, outletContent] = React.Children.toArray(children);


    return (
        <div>
            {navbarComponent}
            <div className="container">
                {outletContent}
            </div>
        </div>
    );
}

LayoutComponent.NavbarContent = function NavbarContent(props: LayoutProps) {
    return (
        <>
            {props.children}
        </>
    )
}

LayoutComponent.OutLetContent = function OutLetContent(props: LayoutProps) {
    return (
        <>
            <div className="mt-3">
                {props.children}
            </div>
        </>
    )
}