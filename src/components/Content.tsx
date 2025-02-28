import "@cdssnc/gcds-components";
import "@cdssnc/gcds-components/dist/gcds/gcds.css";
import { GcdsHeading, GcdsLink, GcdsContainer, GcdsText, GcdsDateModified} from "@cdssnc/gcds-components-react";


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
        <GcdsHeading tag="h1">Basic page</GcdsHeading>
        <GcdsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
          egestas maecenas pharetra convallis posuere morbi leo urna.
        </GcdsText>
      </section>
      <section>
        <GcdsHeading tag="h2">On this page</GcdsHeading>
        <ul className="list-disc mb-300">
          <li className="mb-75">
            <GcdsLink href="#section-1">Section 1</GcdsLink>
          </li>
          <li className="mb-75">
            <GcdsLink href="#section-2">Section 2</GcdsLink>
          </li>
          <li>
            <GcdsLink href="#section-3">Section 3</GcdsLink>
          </li>
        </ul>
      </section>
      <section id="section-1">
        <GcdsHeading tag="h2">Section 1</GcdsHeading>
        <GcdsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
          egestas maecenas pharetra convallis posuere morbi leo urna.
        </GcdsText>
        <GcdsHeading tag="h3">Subsection heading</GcdsHeading>
        <GcdsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
          egestas maecenas pharetra convallis posuere morbi leo urna.
        </GcdsText>
        <GcdsHeading tag="h3">Subsection heading</GcdsHeading>
        <GcdsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
          egestas maecenas pharetra convallis posuere morbi leo urna.
        </GcdsText>
      </section>
      <section id="section-2">
        <GcdsHeading tag="h2">Section 2</GcdsHeading>
        <GcdsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
          egestas maecenas pharetra convallis posuere morbi leo urna.
        </GcdsText>
      </section>åß
      <section id="section-3">
        <GcdsHeading tag="h2">Section 3</GcdsHeading>
        <GcdsText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis
          egestas maecenas pharetra convallis posuere morbi leo urna.
        </GcdsText>
      </section>
       <GcdsDateModified>
       {new Date().toISOString().split('T')[0]}
     </GcdsDateModified>
    </GcdsContainer>
  );
}
