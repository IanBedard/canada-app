import "@cdssnc/gcds-components/dist/gcds/gcds.css";
import { GcdsHeader, GcdsNavLink, GcdsFooter, GcdsDateModified } from "@cdssnc/gcds-components-react";

import Content from "./components/Content";

export default function App() {
  return (
    <>
      {/* Header */}
      <GcdsHeader langHref="/fr" skipToHref="#main-content">
        <GcdsNavLink href="/" slot="brand">My Website</GcdsNavLink>
        <GcdsNavLink href="/about">About</GcdsNavLink>
        <GcdsNavLink href="/services">Services</GcdsNavLink>
        <GcdsNavLink href="/contact">Contact</GcdsNavLink>
      </GcdsHeader>

      {/* Main Content */}
   
      <Content/>

    
      {/* Footer */}
      <GcdsFooter>
        <a href='/privacy'>Privacy Policy</a>
        <a href='/terms'>Terms of Service</a>
        <p slot="copyright">&copy; {new Date().getFullYear()} My Website</p>
      </GcdsFooter>
    </>
  );
}
