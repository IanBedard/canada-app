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
        <li><b>Category Filter</b>: You can select multiple categories, and the filter will return entries matching any of the selected categories.</li>
        <li><b>Audience Filter</b>: All selected audience types must be present for an entry to match the filter.</li>
        <li><b>Year and Month Filters</b>: These filters work independently of each other. You can filter by year, by month, or by both, without any interaction between them.</li>
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