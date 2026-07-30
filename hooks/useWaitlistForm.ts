'use client';

import { COPY } from '@/content/copy';
import { isValidEmail } from '@/lib/validateEmail';
import React, { useState } from 'react';

export type WaitlistStatus = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

interface UseWaitlistFormOptions {
  source: string;
  honeypot?: string;
}

export function useWaitlistForm({ source, honeypot = '' }: UseWaitlistFormOptions) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const trimmed = email.trim();
    if (trimmed !== email) setEmail(trimmed);

    if (!isValidEmail(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source, company: honeypot }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        if (data.duplicate) {
          setStatus('duplicate');
        } else {
          setStatus('success');
        }
      } else if (res.status === 429) {
        setStatus('error');
        setErrorMessage('Too many requests. Please try again later.');
      } else {
        setStatus('error');
        setErrorMessage(data.error || `Something went wrong. Try again, or email ${COPY.footer.contact.general}`);
      }
    } catch {
      setStatus('error');
      setErrorMessage(`Something went wrong. Try again, or email ${COPY.footer.contact.general}`);
    }
  };

  const handleBlur = () => {
    if (email && !isValidEmail(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (status === 'error' && isValidEmail(value.trim())) {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return {
    email,
    status,
    errorMessage,
    handleSubmit,
    handleBlur,
    handleChange,
  };
}
