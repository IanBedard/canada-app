import "@cdssnc/gcds-components";
import "@cdssnc/gcds-components/dist/gcds/gcds.css";
import { GcdsHeading, GcdsLink, GcdsContainer, GcdsText, GcdsDateModified } from "@cdssnc/gcds-components-react";
import DataTable from "./DataTable";

export default function Content() {
  return (
    <GcdsContainer
      id="main-content"
      main-container
      size="xl"
      centered
      tag="main"
    >
      <section>
        <GcdsHeading tag="h1">Technical communications</GcdsHeading>
        <GcdsText>
         Technical communications products that are available to pay system users and impacted audiences to inform about system updates, issues or actions required.
        </GcdsText>
      </section>

      <section id="section-1">
        <GcdsHeading tag="h2">Section 1</GcdsHeading>
        <DataTable/>

      </section>
     
      <GcdsDateModified>
        {new Date().toISOString().split('T')[0]}
      </GcdsDateModified>
    </GcdsContainer>
  );
}