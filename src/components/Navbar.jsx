import { useState } from "react";
import {
  NavLink,
  useLocation,
} from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isShopPage =
    location.pathname === "/shop" &&
    !location.search.includes("category=");

  const isCollectionsPage =
    location.pathname === "/shop" &&
    location.search.includes("category=");

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((currentState) => !currentState);
  }

  return (
    <header className="site-header">
      <div className="container navbar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "brand brand-active"
              : "brand"
          }
          end
          aria-label="AURELIS home"
          onClick={closeMenu}
        >
          AURELIS
        </NavLink>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`main-navigation ${
            menuOpen ? "main-navigation-open" : ""
          }`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link nav-link-active"
                : "nav-link"
            }
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={
              isShopPage
                ? "nav-link nav-link-active"
                : "nav-link"
            }
            onClick={closeMenu}
          >
            Shop
          </NavLink>

          <NavLink
            to="/shop?category=Automatic"
            className={
              isCollectionsPage
                ? "nav-link nav-link-active"
                : "nav-link"
            }
            onClick={closeMenu}
          >
            Collections
          </NavLink>
        </nav>

        <div
          className={`nav-actions ${
            menuOpen ? "nav-actions-open" : ""
          }`}
        >
          <NavLink
            to="/shop"
            className="nav-link"
            aria-label="Search watches"
            onClick={closeMenu}
          >
            Search
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "cart-nav-link nav-link-active"
                : "cart-nav-link"
            }
            aria-label={`View shopping cart with ${cartCount} ${
              cartCount === 1 ? "item" : "items"
            }`}
            onClick={closeMenu}
          >
            Cart

            {cartCount > 0 && (
              <span
                className="cart-count"
                aria-hidden="true"
              >
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;