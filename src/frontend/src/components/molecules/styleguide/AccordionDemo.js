import { faker } from '@faker-js/faker';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Box, Accordion as MuiAccordion } from '@mui/material';
import BodyText from 'components/atoms/BodyText';
import Heading from 'components/atoms/Heading';
import Accordion from 'components/molecules/Accordion';

function AccordionDemo() {
  const questions = [...Array(5)].map(() => ({
    header: `${faker.lorem.words(5)}?`,
    content: faker.lorem.paragraphs(2, '\n'),
  }));

  return (
    <Box sx={{ mb: 8 }}>
      <Heading variant="h4" align="center">
        Accordion
      </Heading>
      <BodyText>
        Usually for FAQ pages, the default MUI Accordion is used to list down the questions. However
        the default has a lot of child components.
      </BodyText>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {`import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';\n
const items = [
  { header: 'This is the Header 1', content: 'This is some content 1'.},
  { header: 'This is the Header 2', content: 'This is some content 2'.},
];

{items.map((item, key) => {
  return (
    <Accordion key={key}>
      <AccordionSummary>{ item.header }<AccordionSummary>
      <AccordionDetails>{ item.details }</AccordionDetails>
    </Accordion>
  );
})}

`}
      </SyntaxHighlighter>

      <Box sx={{ py: 4 }}>
        {questions.map((item, key) => (
          <MuiAccordion key={key} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${key}-content`}
              id={`panel-${key}-header`}
              sx={{ borderBottom: 1, borderColor: 'rgba(224, 224, 224, 1)' }}
            >
              <BodyText bold={true} disableGutter={true}>
                {item.header}
              </BodyText>
            </AccordionSummary>
            <AccordionDetails>
              <BodyText>{item.content}</BodyText>
            </AccordionDetails>
          </MuiAccordion>
        ))}
      </Box>

      <BodyText>
        Instead of using the default <strong>Accordion</strong> of MUI, you must use the custom
        Accordion component with custom styling to match your project needs.
      </BodyText>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {`import Accordion from 'components/molecules/Accordion';\n
const items = [
  { header: 'This is the Header 1', content: 'This is some content 1.'},
  { header: 'This is the Header 2', content: 'This is some content 2.'},
];

<Accordion items={items}>
`}
      </SyntaxHighlighter>

      <Accordion items={questions} />
    </Box>
  );
}

export default AccordionDemo;
