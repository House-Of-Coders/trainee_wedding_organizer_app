import React from "react";
import "./css/Footer.css";
import {
  Phone,
  Email,
  Home,
  Facebook,
  LinkedIn,
  Web,
} from "@material-ui/icons";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footer_top">
          <div className="footer_left footer_field">
            <h3> About Us</h3>
            <p className="about_us_description">
              We've created a sample About Us template designed to work well for
              virtually any online store, blog, or website. Just fill in the
              brackets with your company's information and you'll have a
              professional About Us page written in minutes. If you want to put
              a personal touch on your page (which we highly recommend), check
              out the About Us examples below the template.
            </p>
          </div>
          <div className="footer_right footer_field">
            <h3> Contact Us</h3>
            <div className="footer_right_contact_details_container">
              <List>
                <ListItem disablePadding>
                  <ListItemIcon id="footer_icon">
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary="0775831176" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon id="footer_icon">
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary="Info@databoxtech.com" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon id="footer_icon">
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="541/5/5 Madiwela Rd, Sri Jayawardenepura Kotte 10116" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon id="footer_icon">
                    <Web />
                  </ListItemIcon>
                  <ListItemText primary="https://www.databoxtech.com/" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon id="footer_icon">
                    <Facebook />
                  </ListItemIcon>
                  <ListItemText primary="Facebook" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon id="footer_icon">
                    <LinkedIn />
                  </ListItemIcon>
                  <ListItemText primary="Linkedin" />
                </ListItem>
              </List>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <h3 className="copyright">
            Copyrights &#169; 2021 DataboxTechnologies
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Footer;
