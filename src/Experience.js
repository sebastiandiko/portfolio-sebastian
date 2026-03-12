import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ExperienceSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  text-align: left;
  padding: 120px 20px;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 60px;
  text-align: center;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #a1a1a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ExperienceList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ExperienceCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const HeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
`;

const JobTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
`;

const Company = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2997ff; /* Applish blue accent */
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: #a1a1a6;
  line-height: 1.6;
`;

const Experience = () => {
  const { t } = useTranslation();
  const experiences = t('jobs', { returnObjects: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <ExperienceSection>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('experienceTitle')}
        </Title>
        <ExperienceList
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} variants={itemVariants}>
              <HeaderGroup>
                <JobTitle>{experience.jobTitle}</JobTitle>
                <Company>{experience.company}</Company>
              </HeaderGroup>
              <Description>{experience.description}</Description>
            </ExperienceCard>
          ))}
        </ExperienceList>
      </ContentWrapper>
    </ExperienceSection>
  );
};

export default Experience;
