import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/atoms/PageTitle';
import HeroImage from '../../components/atoms/HeroImage';
import MemberList from '../../components/molecules/MemberList';
import { Container, Typography, Box, Grid } from '@mui/material';
import QuiltedImageList from '../../components/molecules/QuiltedImageList';

function About() {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [images, setImages] = useState([]);

  const fetchMembers = () => {
    const items = [];
    [...Array(6)].map(() => {
      return items.push({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.image.people(120, 120, true),
        role: faker.name.jobTitle(),
      });
    });
    setMembers(items);
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const fetchMediaFeed = () => {
    const items = [];
    [...Array(24)].map(() => {
      return items.push({
        alt: faker.lorem.words(3),
        image: faker.image.city(640, 480, true),
        rows: random(1, 2),
        cols: random(1, 2),
      });
    });
    setImages(items);
  };

  useEffect(() => {
    fetchMembers();
    fetchMediaFeed();
  }, []);

  return (
    <>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <PageTitle title={t('pages.about.main_heading')} />

        <Typography variant="p" align="center" color="text.secondary" component="p">
          {t('pages.about.sub_heading')}
        </Typography>
      </Container>

      {/** Cover */}
      <HeroImage image={faker.image.technics()} height="300px" />

      {/** Staff */}
      <Container disableGutters maxWidth="sm" component="section" sx={{ pt: 12, pb: 6 }}>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {t('pages.about.meet_the_team')}
        </Typography>
        <Typography variant="p" align="center" color="text.secondary" component="p">
          {t('pages.about.team_description')}
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <MemberList members={members} />
      </Container>

      <Box component="section" sx={{ mt: 6, py: 12, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Typography
                  component="h5"
                  variant="h5"
                  color="text.primary"
                  sx={{ mb: 4, fontWeight: 'bold' }}
                >
                  {t('pages.about.our_mission')}
                </Typography>
                <Typography component="p" color="text.body">
                  {t('pages.about.mission_description')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <iframe
                width="560"
                height="315"
                src="//www.youtube.com/embed/mocuGRf2UVg?controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  width: '100%',
                  height: '56.25vw',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/** Masonry */}
      <Container disableGutters maxWidth="sm" component="section" sx={{ pt: 12, pb: 6 }}>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {t('pages.about.our_activities')}
        </Typography>
        <Typography variant="p" align="center" color="text.secondary" component="p">
          {t('pages.about.activities_description')}
        </Typography>

        <QuiltedImageList images={images} />
      </Container>
    </>
  );
}

export default About;
