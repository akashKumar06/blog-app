import Container from "./Container";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const authStatus = true;
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      to: "/",
      active: true, // depending on status of user is logged in or not
    },
    { name: "Login", to: "/login", active: true },
    { name: "Signup", to: "/signup", active: true },
    { name: "All Posts", to: "/all-posts", active: true },
    { name: "Add Post", to: "/add-post", active: true },
  ];
  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to="/">Logo</Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((navItem) =>
              navItem.active ? null : (
                <li key={navItem.name}>
                  <button onClick={() => navigate(navItem.to)}>
                    {navItem.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li>
                <button>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
