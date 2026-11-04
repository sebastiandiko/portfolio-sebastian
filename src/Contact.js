import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaPaperPlane, FaEnvelope, FaRegCopy, FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import shineHover from './shineEffect';
import pulseGlow from './pulseEffect';

// Correo público que se muestra en la sección de contacto.
const CONTACT_EMAIL = 'sebadikow@gmail.com';
// Los mensajes del formulario se entregan vía Web3Forms al correo con el que
// se generó la clave (https://web3forms.com). La clave es pública por diseño.
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

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
  flex-direction: column;
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

const MailCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
  text-align: center;
`;

const MailLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #86868b;
`;

const MailPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 6px 6px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
  max-width: 100%;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 0 10px 40px rgba(255, 255, 255, 0.1);
  }

  a.mail {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px 8px 8px;
    color: #ffffff;
    font-size: clamp(0.95rem, 3.6vw, 1.15rem);
    font-weight: 500;
    letter-spacing: 0.01em;
    min-width: 0;
    word-break: break-all;
  }

  a.mail .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #ffffff;
    color: #000000;
    font-size: 0.95rem;
  }

  button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: transparent;
    color: #a1a1a6;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #000000;
      background: #ffffff;
    }
  }
`;

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('No se pudo copiar el correo:', err);
    }
  };
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
    if (!WEB3FORMS_KEY) {
      console.error('Falta REACT_APP_WEB3FORMS_KEY en .env.local');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          from_name: 'Portfolio',
          subject: `[Portfolio] ${formData.subject}`,
          email: formData.email,
          message: formData.message,
          botcheck: '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
      setStatus('success');
      setFormData({ email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
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
            data-magnetic
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
          <MailCard variants={itemVariants}>
            <MailLabel>{t('contactDirectLabel')}</MailLabel>
            <MailPill>
              <a className="mail" href={`mailto:${CONTACT_EMAIL}`}>
                <span className="icon"><FaEnvelope /></span>
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? t('contactCopied') : t('contactCopy')}
                title={copied ? t('contactCopied') : t('contactCopy')}
              >
                {copied ? <FaCheck /> : <FaRegCopy />}
              </button>
            </MailPill>
          </MailCard>

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
