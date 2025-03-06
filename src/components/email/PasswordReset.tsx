
import React from 'react';
import { Body, Container, Head, Html, Link, Preview, Text } from '@react-email/components';

interface EmailInviteTokenProps {
  token: string;
  pathRoot: string;
}

const EmailPasswordReset = ({ token, pathRoot }: EmailInviteTokenProps) => {
  return (
    <Html>
      <Head />
      <Preview>{'Password Reset Request'}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text>{`Password Reset`}</Text>
          <Text>{`You have requested to reset your password. Please click the button below to proceed.`}</Text>
          <Link style={btn} href={`${pathRoot}/auth/password-reset?token=${token}`}>
            Reset Password
          </Link>
          <Text>{`If you did not request a password reset, please disregard this email.`}</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f4f4f4',
  color: '#333',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
  textAlign: 'center' as const,
};

const btn = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  display: 'inline-block',
  textDecoration: 'none',
  marginTop: '10px',
};

export default EmailPasswordReset;
