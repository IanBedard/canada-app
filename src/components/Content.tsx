import "@cdssnc/gcds-components";
import "@cdssnc/gcds-components/dist/gcds/gcds.css";
import { GcdsHeading, GcdsDetails, GcdsContainer, GcdsText, GcdsDateModified } from "@cdssnc/gcds-components-react";
import DataTable from "./DataTable";

export default function Content() {
  return (
    <GcdsContainer
    id="main-content"
    main-container 
    size="xl"
    centered
    tag="main"
    className="content-wrapper"
  >
    <section className="content-section">
      <GcdsHeading tag="h1">Technical communications</GcdsHeading>
      <GcdsText>
       Find technical communications about pay system updates, changes or issues.
       </GcdsText>
       <GcdsDetails detailsTitle="Search and filters tips">
       <GcdsText>
       <p>You can use:</p>
       <ul>
        <li>Category Filter = ||</li>
        <li>Audience Filter = &&</li>
        <li>Year and Month Filters works indepedently</li>
       </ul>
      </GcdsText>
      </GcdsDetails>
    </section>

    <section className="table-section">
      <DataTable/>
    </section>
 
    <GcdsDateModified>
      {new Date().toISOString().split('T')[0]}
    </GcdsDateModified>
  </GcdsContainer>
  );
}