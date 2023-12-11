// components/Nav.tsx
import React from "react";
import { categories } from "@/data/categories";
import Link from "next/link";
import "./styles.css";

const Nav: React.FC = () => {
  return (
    <nav className="navContainer">
      <ul className="navList">
        {categories.map((category, index) => (
          <li key={index} className="navItem">
            <Link href={`/categories/${category.toLowerCase()}`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
