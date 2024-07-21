import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

import "./navbar.css";

const NavbarComponent = () => {
  const menuItems = [
    { name: "Peliculas", to: "/" },
    { name: "Favoritos", to: "/favoritos" },
    { name: "Enviar propuesta 📩", to: "/enviar-propuesta" },
  ];

  const location = useLocation();

  return (
    <>
      <Navbar disableAnimation isBordered>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">GhibliApp</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarBrand>
            <p className="font-bold text-inherit">GhibliApp</p>
          </NavbarBrand>
          <NavbarItem isActive={location.pathname === "/"}>
            <Link
              to="/"
              aria-current={location.pathname === "/" ? "page" : undefined}
              className={
                location.pathname === "/" ? "text-primary" : "text-foreground"
              }
            >
              Films
            </Link>
          </NavbarItem>

          <NavbarItem isActive={location.pathname === "/favoritos"}>
            <Link
              to="/favoritos"
              aria-current={
                location.pathname === "/favoritos" ? "page" : undefined
              }
              className={
                location.pathname === "/favoritos"
                  ? "text-primary"
                  : "text-foreground"
              }
            >
              Favoritos
            </Link>
          </NavbarItem>

          <NavbarItem isActive={location.pathname === "/propuesta"}>
            <Link
              to="/propuesta"
              aria-current={
                location.pathname === "/propuesta" ? "page" : undefined
              }
              className={
                location.pathname === "/propuesta"
                  ? "text-primary"
                  : "text-foreground"
              }
            >
              Propuesta
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className={`w-full ${
                  location.pathname === item.to
                    ? "text-primary"
                    : "text-foreground"
                }`}
                to={item.to}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
