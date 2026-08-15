'use client';

import { COMPANY } from '@/lib/constants';
import ObfuscatedEmail, { ENCODED_EMAIL_COMPANY } from '@/components/common/ObfuscatedEmail';

export default function PrivacyPolicyContent() {
  return (
    <p>
      {COMPANY.name}<br />
      {COMPANY.location.address}<br />
      Phone: {COMPANY.contact.phone}<br />
      Email: <ObfuscatedEmail encoded={ENCODED_EMAIL_COMPANY} className="text-primary hover:underline" subject="Privacy Policy Inquiry" />
    </p>
  );
}
