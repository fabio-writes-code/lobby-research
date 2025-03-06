
import React from 'react';
import { Body, Container, Head, Html, Link, Preview, Text } from '@react-email/components';

interface EmailInviteTokenProps {
  token: string;
  pathRoot: string;
}

const EmailInviteToken = ({ token, pathRoot }: EmailInviteTokenProps) => {
  return (
    <Html>
      <Head />
      <Preview>{"You've been invited to join our platform"}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text>{`Welcome, you've been invited to join Alberta Counsel's Hansard Platform`}</Text>
          <Link style={btn} href={`${pathRoot}/auth/register?token=${token}`}>
            Activate your account
          </Link>
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

export default EmailInviteToken;
