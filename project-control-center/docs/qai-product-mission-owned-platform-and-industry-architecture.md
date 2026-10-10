# QAI / Q — Quality of Life Platform Charter and First-Party Architecture
**Captured:** 2026-10-10
**Status:** Product vision and proposed architecture. Review/approval pending. No production implementation claimed.
**Primary project:** saas-quality-crm
**Related:** [QAI architecture](./qai-operating-system-architecture.md)

## Product North Star
**Technology should handle the complexity of life so people can spend more of their time actually living it.**
The product aims to remove repetitive administrative friction while preserving human judgment, empathy, agency and meaningful relationships. Measure net time and quality-of-life improvements, not engagement minutes, number of notifications, or features shipped.

## Ownership and independence doctrine
- Q, QAI, Quality CRM, Q Voice, Q Live, Q Experiences, and Quality Communications are one coherent first-party platform with shared identity/context, data policies, mobile/desktop apps, workflow engine, and internal APIs.
- Wispr Flow is **not** a target production dependency: Q Voice must own the dictation, meeting transcription, speech diarization, voice conversations, meeting extraction and cross-context actions experience. Other apps are competitor/product references only.
- GitHub, WordPress, MCP, browser extensions, particular cloud providers and external AI models are implementation choices, not required product centerpieces.
- We own newly authored application code, UI/UX, data schema, user relationships, tenant isolation, capabilities registry, decision logic, orchestration, workflow contracts and first-party customer-facing services.
- Technical independence does NOT mean building every dependency/model from zero. Select replaceable, self-hostable, commercial-license-compatible foundations when they improve reliability/cost/speed. Track model/framework weights/code licenses individually, provenance, usage terms, training restrictions and vendor exit paths.
- Long-term capability target: self-host critical speech/transcription components and models where feasible with compliant licenses, replace external AI via provider adapters when appropriate; retain ability to buy specialist infrastructure where a cost/quality/security case justifies it. Do not assert zero third-party infrastructure dependence, zero cost or fully owned model IP.
- External inputs and APIs require audit of necessity, data handling, licensing, switching cost and fallback. No mandatory additional user subscriptions to get baseline Q core capabilities.

## Human-outcome product principles
1. **Proactive but not intrusive**: Q solves mundane problems with configurable autonomy/consent, avoids creating more notifications/tasks than it removes.
2. **Be transparent about AI**: clearly identify synthesized voices, translations, AI-generated hosts and digital doubles; no deceptive impersonation.
3. **Humans stay reachable**: easy escalation to a qualified human for nuanced, sensitive, or unresolved service cases with context transfer. AI should free staff to provide higher-quality human care.
4. **Consent and control**: explicit recording consent, speaker identity verification, voice/image likeness grants and revocation, recording retention/deletion, protected tenant/personal workspaces.
5. **Respect intent**: concepts and brainstorms are proposals, not binding user directives; human approval for consequential outbound actions, promotions and deployment.
6. **Ownership only where it improves service**: do not spend years building commodity low-level infrastructure instead of shipping outcomes.
7. **Prove time returned**: baseline + measurable time-to-resolution, median touches, duplicate-entry avoided, interruptions, opt-out, customer satisfaction, follow-up completion, error/rework, accessibility, employee experience. Account for onboarding and correcting AI mistakes.

## Logical Q product modules (one identity and backend)
- **Q Voice**: Q Dictate; Q Meetings with diarization/attribution; Q Conversations; Q Capture spoken commentary; Q Actions (approved tools); Q Translate; mobile/desktop continuity, eventual system-approved keyboard/OS entry points.
- **QAI**: permission-aware context graph; personal/work organization routing; recall; reasoning; research; universal capability matching; verified tagging; orchestration and selective automation.
- **Quality CRM**: unified people/organizations/projects/tasks/leads/opportunities/communications/transactions, collaborative review board and detailed audit.
- **Quality Communications**: email identities/inboxes, task-linked phone/SMS/calendar, call analytics, handoff to humans, consent.
- **Q Experiences**: first-party universal engagement engine for content/learning/discovery/loyalty/challenges/events/deals/rewards and feedback; industry-specific deployment adapters.
- **Q Live**: consent-based multilingual live streaming and education, real-person expressive translation, optional clearly disclosed digital presenter/voice likeness, optional audiovisual dubbing/lipsync. Separate exploratory R&D until latency and trust benchmarks met.

## Q Voice technical stack — candidate components, not mandatory vendor products
- First-party Q Mobile & Q Web apps, desktop capture companion only if useful; capture microphone, shared screen, clips, notes and contextual visual evidence with OS permission.
- Media transport may use self-hosted WebRTC/LiveKit or similar open-source transport; user experience is entirely Q.
- Commercially permitted/openly licensed local/cloud speech recognition, speaker diarization, alignment, voice activity detection, voice/speaker identification (opt-in), turn taking, noise handling, TTS and translation. Confidence thresholds and manual corrections required.
- Distinguish anonymous speaker diarization from enduring voice identity. A stable voice profile requires explicit consent and security around biometric templates.
- Live capture of conversations does not give unrestricted audio streams or system-wide screen/keyboard access on iOS/Android; design permitted input modes.
- Recorded media encrypted; no ambient background snooping. Revoke/deletion/export controls.
- All utterance/execution results are linked to source and permissions; drafts/low-confidence extractions route for review.
- Benchmark noisy meetings, accents, code-switching, mobile/desktop latency, errors, cost per hour, memory/CPU, battery use, and offline behavior.

## Q Live — multilingual human experience roadmap
Use the user-provided scenario (live English presentation concurrently heard in Russian, Korean, Mandarin, Japanese, etc.) as a research objective.
Stages:
1. Live original presenter stream + professionally labeled translation captions, language-selectable stream.
2. Simultaneous translated voice in selected languages with expressive prosody, speaker consent, approximate delay shown; preserve original live view.
3. Person-approved voice likeness reproduction for the speaker and signed scope, with clear synthetic dubbing badge and audit, revocation.
4. Optional audiovisual dubbing/lip alignment *only if actual end-to-end latency, streaming artifact quality, cultural nuance, multi-language mix and trust constraints pass tests*; do not promise zero lag, indistinguishable face/voice, or all languages.
5. After-event human-verified translations for educational, medical, legal, investment and other higher-stakes material.
Track translation meaning accuracy, terminology fidelity, time alignment, visible latency, prosody/style, transparency, GPU cost per viewer/language, fallback to subtitles, accessibility.
Commercial-license pitfall: Meta SeamlessM4T and SeamlessStreaming model weights are CC BY-NC, despite parts of repo MIT; not commercially deployable as-is without separate rights. NVIDIA Avatar/Audio2Face SDK source and model rights differ; review per model.

## Universal Experience Engine: framework for EVERY industry, not a fixed list
**Pattern / mechanic + vertical ontology + business instance + local constraints + measured outcome.**
One registry supports any sector represented in a structured industry taxonomy (NAICS/SIC where useful), with specialization through nested categories, service types, audience, customer journey, risk, region, business scale and franchise permissions. Offer capability **proposals** for emerging categories; do not automatically launch inappropriate mechanics everywhere.

Foundational mechanic primitives:
- Discover/check-in/geofenced trail; evidence/verification of activity; passport/badge/collection; educational skill progress; quiz/clue; timed campaign; limited inventory/promotion; referral sharing; local partner offer; authentic feedback; appointments; milestone program; community events; memberships; loyalty points; streaks only when beneficial; rewards and eligibility; accessible alternative to location requirement.
- A/B experiments, segments, recommendation scoring, fraud prevention, eligibility, inventory/budget caps, opt-in/opt-out, redemption verification, accessibility and economic measurement.
- Separate **engagement mechanics** from **content schema/search architecture**. Industry content systems assemble topic hierarchies, customer questions, how-to, local facts, FAQs, videos, evidence, expert review, machine-readable schema, E-E-A-T and YMYL guardrails. Schema alone does not guarantee search rankings.
- A content/knowledge unit can be used by website, voice assistant, course, checklist, localized guide, city portal, loyalty challenge, partner business, phone agent and AI answers. Content re-use must preserve provenance, freshness, ownership and facts.

Sample verticals and considerations:
- Dental office (Cedar City) vs multi-state dental franchise: educational oral-health milestones, wellness-oriented appointment participation, local community events vs centralized multi-location capabilities; **avoid incentivizing clinical choices**, preserve patient privacy, comply with marketing/privacy and referrals rules; no patient data to shared marketing intelligence.
- Chiropractic and allied health: ergonomics education and safe movement programs, no misleading health claims or treatment dependence.
- Plastic surgery/med spa: educational content and non-coercive events, avoid risky treatment incentives and medical claims.
- Real estate and investing: neighborhood learning, market education and location discovery; monitor licensing, fair housing, referral/inducement restrictions and no implied guaranteed returns.
- Law: plain-language legal literacy, expert-approved topical guides; no suggestion that badges substitute for legal advice, no misleading outcome claims.
- Finance: financial literacy and verified tools, no return guarantees and compliance reviews.
- Restaurants/retail: meal trails, discovery passports, seasonal return visits, reservation availability and limited offers with margin/expiry/refund controls.
- Contractors (window treatments, barn-dominium builders): home improvement planning challenges, quality checklists, onsite showroom visits, quote progress; avoid incentivized fabricated reviews.
- Tourism/national parks: location challenges, ecology education, visitor safety and park rules, opt-out alternatives; avoid prompts to enter sensitive/hazardous/restricted sites.
- SaaS/CRM/sales: onboarding learning tracks, team productivity milestones, achievements for verified skill rather than superficial activity.
- Local community/city media: merchant discovery, historical education, city events, partnerships, resident education, local stewardship.
- Franchise vs local branch: brand-global pattern policy with branch-level budgets, zones, permissions, promotions, rollout analytics, market localization and conflict resolution.

Critical review restrictions:
- No rewards for Google Maps reviews: Google's policy forbids reviews offered in exchange for payments/discounts/free goods or services, regardless of sentiment; separate authentic internal feedback activity, no misleading presentation as independent endorsement. FTC also bans purchased positive/negative sentiment and deceptive testimonials.
- HIPAA marketing uses/disclosures of PHI need authorization unless a specific exception applies; healthcare rewards/referrals also require sector-specific legal review. Keep safe alternatives.
- Geolocation, minors, accessibility, discrimination, consumer protection, financial and health claims, giveaway/contest rules and cross-border data consent are deployment gates, not generic disclaimers.

## Universal pattern -> specialization algorithm (proposed)
(1) Understand goal / user need -> (2) look up company/vertical/jurisdiction/customer journey -> (3) recommend suitable mechanic families -> (4) map eligibility & regulatory constraints -> (5) model economics and expected human time value -> (6) generate localized content/questions/schema/experiences -> (7) recommend variants for solo location vs franchise and other industries -> (8) create proposal cards with evidence, ownership and joint managers -> (9) verify tags/permissions -> (10) approve small pilot -> (11) deploy/measure -> (12) merge validated patterns back to capability registry.
Use opt-in proactive suggestion **budget** (e.g. concise shortlist rather than dozens of cards for every idea). Prevent trivial variations from creating platform clutter.

## Quality economics and operating scorecard
- User minutes **actually returned** per week net of setup/troubleshooting/approval.
- Zero duplicate entry incidents and percentage of tasks completed without manual re-keying.
- First-contact resolution and human escalation satisfaction for customer service, accessibility and trust indicators.
- Time spent in meaningful customer relationships vs administration, after measuring baseline.
- Accuracy of speaker attribution, project tagging, action ownership and dispositions.
- Notification-to-value ratio: valuable decisions or resolved issues per alert.
- Revenue/retention/conversion are commercial KPIs but subordinate to honesty, safety and customer quality.
- Protect customer freedom: data export, no forced retention, clear pricing, no dark-pattern gamification, support escalation.

## Suggested build order
1. Define ownership/architecture/license policy and core QAI data & consent primitives.
2. Ship native **Q Dictate and Q Meetings** as a complete vertical slice: capture -> correct speaker IDs -> transcription -> task extraction -> collaborative Kanban review -> desktop/mobile sync -> authorized agent job.
3. Add native Q Conversations and selective permission-scoped actions with audit, then multi-identity Quality Communications.
4. Deploy one generic Q Experiences capability engine to 2 contrasting pilots (e.g. city guide/community and an opt-in dental educational program) with real metrics and sector safety rules.
5. Generalize vertical template generator/industry ontology to all industry categories incrementally with expert-reviewed expansions; do not hand-build hundreds of silos.
6. Launch Q Live subtitles/translated audio as R&D pilots and only then consider face/voice likeness synthesis.
7. Human-centered customer service with verified seamless human handoff.
All work is pending stakeholder approval and test/production gates; no task is actually implemented by writing this document.
