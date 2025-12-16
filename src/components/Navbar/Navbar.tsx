"use client";

import { useEffect, useRef, useState } from "react";
import c from "./Navbar.module.css";
import clsx from "clsx";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Subjects", link: "/subjects" },
  { title: "About", link: "/about" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        burgerButtonRef.current &&
        !burgerButtonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  return (
    <header className={c.navbar}>
      <nav className={c.nav}>
        <ul className={c.navList}>
          {navItems.map((i, index) => (
            <li key={index} className={c.navItem}>
              <a href={i.link} className={c.navLink}>
                {i.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        ref={burgerButtonRef}
        className={clsx(c.burgerButton, isMenuOpen && c.burgerOpen)}
        onClick={toggleMenu}
      >
        <span className={c.burgerLine}></span>
        <span className={c.burgerLine}></span>
        <span className={c.burgerLine}></span>
      </button>

      <div
        className={clsx(c.mobileOverlay, isMenuOpen && c.overlayOpen)}
        onClick={closeMenu}
      ></div>

      <nav
        ref={mobileNavRef}
        className={clsx(c.mobileNav, isMenuOpen && c.mobileNavOpen)}
      >
        <ul className={c.mobileNavList}>
          {navItems.map((i, index) => (
            <li key={index} className={c.mobileNavItem}>
              <a href={i.link} className={c.mobileNavLink} onClick={closeMenu}>
                {i.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
