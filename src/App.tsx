import '@cdssnc/gcds-components/dist/gcds/gcds.css';

import { 
  GcdsHeader, 
  GcdsNavLink, 
  GcdsFooter,
  GcdsNavGroup, 
  GcdsTopNav, 
  GcdsBreadcrumbs, 
  GcdsBreadcrumbsItem,
  GcdsSearch // Add this import
} from "@cdssnc/gcds-components-react";
import Content from "./components/Content";

export default function App() {
  return (
    <>
      {/* Header */}

      <GcdsHeader langHref="/fr" skipToHref="#main-content">
  <GcdsNavLink href="/" slot="brand">GC Notify</GcdsNavLink>
  <GcdsSearch 
          slot="search"
         
          button-text="Search"
          placeholder="PSPC GCintranet"
     
        />
  <GcdsTopNav
    label="Top navigation"
    alignment="right"
    slot="menu"
  >
    <GcdsNavGroup slot="home" openTrigger="Compensation" menuLabel="Compensation">
    <GcdsNavLink href="#" current>Compensation community hub</GcdsNavLink>
      <GcdsNavLink href="#">Copensation web applications</GcdsNavLink>
      <GcdsNavLink href="#">Shared Human Resources Services</GcdsNavLink>
      <GcdsNavLink href="#">Pay, pension and benefits</GcdsNavLink>
      <GcdsNavLink href="#">Compensation - More</GcdsNavLink>
      </GcdsNavGroup> 
    <GcdsNavGroup openTrigger="Procurement" menuLabel="Procurement">
      <GcdsNavLink href="#">Browse and purchase goods and services</GcdsNavLink>
      <GcdsNavLink href="#">Procurement advice, guides and tools</GcdsNavLink>
      <GcdsNavLink href="#">Careers in procurement</GcdsNavLink>
      <GcdsNavLink href="#">Procurement - More</GcdsNavLink>
    </GcdsNavGroup>

    <GcdsNavGroup openTrigger="Building and offices" menuLabel="Building and offices">
      <GcdsNavLink href="#">Report building and office issues (National Service Call Centre)</GcdsNavLink>
      <GcdsNavLink href="#">Property manages by the Governement of Canada</GcdsNavLink>
      <GcdsNavLink href="#">Policies and procedures on federal buildings and offices</GcdsNavLink>
      <GcdsNavLink href="#">Real Property Branch service catalogue</GcdsNavLink>
      <GcdsNavLink href="#">Buildings and offices - More</GcdsNavLink>
    </GcdsNavGroup>

    <GcdsNavGroup openTrigger="Governement finances" menuLabel="Governement finances">
      <GcdsNavLink href="#">Issuing payments</GcdsNavLink>
      <GcdsNavLink href="#">Receiving payments</GcdsNavLink>
      <GcdsNavLink href="#">Receiver General central systems</GcdsNavLink>
      <GcdsNavLink href="#">Year-end requirements</GcdsNavLink>
      <GcdsNavLink href="#">Maintaining the accounts of Canada</GcdsNavLink>
      <GcdsNavLink href="#">SIGMA: Finance, procurement and real property system</GcdsNavLink>
      <GcdsNavLink href="#">Governement finances - More</GcdsNavLink>
    </GcdsNavGroup>

    <GcdsNavGroup openTrigger="More services" menuLabel="More services">
      <GcdsNavLink href="#">Translation Bureau's language services and tools</GcdsNavLink>
      <GcdsNavLink href="#">My Governement of Canada Human Resources</GcdsNavLink>
      <GcdsNavLink href="#">Copyright Media Clearance Program</GcdsNavLink>
      <GcdsNavLink href="#">Advertising coordination and partnerships</GcdsNavLink>
      <GcdsNavLink href="#">Public opinion research</GcdsNavLink>
      <GcdsNavLink href="#">Forms catalogue</GcdsNavLink>
      <GcdsNavLink href="#">Services - More</GcdsNavLink>
    </GcdsNavGroup>

  </GcdsTopNav>

  <GcdsBreadcrumbs slot="breadcrumb">
    <GcdsBreadcrumbsItem href="#">PSPC GCintranet</GcdsBreadcrumbsItem>
    <GcdsBreadcrumbsItem href="#">Compensation</GcdsBreadcrumbsItem>
    <GcdsBreadcrumbsItem href="#">Compensation community hub</GcdsBreadcrumbsItem>
    <GcdsBreadcrumbsItem href="#">Technical pay system communications</GcdsBreadcrumbsItem>
  </GcdsBreadcrumbs>


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
