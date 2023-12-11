// Header.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import "./styles.css";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <header className="header">
      <div className="homeLink">
        <Link href="/">HOME</Link>
      </div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search high resolution images"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <FaSearch className="searchIcon" onClick={handleSearch} />
      </div>

      <nav className="navLinks">
        <Link href="/blog">Blog</Link>
        <Link href="/unsplash+">Advertise</Link>
        <Link href="/unsplash+">Unsplash+</Link>
      </nav>

      <div className="accountIcon">
        <FaUser />
        <GiHamburgerMenu className="toggleButton" />
      </div>
    </header>
  );
};

export default Header;
