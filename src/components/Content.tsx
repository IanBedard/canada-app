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
    >
      <section >
        <GcdsHeading tag="h1">Technical communications</GcdsHeading>
        <GcdsText>
         Find technical communications about pay system updates, changes or issues.
         </GcdsText>
         <GcdsDetails detailsTitle="Search and filters tips">
         <GcdsText>
         <p>The Technical Communication search function supports the use of search opperators or keywords to help expand or narrow search parameters.</p>
         <p>You can use:</p>
         <ul>
          <li>boolean operators (and, or, not) to combine multiple keywords and phrases to enhance a search query</li>
          <li>wildcards (asterik, question mark) in place of a letter or string of letters in a search query</li>
          <li>quotation marks (" ") to search for an exact phrase</li>
         </ul>
         <p>In addition, using one or more of the filter options narrows a search bu only displaying communications that meet your selections by category, audience and date.</p>
         <p>Select the Order by menu to change how communications are displayed; by the date published (default) or by the title.</p>
         <p>Select the Reset Search button to clear and filter options.</p>
        </GcdsText>
</GcdsDetails>
      </section>

      <section >
    
        <DataTable/>

      </section>
   
      <GcdsDateModified>
        {new Date().toISOString().split('T')[0]}
      </GcdsDateModified>
    </GcdsContainer>
  );
}