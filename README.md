```markdown
# Community Safety Backup (Working Title)

A community-first safety app that helps people **securely back up** important video evidence in real time—so footage remains available even if a phone is stolen, broken, or the recording is forcibly deleted.

> **Design principle:** Backup first. Sharing is always user-controlled. No public “nearby videos” feed.

---

## Why this exists

When something unsafe happens in public, the most important evidence is often recorded on a phone—then lost due to:
- theft or device damage,
- forced deletion / intimidation,
- app crashes or poor connectivity,
- accidental loss.

This app focuses on **instant, encrypted backup** while recording, with optional **incident-based** community witness contributions.

---

## What it does

### 1) Personal Safety Vault (Default)
- Records video and **uploads encrypted chunks** continuously.
- Video can be recovered even if the phone is taken or destroyed.
- Only the recorder (and explicitly shared recipients) can view.

### 2) Incident Beacon (Opt-in, Event-Based)
- A user can start an **Incident Beacon** tied to a **time window + approximate area**.
- Nearby opted-in users can contribute footage **to that incident only** (not a public feed).
- Incident visibility is limited to:
  - incident creator,
  - contributors,
  - explicitly shared recipients (trusted contacts, attorney, investigator, etc.).

---

## Privacy & Safety (Non-Negotiables)

This project is explicitly designed to avoid becoming a surveillance or stalking tool:

- ✅ **No public discovery feed** of nearby videos
- ✅ **Opt-in only** community contributions
- ✅ **Coarse location only** (tile/geohash), never precise pins by default
- ✅ **Time-windowed incidents** (e.g., last 20–30 minutes)
- ✅ **User-controlled sharing** (default private vault)
- ✅ **Reporting + moderation** for any shared content
- ✅ **Rate limiting + abuse prevention**
- ✅ Optional **auto-blur** for faces/license plates on shared exports
- ✅ **Retention controls** (auto-delete unless preserved)

---

## How it works (High Level)

### On-device
- Video is recorded and split into **small chunks** (e.g., 1–3s).
- Each chunk is **encrypted locally** before upload.
- Upload is resumable and continues during connectivity changes.

### Server
- Stores only **encrypted blobs** + minimal metadata.
- Default posture is **zero-knowledge-ish**: server cannot view content without a user-provided key.

### Sharing
- Sharing is key-based:
  - the video encryption key is shared (securely) with approved recipients,
  - recipients can decrypt and view.

### Evidence Integrity (Optional)
- Each chunk is hashed and a signed receipt can be issued for tamper-evidence / chain-of-custody support.

---

## MVP Scope (Phase 1)

**Goal:** Prove “record → encrypt → upload → recover” is reliable.

### Must-have
- Account + device verification
- Record video + continuous encrypted backup (chunked upload)
- Safety Vault gallery (private)
- Trusted Contacts (share specific videos)
- Emergency UX:
  - “Panic upload”
  - “Share last 2 minutes”
  - “One-tap share to Trusted Contact”
- Export video (decrypted locally for export)

### Nice-to-have
- Evidence receipts (hash log)
- Background upload improvements
- Low-bandwidth mode (reduced bitrate)

---

## Phase 2: Incident Beacon (Beta)

- Create incident beacon (time window + coarse location tile)
- Allow opt-in nearby contributors
- Incident owner can:
  - request specific time range,
  - export a compiled evidence package,
  - share access with selected recipients.

---

## Tech Stack (Suggested)

### Mobile
- **React Native** or **Flutter**
- Background upload support + local encryption

### Backend
- Node.js / Go
- PostgreSQL
- Redis (rate limiting, queues)

### Storage
- S3-compatible object storage
- Lifecycle rules for retention and auto-deletion

### Notifications
- APNs + FCM

### Crypto
- libsodium (preferred) or vetted platform crypto
- Envelope encryption for key sharing

---

## Repository Structure (Proposed)

```

/
├─ apps/
│  ├─ mobile/                 # React Native or Flutter app
│  └─ admin/                  # Optional moderation/admin portal
├─ services/
│  ├─ api/                    # REST/GraphQL API
│  ├─ upload/                 # Chunked upload + resumable sessions
│  └─ worker/                 # Background jobs (retention, exports, receipts)
├─ infra/
│  ├─ terraform/              # Infrastructure as code
│  └─ k8s/                    # Optional Kubernetes manifests
├─ docs/
│  ├─ threat-model.md
│  ├─ privacy.md
│  └─ prd.md
└─ README.md

```

---

## Threat Model (Summary)

Primary threats we defend against:
- phone theft/destruction during/after recording
- forced deletion
- unauthorized viewing by server operators
- harassment via location-based browsing
- mass spam uploads / brigading

Key mitigations:
- encrypted, chunked uploads
- no public feed, incident-only contributions
- coarse location and time windows
- rate limits + verified accounts + reporting tools

See: `docs/threat-model.md`

---

## Roadmap

- [ ] MVP: Vault recording + encrypted backup + recovery
- [ ] Trusted Contacts sharing
- [ ] Export and evidence receipt logs
- [ ] Incident Beacon beta
- [ ] Auto-blur tools for shared exports
- [ ] Community verification + reputation signals
- [ ] External security review

---

## Contributing

Contributions are welcome—especially around:
- mobile background recording/upload reliability,
- cryptography review,
- abuse prevention + privacy design,
- UX for “panic mode” workflows.

Please open an issue describing what you want to work on.

---

## Disclaimer

This app is intended to improve personal safety and preserve user-owned evidence.  
It is **not** designed for surveillance, stalking, or public doxxing. Misuse will result in bans and potential legal action.

Recording laws (especially audio) vary by location. Users are responsible for complying with local laws.

---

## License

TBD (MIT / Apache-2.0 recommended for open source, or proprietary if you plan to commercialize).
```

