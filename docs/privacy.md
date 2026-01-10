# Privacy Overview (WeWitness)

WeWitness is designed to preserve user-owned evidence while minimizing the creation of new privacy risks.

## Core Principles

- Backup first. Sharing is optional and user-controlled.
- No public “nearby videos” feed.
- Minimize data collection and retain data only as long as needed.

## What We Collect

- Account identifiers (e.g., email/phone) for authentication (implementation dependent)
- Encrypted video chunks and related upload metadata
- Coarse location tile (if enabled) and time window for incident beacons
- Device/app diagnostics (minimal; opt-in where possible)

## What We Do NOT Provide

- We do not provide a public browsing experience of videos by location.
- We do not show precise user locations to other users by default.

## Location Handling

- Default is coarse location (e.g., tile/geohash).
- Precision controls (if any) must be explicit opt-in and scoped to an incident.

## Sharing

- Videos are private by default.
- Sharing is explicit, per-video or per-incident, to selected recipients.

## Encryption Posture

- Videos are encrypted before upload.
- Server stores encrypted blobs. Viewing requires authorized access.

## Deletion

- Users can delete videos and incidents (subject to retention rules and legal holds where applicable).
- See `docs/data_retention.md` for defaults.

## Safety Warning

Users are responsible for complying with local recording laws, especially regarding audio.
