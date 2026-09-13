import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import shineHover from './shineEffect';
import pulseGlow from './pulseEffect';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const ContactSection = styled.section`
  background-color: #000000;
  color: #f5f5f7;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Ambient background glow */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vw;
    max-width: 800px;
    max-height: 800px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 80px 15px;
  }

  @media (max-width: 480px) {
    padding: 60px 10px;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  position: relative;
  z-index: 2;
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 80px 60px;
  border-radius: 40px;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 50px 30px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
    border-radius: 24px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled(motion.h2)`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.04em;
  line-height: 1.1;
  display: inline-block;
  ${shineHover('linear-gradient(135deg, #ffffff 0%, #ffffff 100%)')}
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #a1a1a6;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 50px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const fieldStyles = `
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 16px 18px;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;

  &::placeholder {
    color: #57575c;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.06);
  }
`;

const FieldInput = styled.input`
  ${fieldStyles}
`;

const FieldTextArea = styled.textarea`
  ${fieldStyles}
  resize: vertical;
  min-height: 140px;
  line-height: 1.6;
`;

const SubmitButton = styled(motion.button)`
  background-color: #ffffff;
  color: #000000;
  padding: 16px 32px;
  border-radius: 14px;
  border: 1px solid #ffffff;
  font-size: 1.05rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  align-self: center;
  transition: box-shadow 0.3s ease;
  ${pulseGlow}

  &:hover:not(:disabled) {
    box-shadow: 0 10px 34px rgba(255, 255, 255, 0.35);
    animation-play-state: paused;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    animation-play-state: paused;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StatusMessage = styled(motion.p)`
  text-align: center;
  font-size: 0.95rem;
  margin: -8px 0 0;
  color: ${props => (props.$isError ? '#ff8a8a' : '#8affa8')};
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #a1a1a6;
    font-size: 1.6rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);

    &:hover {
      color: #000000;
      background: #ffffff;
      transform: translateY(-5px) scale(1.1);
      box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
    }
  }
`;

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('Faltan las variables de entorno de EmailJS (REACT_APP_EMAILJS_*)');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setFormData({ email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <ContactSection id="contact">
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <HeaderSection>
          <Title variants={itemVariants}>
            {t('contactTitle')}
          </Title>
          <Subtitle variants={itemVariants}>
            {t('contactSubtitle')}
          </Subtitle>
        </HeaderSection>

        <Form onSubmit={handleSubmit} variants={itemVariants}>
          <FormRow>
            <FieldInput
              name="email"
              type="email"
              required
              aria-label={t('contactFormEmailLabel')}
              placeholder={t('contactFormEmailLabel')}
              value={formData.email}
              onChange={handleChange}
            />

            <FieldInput
              name="subject"
              type="text"
              required
              aria-label={t('contactFormSubjectLabel')}
              placeholder={t('contactFormSubjectLabel')}
              value={formData.subject}
              onChange={handleChange}
            />
          </FormRow>

          <FieldTextArea
            name="message"
            required
            aria-label={t('contactFormMessageLabel')}
            placeholder={t('contactFormMessageLabel')}
            value={formData.message}
            onChange={handleChange}
          />

          <SubmitButton
            type="submit"
            disabled={status === 'sending'}
            animate={status === 'sending' ? { scale: 1 } : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: status === 'sending' ? 1 : 1.08 }}
            whileTap={{ scale: status === 'sending' ? 1 : 0.95 }}
          >
            <FaPaperPlane />
            {status === 'sending' ? t('contactFormSending') : t('contactFormButton')}
          </SubmitButton>

          {status === 'success' && (
            <StatusMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t('contactFormSuccess')}
            </StatusMessage>
          )}
          {status === 'error' && (
            <StatusMessage $isError initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t('contactFormError')}
            </StatusMessage>
          )}
        </Form>

        <BottomSection>
          <motion.div variants={itemVariants}>
            <SocialLinks>
              <a
                href="https://instagram.com/sebastiandiko"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/sebastian-dikowiec-6b9068221/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </SocialLinks>
          </motion.div>
        </BottomSection>
      </ContentWrapper>
    </ContactSection>
  );
};

export default Contact;
