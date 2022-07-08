import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { useTranslation } from 'react-i18next';
import Feature from '../../components/atoms/Feature';
import Section from '../../components/atoms/Section';
import HeroImage from '../../components/atoms/HeroImage';
import ReviewSlider from '../../components/molecules/ReviewSlider';
import { Typography, Button, Box, Grid, Container } from '@mui/material';

function Landing() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('pages.landing.docker.heading'),
      description: t('pages.landing.docker.description'),
      image: '/static/images/docker.png',
      left: true,
    },
    {
      title: t('pages.landing.react.heading'),
      description: t('pages.landing.react.description'),
      image: '/static/images/react.png',
      left: false,
    },
    {
      title: t('pages.landing.laravel.heading'),
      description: t('pages.landing.laravel.description'),
      image: '/static/images/laravel.png',
      left: true,
    },
  ];

  {
    /** dummy client data */
  }
  const clients = useMemo(() => {
    const items = [];
    [...Array(6)].map((item, index) => {
      index++;
      return items.push({
        name: `Client ${index}`,
        logo: `/static/images/client-logo-${index}.png`,
      });
    });

    return items;
  }, []);

  {
    /** dummy reviews data */
  }
  const reviews = useMemo(() => {
    let reviews = [];
    let i = 0;

    while (i < 9) {
      reviews.push({
        avatar: faker.image.people(120, 120, true),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        comment: faker.lorem.words(15),
        rating: Math.random() * (5 - 1) + 1,
      });
      i++;
    }

    return reviews;
  }, []);

  return (
    <>
      <HeroImage image="/static/images/landing-cover.jpg" height="calc(100vh - 100px)">
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <Box>
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px rgba(0, 0, 0, 0.5)' }}
            >
              {t('pages.landing.main_heading')}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              component="p"
              sx={{ color: 'white' }}
            >
              {t('pages.landing.sub_heading')}
            </Typography>

            <Box textAlign="center" sx={{ mt: 2 }}>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                disableElevation
              >
                {t('labels.get_started')}
              </Button>
            </Box>
          </Box>
        </Box>
      </HeroImage>

      {/** Features List */}
      <Section heading={t('pages.landing.why_heading')}>
        {features.map((feature, key) => {
          return (
            <Feature
              key={key}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              left={feature.left}
            />
          );
        })}
      </Section>

      {/** Our Clients */}
      <Section heading={t('pages.landing.our_customers_heading')} background="white">
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={8}>
            {clients.map((client, key) => (
              <Grid item xs={12} sm={4} md={2} key={key}>
                <Box
                  component="img"
                  alt={client.name}
                  src={client.logo}
                  sx={{ width: '100%', m: '0 auto' }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/** Reviews */}
      <Section heading={t('pages.landing.reviews_heading')} fullWidth={true}>
        <ReviewSlider reviews={reviews} sx={{ mt: 6, p: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined">{t('pages.landing.see_all_reviews')}</Button>
        </Box>
      </Section>
    </>
  );
}

export default Landing;
