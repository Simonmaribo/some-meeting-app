import { Container, Nav, Navbar } from "react-bootstrap";
import {
  PlusCircle,
  Lock,
  Grid,
  Github,
  QuestionCircle,
} from "react-bootstrap-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = (): JSX.Element => {
  const router = useRouter();

  return (
    <Navbar className="navbar" variant="light" expand="lg" collapseOnSelect>
      <Container className="global-container">
        <Navbar.Brand href="/">
          <img alt="logo" src="/favicon.svg" className="navbar-logo" />
          <span className="navbar-logo-text">Plan</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-hamburger"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/">
              <a
                className={`navbar-link ${
                  router.pathname === "/" ? ` active` : ``
                }`}
              >
                <PlusCircle className="navbar-link-icon" /> Ny begivenhed
              </a>
            </Link>
            <Link href="/recent-polls">
              <a
                className={`navbar-link ${
                  router.pathname === "/recent-polls" ? ` active` : ``
                }`}
              >
                <Grid className="navbar-link-icon" /> Seneste begivenheder
              </a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
