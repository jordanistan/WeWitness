Ticket 2: Backend Engineer – WeWitness Secure API & Storage
Role

Backend Engineer (Node.js or Go)

Priority

High

Overview

Design and implement the WeWitness backend, responsible for ingesting encrypted video chunks, managing incidents, and enforcing strict access controls.

The backend must assume zero trust and minimize stored metadata.

Responsibilities
Core API

Authentication & session management

Encrypted video chunk ingestion

Resumable uploads

Secure object storage integration

Incident lifecycle management

Trusted contact & sharing access control

Security & Abuse Prevention

Rate limiting

Upload/session validation

Access auditing

Abuse reporting hooks

Minimal metadata retention

Optional (Phase 1.5)

Evidence integrity receipts (hash logs)

Exportable evidence bundles

Technical Expectations

Node.js or Go

PostgreSQL

Redis (queues, rate limiting)

S3-compatible object storage

Strong input validation and authorization checks

Deliverables

REST or GraphQL API

Database schema + migrations

API documentation

Threat model contributions

Acceptance Criteria

Server never sees plaintext video by default

Users can only access videos they own or were explicitly shared

Incidents are time-bound and scoped

Abuse controls function under load

Notes

Security is more important than throughput. Conservative design decisions are encouraged.