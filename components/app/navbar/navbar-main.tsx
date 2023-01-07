import React, { JSXElementConstructor, ReactElement, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import RoundedButton from "../button/rounded-button";

interface NavBarHomeProps {
  window?: () => Window;
}

interface NavButtonProps {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface ElevationScrollProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  window?: () => Window;
}

const ElevationScroll: React.FC<ElevationScrollProps> = ({
  children,
  window,
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    // color: "transparent",
  });
};

const NavButton: React.FC<NavButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="text"
      color="inherit"
      className={classes.navButton}
    >
      {text}
    </Button>
  );
};

const drawerWidth = 240;

const navLinks = [
  {
    label: "Home",
    link: "/home",
  },
];

const NavBarHome: React.FC<NavBarHomeProps> = (props) => {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const gotoPage = async (url: string) => {
    router.push(url);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Anti-Cheat Exam App
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar
          sx={{
            paddingTop: "1rem",
            paddingBottom: "1rem",
            boxShadow: "none",
            backgroundColor: "white",
          }}
          position="sticky"
        >
          <Container>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Link
                href="/"
                style={{
                  flexGrow: 1,
                }}
              >
                <Image
                  src="/images/logo.svg"
                  width={60}
                  height={60}
                  alt="Logo"
                  className={classes.navLogo}
                />
              </Link>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navLinks.map((link, index) => {
                  return (
                    <Link href={link.link} key={index}>
                      <NavButton text={link.label} />
                    </Link>
                  );
                })}

                {/* {session.status === "unauthenticated" && (
                  <RoundedButton
                    onClick={() => gotoPage("/auth/signin")}
                    text="Login"
                    className={classes.authButton}
                  />
                )}

                {session.status === "authenticated" && (
                  <RoundedButton
                    onClick={handleLogout}
                    text="Logout"
                    className={classes.authButton}
                  />
                )} */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
};

export default NavBarHome;
