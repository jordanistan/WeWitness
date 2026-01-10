Ticket 1: Mobile Engineer – Build WeWitness Mobile App (iOS & Android)
Role

Mobile Engineer (React Native or Flutter)

Priority

High

Overview

Build the WeWitness mobile application, focused on real-time encrypted video backup, emergency workflows, and privacy-first user experience.

This app must reliably preserve video evidence even if the device is stolen, destroyed, or forcibly accessed.

Responsibilities
Core Features

Video recording with continuous encrypted chunk uploads

Background uploads that tolerate:

poor connectivity

app backgrounding

temporary offline states

Personal Safety Vault (private by default)

Trusted Contacts management

Emergency UX actions:

Panic upload

Share last X minutes

One-tap share to trusted contact

Incident Beacon creation (time-windowed, coarse location only)

Incident contribution flow (opt-in only)

Privacy & Safety

No public discovery feed

No precise location exposure by default

Explicit user consent for all sharing

Clear UX signaling when recording/uploading

Technical Expectations

React Native or Flutter

Secure local storage

Client-side encryption before upload

Chunked/resumable uploads

Battery- and bandwidth-conscious design

Deliverables

Mobile app (iOS + Android)

README for mobile setup

Manual test scenarios for device-loss recovery

UX flows for emergency actions

Acceptance Criteria

Video survives simulated phone loss

Upload resumes after network interruption

No video visible without explicit user sharing

Emergency actions work under stress conditions

Notes

This is a safety-critical application. UX clarity and reliability matter more than visual polish.