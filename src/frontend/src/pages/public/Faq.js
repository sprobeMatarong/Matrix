import { faker } from '@faker-js/faker';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Faq() {
  const { t } = useTranslation();

  const mock = () => {
    let i = 0;
    const items = [];

    while (i < 10) {
      items.push({
        heading: faker.lorem.words(5),
        content: faker.lorem.paragraphs(2, '\n'),
      });
      i++;
    }

    return items;
  };

  return (
    <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 2 }} align="center">
        {t('pages.faq.heading')}
      </Typography>

      <Typography align="center" color="text.secondary" component="p" sx={{ mb: 4 }}>
        {t('pages.faq.sub_heading')}
      </Typography>

      {mock().map((item, key) => {
        return (
          <Accordion key={key} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${key}-content`}
              id={`panel-${key}-header`}
              sx={{ borderBottom: 1, borderColor: 'rgba(224, 224, 224, 1)' }}
            >
              <Typography component="h4" sx={{ fontWeight: 'bold' }}>
                {item.heading}?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Typography>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
}

export default Faq;
