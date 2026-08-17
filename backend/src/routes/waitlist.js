import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { validateSignup } from '../utils/validate.js';
import { waitlistRateLimit } from '../middleware/rateLimit.js';

export const waitlistRouter = Router();

waitlistRouter.post('/waitlist', waitlistRateLimit, async (req, res) => {
  const result = validateSignup(req.body ?? {});
  if (!result.ok) {
    return res.status(400).json({ errors: result.errors });
  }

  const ip = req.ip;

  const { error } = await supabase.from('waitlist_signups').insert({
    ...result.data,
    ip_address: ip,
  });

  if (error) {
    if (error.code === '23505') {
      // Unique violation on email — treat as a friendly "already on the list".
      return res.status(200).json({ status: 'already_registered', first_name: result.data.first_name });
    }
    console.error('waitlist insert failed', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }

  return res.status(201).json({ status: 'created', first_name: result.data.first_name });
});
