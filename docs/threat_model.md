# Threat Model (WeWitness)

## Goals

- Ensure recordings survive device loss/destruction and forced deletion.
- Prevent misuse as a stalking/doxxing/surveillance tool.
- Limit server/operator ability to view user content by default.

## Primary Threats

1. Phone stolen/destroyed during or after recording
2. Forced deletion/intimidation
3. Unauthorized access to private videos (account takeover, IDOR)
4. Misuse of “proximity” features to target individuals
5. Harassment/spam via mass uploads or incident abuse
6. Metadata leakage (exact location/time correlation)

## Mitigations

- Chunked, resumable uploads during recording
- Client-side encryption before upload
- No public discovery feed
- Incident-only contributions; explicit opt-in
- Coarse location tiles + time windows (no precise pins by default)
- Rate limits, device verification, abuse reporting, moderation tooling
- Minimal metadata storage; avoid persistent location trails
- Strong access controls + auditing for video/key access

## Non-Goals (Explicit)

- We cannot stop someone from filming in public.
- We cannot guarantee legal admissibility; we can support integrity features.
- We do not aim to provide real-time crowd surveillance features.
