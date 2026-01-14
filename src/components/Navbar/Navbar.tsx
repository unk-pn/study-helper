"use client";

import { useEffect, useRef, useState } from "react";
import c from "./Navbar.module.css";
import clsx from "clsx";
import Link from "next/link";
import { Avatar, Button, Divider, Popover, User } from "@gravity-ui/uikit";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Subjects", link: "/subjects" },
  { title: "About", link: "/about" },
];

const PopoverContent = () => {
  const { data: session } = useSession();

  return (
    <div className={c.popoverContent}>
      <Avatar size="xl" text={session?.user?.name?.[0] || "U"} theme="brand" />
      <h2>{session?.user?.name}</h2>

      <Button size="l" onClick={() => signOut()} className={c.signOutButton}>
        Sign out
      </Button>
    </div>
  );
};

const Account = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Button href="/auth/signIn">Log in</Button>
  }
  return (
    <Popover placement="bottom" content={<PopoverContent />} trigger="click">
      <div className={c.userAvatar}>
        <User
          avatar={{ text: session?.user?.name?.[0] || "U", theme: "brand" }}
          size="m"
          name={session?.user?.name}
          description={session?.user?.email}
        />
      </div>
    </Popover>
  );
};

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
      <h1 className={c.title}>
        <Link href="/" className={c.titleLink}>
          Study helper
        </Link>
      </h1>
      <nav className={c.nav}>
        <ul className={c.navList}>
          {navItems.map((i, index) => (
            <li key={index} className={c.navItem}>
              <Link href={i.link} className={c.navLink}>
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
        <Divider className={c.divider} orientation="vertical" />
        {/* <Popover
          placement="bottom"
          content={<PopoverContent />}
          trigger="click"
        >
          <div className={c.userAvatar}>
            <User
              avatar={{ text: session?.user?.name?.[0] || "U", theme: "brand" }}
              size="m"
              name={session?.user?.name}
              description={session?.user?.email}
            />
          </div>
        </Popover> */}
        <Account />
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
              <Link
                href={i.link}
                className={c.mobileNavLink}
                onClick={closeMenu}
              >
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
