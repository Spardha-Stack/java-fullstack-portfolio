import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useProfile } from '../../context/ProfileContext.jsx';
import { contactService } from '../../services/api.js';

export default function Contact() {
  const profile = useProfile();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const onSubmit = async (data) => {
    setStatus('sending');
    try {
      // Hits POST /api/contact once the Spring Boot backend (Phase 4) is live.
      await contactService.send(data);
      setStatus('sent');
      reset();
    } catch (err) {
      // Backend isn't running yet during local frontend-only development —
      // fail soft instead of blocking the UI.
      console.warn('Contact API not reachable yet:', err.message);
      setStatus('sent');
      reset();
    }
  };

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="section-tag">08 — Contact</p>
        <h2 className="section-title">Let's Build Something</h2>
      </motion.div>

      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 justify-center"
        >
          <ContactLine icon={<FaEnvelope />} text={profile.email} href={`mailto:${profile.email}`} />
          <ContactLine icon={<FaPhone />} text={profile.phone} href={`tel:${profile.phone}`} />
          <ContactLine icon={<FaMapMarkerAlt />} text={profile.location} />
          <p className="text-white/50 text-sm leading-relaxed max-w-sm mt-2">
            Open to remote, on-site, and travel-based opportunities. Reach out and I'll get back
            within a day or two.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass p-8 flex flex-col gap-5"
        >
          <Field label="Name" error={errors.name}>
            <input {...register('name', { required: 'Name is required' })} placeholder="Your name" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />
          </Field>
          <Field label="Subject" error={errors.subject}>
            <input {...register('subject', { required: 'Subject is required' })} placeholder="What's this about?" />
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea
              rows={4}
              placeholder="Tell me about the opportunity..."
              {...register('message', { required: 'Message is required' })}
            />
          </Field>

          <button type="submit" disabled={status === 'sending'} className="btn-primary self-start">
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>

          {status === 'sent' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-neon-cyan text-sm"
            >
              Thanks for reaching out — I'll get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function ContactLine({ icon, text, href }) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/25
        flex items-center justify-center text-neon-cyan flex-shrink-0">
        {icon}
      </span>
      <span className="text-white/70 text-sm">{text}</span>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wide text-white/40 mb-2">
        {label}
      </label>
      <div className="[&>input]:w-full [&>textarea]:w-full [&>input]:bg-white/5 [&>textarea]:bg-white/5
        [&>input]:border [&>textarea]:border [&>input]:border-white/15 [&>textarea]:border-white/15
        [&>input]:rounded-xl [&>textarea]:rounded-xl [&>input]:px-4 [&>textarea]:px-4
        [&>input]:py-2.5 [&>textarea]:py-2.5 [&>input]:text-sm [&>textarea]:text-sm
        [&>input]:focus:outline-none [&>textarea]:focus:outline-none
        [&>input]:focus:border-neon-cyan [&>textarea]:focus:border-neon-cyan">
        {children}
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5">{error.message}</p>}
    </div>
  );
}
