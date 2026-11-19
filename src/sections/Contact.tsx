import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { BatmanBatIcon } from '../components/SuperheroIcons';

interface ContactProps {
  prefilledSubject?: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || '';

export function Contact({ prefilledSubject = '' }: ContactProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: prefilledSubject,
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'mailto' | 'error'>(
    'idle'
  );
  const [statusMessage, setStatusMessage] = useState('');
  const [lastMailtoHref, setLastMailtoHref] = useState('');

  useEffect(() => {
    if (prefilledSubject) {
      setForm((prev) => ({ ...prev, subject: prefilledSubject }));
      setErrors((prev) => ({ ...prev, subject: undefined }));
    }
  }, [prefilledSubject]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Please add a short subject for your inquiry.';
    }
    if (form.message.trim().length < 15) {
      nextErrors.message = 'Please include a brief message (at least 15 characters).';
    }
    return nextErrors;
  };

  const buildMailtoLink = () => {
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      '',
      form.message.trim(),
    ].join('\n');

    return `mailto:${profileData.email}?subject=${encodeURIComponent(
      form.subject.trim()
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Clipboard API unavailable in restricted contexts
      setCopiedEmail(false);
    }
  };

  const handleCopyMessage = async () => {
    const formatted = `To: ${profileData.email}\nSubject: ${form.subject.trim()}\nFrom: ${form.name.trim()} <${form.email.trim()}>\n\n${form.message.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedPayload(true);
      window.setTimeout(() => setCopiedPayload(false), 2400);
    } catch {
      setCopiedPayload(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    if (FORMSPREE_ENDPOINT) {
      setStatus('submitting');
      setStatusMessage('');
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            subject: form.subject.trim(),
            message: form.message.trim(),
          }),
        });

        if (!response.ok) {
          throw new Error('Endpoint rejected the request.');
        }

        setStatus('sent');
        setStatusMessage(
          'Your message has been delivered successfully. I will respond as soon as possible.'
        );
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch {
        const mailtoHref = buildMailtoLink();
        setLastMailtoHref(mailtoHref);
        setStatus('error');
        setStatusMessage(
          'Could not reach the configured email endpoint. You can send directly via your email client below.'
        );
      }
      return;
    }

    // Transparent, working mailto fallback when no Formspree endpoint is configured
    const mailtoHref = buildMailtoLink();
    setLastMailtoHref(mailtoHref);
    setStatus('mailto');
    setStatusMessage(
      'Your email draft has been prepared for your default mail application. If it did not open automatically, use the button or copy option below.'
    );
    window.location.href = mailtoHref;
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 sm:scroll-mt-24 border-t border-blush/80 bg-ivory-soft py-20 sm:py-24 lg:py-28"
    >
      <div className="editorial-container">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Have a Project in Mind? Let's Build Something Useful."
          subtitle="Open to full-time AI/ML & Python backend roles, enterprise ERP engineering, and select freelance automation projects."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Direct Channels + Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="space-y-5 lg:col-span-5"
          >
            {/* Direct Email Card with Copy Button */}
            <div className="editorial-card p-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                  Direct Contact
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-charcoal shadow-xs">
                  <BatmanBatIcon className="h-3.5 w-5" size={19} />
                  <span>Bat-Signal Ready</span>
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-blush bg-ivory p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="mt-1 block break-all font-heading text-sm font-semibold text-burgundy-deep transition-colors hover:text-burgundy"
                    >
                      {profileData.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-burgundy/25 bg-white px-3 py-2 font-mono text-xs font-medium text-burgundy transition-colors hover:border-burgundy hover:bg-blush/35"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-burgundy" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <span className="sr-only" aria-live="polite">
                  {copiedEmail ? 'Email address copied to clipboard.' : ''}
                </span>
              </div>

              {/* LinkedIn & GitHub */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-blush bg-white px-4 py-3.5 transition-all hover:border-gold hover:bg-ivory/60"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-burgundy/10 text-burgundy">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-charcoal">
                        LinkedIn
                      </span>
                      <span className="block font-mono text-[11px] text-muted">
                        /in/vinoth-thiruppathi
                      </span>
                    </span>
                  </span>
                  <ExternalLink
                    className="h-4 w-4 text-muted transition-colors group-hover:text-burgundy"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-blush bg-white px-4 py-3.5 transition-all hover:border-gold hover:bg-ivory/60"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-burgundy/10 text-burgundy">
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-charcoal">
                        GitHub
                      </span>
                      <span className="block font-mono text-[11px] text-muted">
                        github.com/vinoththiru
                      </span>
                    </span>
                  </span>
                  <ExternalLink
                    className="h-4 w-4 text-muted transition-colors group-hover:text-burgundy"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* Prominent Download Resume CTA Card */}
            <div className="rounded-2xl border border-gold/45 bg-burgundy-hero p-6 text-ivory shadow-editorial">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                Curriculum Vitae
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ivory">
                Download My Resume
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/80 text-justify">
                Review my education, technical stack, AI/ML experience at CubeAI
                Solutions, and enterprise software projects in a clean PDF format.
              </p>
              <div className="mt-5">
                <Button
                  as="a"
                  href={profileData.resumePath}
                  download="Vinoth_Thiruppathi_Resume.pdf"
                  variant="gold"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume (PDF)
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="editorial-card p-6 sm:p-8 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blush pb-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-burgundy-deep">
                  Send a Message
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {FORMSPREE_ENDPOINT
                    ? 'Messages are submitted securely to my inbox.'
                    : 'Validated submissions open a pre-filled email draft to my inbox (no silent fake submission).'}
                </p>
              </div>
              <Mail className="h-5 w-5 text-gold-dark" aria-hidden="true" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-charcoal"
                  >
                    Name <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`mt-2 w-full rounded-xl border bg-ivory/60 px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:bg-white ${
                      errors.name ? 'border-burgundy' : 'border-blush focus:border-burgundy'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="mt-1.5 text-xs font-medium text-burgundy"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-charcoal"
                  >
                    Email <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`mt-2 w-full rounded-xl border bg-ivory/60 px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:bg-white ${
                      errors.email ? 'border-burgundy' : 'border-blush focus:border-burgundy'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="mt-1.5 text-xs font-medium text-burgundy"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-charcoal"
                >
                  Subject <span className="text-burgundy">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  placeholder="e.g. FastAPI Backend Development / Mini ERP Consultation"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  className={`mt-2 w-full rounded-xl border bg-ivory/60 px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:bg-white ${
                    errors.subject ? 'border-burgundy' : 'border-blush focus:border-burgundy'
                  }`}
                />
                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    className="mt-1.5 text-xs font-medium text-burgundy"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-charcoal"
                >
                  Message <span className="text-burgundy">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell me about your project scope, role, or workflow you want to automate..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`mt-2 w-full resize-y rounded-xl border bg-ivory/60 px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 transition-colors focus:bg-white ${
                    errors.message ? 'border-burgundy' : 'border-blush focus:border-burgundy'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 text-xs font-medium text-burgundy"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === 'submitting'}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {status === 'submitting'
                    ? 'Sending Message...'
                    : FORMSPREE_ENDPOINT
                      ? 'Send Message'
                      : 'Compose Email'}
                </Button>

                <span className="font-mono text-[11px] text-muted">
                  Direct inbox: {profileData.email}
                </span>
              </div>

              {/* Real status feedback */}
              {status === 'sent' && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-gold/60 bg-ivory p-4 text-sm text-charcoal"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-burgundy"
                    aria-hidden="true"
                  />
                  <p>{statusMessage}</p>
                </div>
              )}

              {(status === 'mailto' || status === 'error') && (
                <div
                  role={status === 'error' ? 'alert' : 'status'}
                  className="rounded-xl border border-gold/60 bg-ivory p-4 text-sm text-charcoal"
                >
                  <div className="flex items-start gap-3">
                    {status === 'error' ? (
                      <AlertCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-burgundy"
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-burgundy"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex-1">
                      <p className="leading-relaxed">{statusMessage}</p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {lastMailtoHref && (
                          <Button
                            as="a"
                            href={lastMailtoHref}
                            variant="primary"
                            size="sm"
                          >
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                            Open Email Client
                          </Button>
                        )}
                        <Button
                          type="button"
                          onClick={handleCopyMessage}
                          variant="secondary"
                          size="sm"
                        >
                          {copiedPayload ? (
                            <>
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              Copied Message
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              Copy Message
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
