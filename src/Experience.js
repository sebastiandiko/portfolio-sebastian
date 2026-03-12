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
  @media (max-width: 768px) {
    padding: 80px 15px;
  }

  @media (max-width: 480px) {
    padding: 60px 10px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 80px;
  text-align: center;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #ffffff 0%, #22c55e 200%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #22c55e;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
  }
`;

const ExperienceList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  /* The vertical timeline line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 45px;
    width: 2px;
    background: linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.3) 15%, rgba(34, 197, 94, 0.3) 85%, transparent 100%);
    z-index: 1;

    @media (max-width: 768px) {
      left: 20px;
    }

    @media (max-width: 480px) {
      left: 15px;
    }
  }
`;

const ExperienceCardContainer = styled(motion.div)`
  display: flex;
  position: relative;
  width: 100%;
  padding-left: 100px;

  @media (max-width: 768px) {
    padding-left: 60px;
  }

  @media (max-width: 480px) {
    padding-left: 45px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 41px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  border: 4px solid #22c55e;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 0 rgba(34, 197, 94, 0);

  @media (max-width: 768px) {
    left: 11px;
    top: 25px;
  }

  @media (max-width: 480px) {
    left: 6px;
    top: 22px;
    width: 16px;
    height: 16px;
  }
`;

const ExperienceCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 35px 40px;
  border-radius: 24px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    background: rgba(34, 197, 94, 0.04);
    border-color: rgba(34, 197, 94, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(34, 197, 94, 0.1);
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }

  /* Make the dot glow when the card is hovered */
  ${ExperienceCardContainer}:hover & {
    /* Optional: any specific child styles on hover */
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
  transition: color 0.3s ease;

  ${ExperienceCard}:hover & {
    color: #22c55e;
    text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
  }
`;

const Company = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: #22c55e;
  padding: 4px 12px;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(34, 197, 94, 0.2);
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: #a1a1a6;
  line-height: 1.7;
  transition: color 0.3s ease;

  ${ExperienceCard}:hover & {
    color: #c1c1c6;
  }
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
          {Array.isArray(experiences) && experiences.map((experience, index) => (
            <ExperienceCardContainer 
              key={index} 
              variants={itemVariants}
              onMouseEnter={(e) => {
                const dot = e.currentTarget.querySelector('.timeline-dot');
                if (dot) {
                  dot.style.background = '#22c55e';
                  dot.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.6)';
                  dot.style.transform = 'scale(1.2)';
                }
              }}
              onMouseLeave={(e) => {
                const dot = e.currentTarget.querySelector('.timeline-dot');
                if (dot) {
                  dot.style.background = '#000000';
                  dot.style.boxShadow = '0 0 0 rgba(34, 197, 94, 0)';
                  dot.style.transform = 'scale(1)';
                }
              }}
            >
              <TimelineDot className="timeline-dot" />
              <ExperienceCard>
                <HeaderGroup>
                  <JobTitle>{experience.jobTitle}</JobTitle>
                  <Company>{experience.company}</Company>
                </HeaderGroup>
                <Description>{experience.description}</Description>
              </ExperienceCard>
            </ExperienceCardContainer>
          ))}
        </ExperienceList>
      </ContentWrapper>
    </ExperienceSection>
  );
};

export default Experience;
