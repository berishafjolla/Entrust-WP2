/* ══════════════════════════════════════════════════════════════════════════
   eNTRUST — Interactive Governance Framework v3
   Complete redesign:
   • "Data Governance Practices" as central aim
   • 4 governance layers per pillar (technical, regulatory, social, institutional)
   • 30 nodes total — zero overlap, multi-ring radial layout
   • Every node click shows how ALL THREE pillars interconnect
   • Grounded in EU Data Act, GDPR, DGA, FAIR, NIST, CEADS
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════
     1. NODE DEFINITIONS
     Three pillars, each with nodes across four governance layers.
     Pillar sectors: Sovereignty = top (270°±55°), Trust = bottom-right (30°±55°),
     Cyber = bottom-left (150°±55°). Gives 110° gap between sectors — no overlap.
  ══════════════════════════════════════════════════════════════════════ */

  const PILLAR_COLORS = {
    sovereignty: { main: '#1a6bc7', light: '#dbeafe', dark: '#1e40af', text: '#1e3a8a' },
    trust:       { main: '#16a34a', light: '#dcfce7', dark: '#15803d', text: '#14532d' },
    cyber:       { main: '#7c3aed', light: '#ede9fe', dark: '#6d28d9', text: '#4c1d95' }
  };

  /* Layer ring radii */
  const RINGS = { inner: 148, mid: 218, outer: 290 };

  /* Pillar anchor angles (degrees, 0 = right, clockwise) */
  const PILLAR_ANGLES = { sovereignty: 270, trust: 30, cyber: 150 };

  /* Node spread within each pillar sector */
  const SPREAD = [
    { ring: 'inner', offset: -22 },
    { ring: 'inner', offset:  22 },
    { ring: 'mid',   offset: -36 },
    { ring: 'mid',   offset:   0 },
    { ring: 'mid',   offset:  36 },
    { ring: 'outer', offset: -24 },
    { ring: 'outer', offset:  24 },
    { ring: 'outer', offset:   0 },
  ];

  const NODES = {

    /* ── PILLAR 1: Data Sovereignty ── */
    sovereignty: {
      label: 'Data\nSovereignty',
      angle: 270,
      pillar: 'sovereignty',
      keywords: [
        {
          id: 'usage-control',
          label: 'Usage Control',
          layer: 'technical',
          icon: '⚙️',
          spreadIdx: 0
        },
        {
          id: 'policy-enforcement',
          label: 'Policy\nEnforcement',
          layer: 'technical',
          icon: '📋',
          spreadIdx: 1
        },
        {
          id: 'data-spaces',
          label: 'Data Spaces\n& IDS-RAM',
          layer: 'institutional',
          icon: '🌐',
          spreadIdx: 2
        },
        {
          id: 'eu-data-act',
          label: 'EU Data Act\n& DGA',
          layer: 'regulatory',
          icon: '⚖️',
          spreadIdx: 3
        },
        {
          id: 'gdpr-consent',
          label: 'GDPR &\nConsent Rights',
          layer: 'regulatory',
          icon: '🛡️',
          spreadIdx: 4
        },
        {
          id: 'data-portability',
          label: 'Data\nPortability',
          layer: 'regulatory',
          icon: '🔄',
          spreadIdx: 5
        },
        {
          id: 'ceads',
          label: 'CEADS\nEco-system',
          layer: 'institutional',
          icon: '🏛️',
          spreadIdx: 6
        },
        {
          id: 'provenance',
          label: 'Provenance\n& Audit Trails',
          layer: 'technical',
          icon: '🔍',
          spreadIdx: 7
        }
      ]
    },

    /* ── PILLAR 2: Trust & Trustworthiness ── */
    trust: {
      label: 'Trust &\nTrustworthiness',
      angle: 30,
      pillar: 'trust',
      keywords: [
        {
          id: 'trustworthy-data',
          label: 'Trustworthy\nData Quality',
          layer: 'technical',
          icon: '📊',
          spreadIdx: 0
        },
        {
          id: 'trustworthy-process',
          label: 'Trustworthy\nProcesses',
          layer: 'technical',
          icon: '🔬',
          spreadIdx: 1
        },
        {
          id: 'human-centred-ai',
          label: 'Human-Centred\nAI (HCAI)',
          layer: 'social',
          icon: '🤖',
          spreadIdx: 2
        },
        {
          id: 'explainability',
          label: 'Explainability\n& Transparency',
          layer: 'social',
          icon: '💡',
          spreadIdx: 3
        },
        {
          id: 'informed-consent',
          label: 'Informed\nConsent',
          layer: 'social',
          icon: '✅',
          spreadIdx: 4
        },
        {
          id: 'fair-principles',
          label: 'FAIR\nPrinciples',
          layer: 'regulatory',
          icon: '📐',
          spreadIdx: 5
        },
        {
          id: 'stakeholder-participation',
          label: 'Stakeholder\nParticipation',
          layer: 'institutional',
          icon: '🤝',
          spreadIdx: 6
        },
        {
          id: 'data-traceability',
          label: 'Data\nTraceability',
          layer: 'technical',
          icon: '🔗',
          spreadIdx: 7
        }
      ]
    },

    /* ── PILLAR 3: Cybersecurity ── */
    cyber: {
      label: 'Cybersecurity\n& Resilience',
      angle: 150,
      pillar: 'cyber',
      keywords: [
        {
          id: 'encryption',
          label: 'Encryption &\nAnonymisation',
          layer: 'technical',
          icon: '🔐',
          spreadIdx: 0
        },
        {
          id: 'access-control',
          label: 'Role-Based\nAccess Control',
          layer: 'technical',
          icon: '🔑',
          spreadIdx: 1
        },
        {
          id: 'iot-security',
          label: 'IoT Device\nSecurity',
          layer: 'technical',
          icon: '📡',
          spreadIdx: 2
        },
        {
          id: 'blockchain',
          label: 'Blockchain\nImmutability',
          layer: 'technical',
          icon: '⛓️',
          spreadIdx: 3
        },
        {
          id: 'nist-framework',
          label: 'NIST IoT\nGuidelines',
          layer: 'regulatory',
          icon: '📜',
          spreadIdx: 4
        },
        {
          id: 'threat-detection',
          label: 'AI Anomaly\nDetection',
          layer: 'technical',
          icon: '🔭',
          spreadIdx: 5
        },
        {
          id: 'integrity',
          label: 'Data Integrity\n& Resilience',
          layer: 'institutional',
          icon: '🛡',
          spreadIdx: 6
        },
        {
          id: 'federated-learning',
          label: 'Federated\nLearning',
          layer: 'technical',
          icon: '🧠',
          spreadIdx: 7
        }
      ]
    }
  };

  /* ══════════════════════════════════════════════════════════════════════
     2. NARRATIVE CONTENT — every node tells the three-pillar story
  ══════════════════════════════════════════════════════════════════════ */

  const NARRATIVES = {

    /* ── AIM ── */
    aim: {
      icon: '🌾',
      title: 'Data Governance Practices',
      subtitle: 'The eNTRUST Work Package Aim',
      accentColor: '#f97316',
      intro: 'Effective data governance in agriculture demands that three interdependent pillars operate in concert. Sovereignty defines the terms, Trust verifies the actors and processes, and Cybersecurity secures the infrastructure — together enabling responsible, compliant, and farmer-centric data sharing.',
      chain: [
        {
          pillar: 'sovereignty',
          color: '#1a6bc7',
          icon: '🔒',
          heading: 'Sovereignty: Setting the terms of data use',
          text: 'Usage control policies, GDPR-compliant consent mechanisms, and EU Data Act rights encode farmer intent into technically enforceable contracts. Data spaces such as CEADS provide the institutional backbone, while provenance systems ensure every downstream use is traceable and auditable.'
        },
        {
          pillar: 'trust',
          color: '#16a34a',
          icon: '🤝',
          heading: 'Trust: Verifying actors, data, and processes',
          text: 'Trustworthiness is not assumed — it is built through transparent processes, explainable AI, and FAIR data principles. Informed consent addresses the information asymmetries that make farmers reluctant to share. Stakeholder participation ensures governance structures remain legitimate and farmer-centred.'
        },
        {
          pillar: 'cyber',
          color: '#7c3aed',
          icon: '🛡',
          heading: 'Cybersecurity: Protecting the infrastructure',
          text: 'Agricultural IoT systems face ransomware, spoofing, and integrity attacks. Encryption, role-based access control, and blockchain immutability enforce the sovereignty policies at the infrastructure level. Without this layer, even well-designed governance frameworks become unenforceable in practice.'
        }
      ],
      closing: 'The three pillars form a complete governance loop: Sovereignty sets the rules, Trust validates the participants and data quality, and Cybersecurity enforces compliance at the technical layer — making responsible agricultural data sharing both legally sound and operationally resilient.'
    },

    /* ── SOVEREIGNTY NODES ── */
    'usage-control': {
      icon: '⚙️',
      title: 'Usage Control',
      subtitle: 'Technical Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'Usage control goes beyond traditional access control: it governs what happens to data after it has been shared, not just whether access is granted. In agricultural data spaces, usage control policies travel with the data and are enforced at every downstream node.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Encoding farmer intent technically', text: 'Usage control policies are formally specified as machine-readable contracts within IDS-RAM and data space connectors. They define permitted purposes, time windows, geographic restrictions, and anonymisation requirements — ensuring farmer intent is enforced, not merely promised.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Making policies credible and understandable', text: 'Usage control is only effective if farmers understand and trust what they are consenting to. Explainability techniques translate complex policy logic into plain-language summaries. Stakeholder participation ensures policies reflect actual farmer needs rather than corporate defaults.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Enforcing policies at the infrastructure', text: 'Usage control policies require cryptographic enforcement. Role-based access control, blockchain-recorded policy decisions, and anomaly detection ensure that policy violations are detected and logged. Without cybersecurity primitives, usage control remains a contractual fiction.' }
      ],
      closing: 'Usage control is the technical bridge between legal rights (sovereignty) and operational reality (cybersecurity), with trust mechanisms ensuring the system remains farmer-centric and comprehensible.'
    },

    'policy-enforcement': {
      icon: '📋',
      title: 'Policy Enforcement',
      subtitle: 'Technical Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'Policy enforcement translates governance rules into automated, tamper-resistant technical mechanisms. In agricultural data sharing, smart contracts and data space connectors automate the enforcement of sharing agreements without requiring constant human intervention.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Automating compliance with farmer-defined rules', text: 'Smart contracts encode sharing conditions — who can access yield data, under what circumstances, and for how long. Signed policy manifests travel with data through the CEADS ecosystem, making violations detectable at every hop. Cryptographic accountability ensures non-repudiation.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Ensuring enforcement is transparent and auditable', text: 'Farmers must be able to verify that their policies are being enforced as agreed. Trustworthy processes include audit trails, process transparency mechanisms, and data traceability tools that allow farmers to inspect how their data has been used after the fact.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Protecting the enforcement infrastructure', text: 'Policy enforcement systems are high-value attack targets. Blockchain immutability prevents retroactive policy manipulation. AI anomaly detection identifies attempts to bypass enforcement mechanisms. IoT device security ensures that data entering the governance system has not been tampered with at the source.' }
      ],
      closing: 'Effective policy enforcement requires sovereignty to define the rules, trust to make them transparent and auditable, and cybersecurity to protect the enforcement infrastructure from attack or circumvention.'
    },

    'data-spaces': {
      icon: '🌐',
      title: 'Data Spaces & IDS-RAM',
      subtitle: 'Institutional Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'Data spaces are decentralised digital ecosystems where participants share data under common governance rules without surrendering control to a central platform. The International Data Spaces Reference Architecture Model (IDS-RAM) provides the technical standard underpinning European data space initiatives including CEADS.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Decentralised control without central gatekeepers', text: 'IDS-RAM connectors allow each participant to maintain control of their data while enabling interoperability. Data spaces implement usage control at the connector level, meaning sovereignty policies are enforced peer-to-peer rather than delegated to a platform operator. The EU Data Act and DGA provide the legal foundation.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Shared vocabularies and certified participants', text: 'Data spaces rely on shared semantic vocabularies and ontologies to enable interoperability. Participant certification and trust anchors ensure that only verified actors join the ecosystem. FAIR principles guide data publication standards, making data findable, accessible, and reusable across the space.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Securing the connector infrastructure', text: 'IDS connectors are the enforcement points of the data space and must be hardened against attack. Mutual TLS authentication, encrypted data channels, and integrity verification at connector level ensure that the sovereignty guarantees of the data space are not undermined by infrastructure vulnerabilities.' }
      ],
      closing: 'Data spaces are the institutional realisation of the three-pillar framework: sovereignty rules are encoded in connectors, trust is established through certification, and cybersecurity protects the shared infrastructure.'
    },

    'eu-data-act': {
      icon: '⚖️',
      title: 'EU Data Act & Data Governance Act',
      subtitle: 'Regulatory Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'The EU Data Act (2023) and Data Governance Act (2022) form the cornerstone of European data governance. The Data Act grants users access and usage rights to data generated by connected devices (including agricultural machinery and sensors), while the DGA establishes frameworks for trusted data sharing across sectors.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Legal rights to data from connected devices', text: 'The EU Data Act grants farmers the right to access data generated by their tractors, sensors, and precision farming equipment — even when those devices are manufactured by third parties. This creates a legal foundation for data sovereignty that complements technical enforcement mechanisms. The DGA enables data altruism and data intermediary services.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Regulatory legitimacy and accountability', text: 'Compliance with EU regulations signals institutional trustworthiness to farmers and trading partners. The DGA requires data intermediaries to act in a neutral, trustworthy manner. Regulatory compliance frameworks provide external accountability mechanisms that complement internal trust-building processes.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Regulatory security requirements', text: 'The EU Data Act and DGA include security obligations for data holders and intermediaries. These align with the NIS2 Directive requirements for critical infrastructure operators, which increasingly include agricultural data platforms. Compliance requires documented security controls, incident reporting, and regular audits.' }
      ],
      closing: 'The EU regulatory framework provides the legal foundation for data sovereignty rights, creates accountability mechanisms that support trust, and mandates security standards that align with cybersecurity best practices.'
    },

    'gdpr-consent': {
      icon: '🛡️',
      title: 'GDPR & Consent Rights',
      subtitle: 'Regulatory Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'GDPR remains the primary framework for personal data protection in agricultural contexts. While much agricultural data is non-personal, data about farming practices, yields, and locations can be indirectly identifying. GDPR consent mechanisms provide the legal basis for data sharing and establish clear rights for data subjects.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Legal basis for data control', text: 'GDPR provides farmers with rights to access, rectify, erase, and port their personal data. Explicit consent requirements prevent agribusinesses from using farmer data for undisclosed purposes. Data minimisation and purpose limitation principles align with sovereignty goals of restricting data use to agreed purposes.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Addressing information asymmetries', text: 'Research shows that most agricultural data agreements exceed farmers\' readability levels, creating structural information asymmetries. GDPR\'s plain language requirements and informed consent standards directly address this. Transparency obligations require data controllers to explain how data will be used in comprehensible terms.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Technical and organisational measures', text: 'GDPR Article 32 requires appropriate technical and organisational security measures, including encryption and pseudonymisation. Data breach notification requirements (72 hours) create strong incentives for robust cybersecurity. Privacy by design and by default principles align GDPR compliance with proactive cybersecurity practice.' }
      ],
      closing: 'GDPR is the regulatory expression of the three-pillar framework: it grants sovereignty rights, mandates transparency that builds trust, and requires cybersecurity measures to protect personal data.'
    },

    'data-portability': {
      icon: '🔄',
      title: 'Data Portability',
      subtitle: 'Regulatory Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'Data portability — the ability to move data across systems without barriers — is both a regulatory right (GDPR Article 20, EU Data Act) and a technical requirement for interoperable agricultural data ecosystems. It prevents vendor lock-in and enables farmers to benefit from competitive data services.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Freedom from platform dependency', text: 'Data portability rights prevent agri-tech vendors from using proprietary formats to lock farmers into their platforms. The EU Data Act extends portability rights to IoT-generated data from agricultural machinery. Interoperable APIs and standardised data formats (INSPIRE, FIWARE NGSI-LD) enable sovereignty in practice.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Enabling competitive and transparent markets', text: 'Portability enables farmers to switch providers if they lose trust in a current service, creating market accountability. Standardised data formats also improve data quality and consistency, supporting the trustworthy data dimension. FAIR principles (Findable, Accessible, Interoperable, Reusable) operationalise portability at the data level.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Securing data in transit', text: 'Data portability operations — transferring data between platforms — are high-risk moments for data security. Encrypted transfer protocols, integrity verification, and authenticated APIs ensure that portability does not create new attack surfaces. Secure data migration procedures protect against man-in-the-middle attacks during platform transitions.' }
      ],
      closing: 'Data portability is a sovereignty right, a trust enabler (through market accountability), and a cybersecurity challenge — requiring all three pillars to work together to make it safe and effective.'
    },

    'ceads': {
      icon: '🏛️',
      title: 'CEADS Ecosystem',
      subtitle: 'Institutional Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'The Common European Agricultural Data Space (CEADS) is the proposed decentralised ecosystem for direct agricultural data exchange across the EU. It represents the institutional realisation of European data sovereignty principles applied specifically to the agricultural sector.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Institutional framework for farmer data rights', text: 'CEADS implements data sovereignty at the ecosystem level: farmers retain control of their data while enabling interoperability across the EU agricultural sector. The ecosystem operates on IDS-RAM principles, with usage control enforced at the connector level. CEADS is part of the broader Common European Data Spaces initiative covering 14 sectors.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Governance structures and stakeholder representation', text: 'CEADS governance structures must include farmer representation through cooperatives and advisory bodies to maintain legitimacy. Shared semantic vocabularies and ontologies enable semantic interoperability while maintaining data quality standards. Trust seals and certification systems for CEADS participants provide external accountability.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Ecosystem-level security governance', text: 'CEADS requires coordinated cybersecurity governance across all participants. Common security standards, incident sharing mechanisms, and coordinated vulnerability disclosure ensure that the ecosystem\'s security is not undermined by its weakest participant. NIS2 compliance obligations apply to critical digital infrastructure within CEADS.' }
      ],
      closing: 'CEADS is the institutional embodiment of the three-pillar framework at the European level: sovereignty rights are encoded in the architecture, trust is built through governance structures, and cybersecurity is coordinated across the ecosystem.'
    },

    'provenance': {
      icon: '🔍',
      title: 'Provenance & Audit Trails',
      subtitle: 'Technical Layer — Data Sovereignty',
      accentColor: '#1a6bc7',
      intro: 'Data provenance systems track the full lifecycle of agricultural data — from collection through processing to sharing and use. Audit trails create immutable records of every access decision, enabling accountability and supporting both regulatory compliance and farmer trust.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Traceability as a control mechanism', text: 'Provenance systems ensure that sovereignty policies are not just set but verifiably enforced. Farmers can inspect how their data has been used, by whom, and for what purpose. Cryptographically signed provenance records make it impossible to deny or retroactively alter data usage history, supporting accountability under GDPR and the EU Data Act.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Building confidence through transparency', text: 'Audit trails are a key mechanism for building trustworthiness: they demonstrate that governance processes are operating as promised. Data traceability allows farmers to verify compliance claims independently. Transparent provenance records also support data quality assessment — enabling recipients to evaluate the reliability of shared agricultural data.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Tamper-resistant record-keeping', text: 'Provenance systems must be protected against tampering to be trustworthy. Blockchain immutability provides tamper-resistant audit logs for data access decisions. Cryptographic hashing ensures that any modification to provenance records is detectable. Secure timestamping provides legal-grade evidence for compliance and dispute resolution.' }
      ],
      closing: 'Provenance and audit trails are the accountability backbone of the governance framework: they make sovereignty policies verifiable, build trust through transparency, and rely on cybersecurity to remain tamper-resistant.'
    },

    /* ── TRUST NODES ── */
    'trustworthy-data': {
      icon: '📊',
      title: 'Trustworthy Data Quality',
      subtitle: 'Technical Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Trustworthy data (TD) is defined as accurate, complete, consistent, and timely data from reputable sources. In agricultural contexts, data quality directly affects agronomic decisions — poor quality data can lead to crop losses, environmental damage, and erosion of farmer confidence in digital systems.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Data quality as a governance requirement', text: 'Data sovereignty frameworks must include quality standards as part of usage control policies. Farmers sharing data have a legitimate interest in knowing that data quality is maintained throughout the sharing chain. Provenance systems track data transformations that may affect quality, enabling quality accountability across the full data lifecycle.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: The foundation of data-driven decision making', text: 'Trustworthy data and trustworthy processes are interdependent: the failure of either compromises the trustworthiness of the entire data ecosystem. Data quality dimensions include accuracy, completeness, consistency, timeliness, and representativeness. AI-driven anomaly detection can automatically flag quality issues before they propagate through the data sharing chain.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Protecting data integrity', text: 'Data integrity attacks — where adversaries modify data in transit or at rest — directly undermine data quality. Cryptographic integrity verification, secure transmission protocols, and tamper-evident storage mechanisms protect the quality of agricultural data as it moves through the governance ecosystem. IoT sensor security prevents quality degradation at the data collection point.' }
      ],
      closing: 'Data quality is a governance responsibility shared across all three pillars: sovereignty defines quality standards, trust mechanisms verify compliance, and cybersecurity protects data from integrity attacks.'
    },

    'trustworthy-process': {
      icon: '🔬',
      title: 'Trustworthy Processes',
      subtitle: 'Technical Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Trustworthy processes (TP) encompass the mechanisms through which data is collected, processed, shared, and used. Process trustworthiness requires transparency, privacy preservation, data control, and consent mechanisms that operate reliably and verifiably throughout the data lifecycle.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Processes that respect farmer control', text: 'Trustworthy processes must be designed to preserve farmer data sovereignty at every step. This means consent-based processing, purpose limitation, and mechanisms for farmers to monitor and revoke access. Process transparency — making the data processing pipeline visible and auditable — is both a sovereignty requirement and a trust-building mechanism.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Transparency and accountability in processing', text: 'Trustworthy data and trustworthy processes are the two dimensions of trustworthiness identified in the literature. Process trustworthiness requires that data processing pipelines are transparent, that algorithms are explainable, and that processing decisions can be audited. Human-in-the-loop and human-on-the-loop mechanisms maintain human oversight of automated processes.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Securing processing infrastructure', text: 'Processing infrastructure is a critical attack surface. Federated learning architectures enable privacy-preserving processing without centralising sensitive data. Secure multi-party computation allows collaborative analysis while protecting individual farmer data. Access controls on processing systems prevent unauthorised manipulation of data transformation pipelines.' }
      ],
      closing: 'Trustworthy processes connect all three pillars: they must respect sovereignty constraints, maintain transparency to build trust, and be secured against the cybersecurity threats that could undermine their integrity.'
    },

    'human-centred-ai': {
      icon: '🤖',
      title: 'Human-Centred AI (HCAI)',
      subtitle: 'Social Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Human-Centred AI integrates human expertise and oversight into automated data processing through Human-In-The-Loop (HITL) and Human-On-The-Loop (HOTL) mechanisms. In agricultural data governance, HCAI ensures that AI-driven decisions remain accountable to farmers and aligned with their values and knowledge.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Human oversight of automated decisions', text: 'HCAI principles require that consequential decisions affecting farmers — such as credit scoring, insurance pricing, or agronomic recommendations — remain subject to human review. This aligns with GDPR\'s right not to be subject to solely automated decision-making (Article 22). Human oversight mechanisms are a sovereignty safeguard against algorithmic capture of farmer agency.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Building farmer confidence in AI systems', text: 'Farmers are more likely to trust and adopt AI-driven advisory systems when they can understand how recommendations are generated and can override or query automated outputs. HCAI design principles — including explainability, contestability, and human control — directly address the trust barriers that limit agricultural AI adoption. Stakeholder participation in AI system design ensures systems reflect farmer knowledge.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Protecting AI systems from adversarial attack', text: 'Agricultural AI systems are vulnerable to adversarial attacks that manipulate inputs to produce incorrect outputs — potentially causing crop losses or financial harm. Robust AI security measures, including adversarial training, input validation, and anomaly detection, protect the integrity of HCAI systems. Federated learning architectures reduce attack surfaces by keeping training data distributed.' }
      ],
      closing: 'Human-Centred AI is where the three pillars converge most visibly: sovereignty rights protect farmers from algorithmic harm, trust is built through explainability and human control, and cybersecurity protects the AI infrastructure from manipulation.'
    },

    'explainability': {
      icon: '💡',
      title: 'Explainability & Transparency',
      subtitle: 'Social Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Explainability techniques make algorithmic processes comprehensible to farmers and other stakeholders, enabling informed consent and meaningful oversight. Transparency in data governance means making the full data processing pipeline — from collection to use — visible and auditable.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Transparency as a rights enabler', text: 'Farmers cannot exercise their data sovereignty rights if they do not understand how their data is being used. Explainability is therefore a prerequisite for meaningful consent and effective sovereignty. Plain-language policy summaries, visualisation tools, and accessible audit interfaces translate technical governance mechanisms into actionable farmer knowledge.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Comprehensibility as a trust foundation', text: 'Explainability is one of the most powerful trust-building mechanisms available. When farmers understand why a recommendation was made or how their data contributed to an analysis, their confidence in the system increases. Explainability techniques (LIME, SHAP, counterfactual explanations) make AI-driven agricultural advisory systems interpretable to non-expert users.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Transparency without security compromise', text: 'Transparency must be balanced against security: overly detailed explanations of system internals can enable adversarial attacks. Differential privacy techniques allow statistical insights to be shared without revealing individual data. Secure explanation architectures provide meaningful transparency to authorised users while protecting system security from external exploitation.' }
      ],
      closing: 'Explainability and transparency bridge all three pillars: they make sovereignty rights exercisable, build the trust that enables data sharing, and must be implemented securely to avoid creating new vulnerabilities.'
    },

    'informed-consent': {
      icon: '✅',
      title: 'Informed Consent',
      subtitle: 'Social Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Informed consent is both a legal requirement (GDPR) and a trust-building mechanism. Research shows that most agricultural data agreements exceed farmers\' readability levels, creating structural information asymmetries that undermine genuine consent. Effective consent mechanisms must be comprehensible, freely given, specific, and revocable.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Consent as the legal basis for data sharing', text: 'Informed consent is the primary legal mechanism through which farmers exercise data sovereignty. GDPR requires explicit, freely given, specific, and informed consent for personal data processing. The EU Data Act extends consent principles to IoT-generated data. Smart contracts can automate consent enforcement, ensuring data is only used for purposes the farmer has agreed to.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Addressing information asymmetries', text: 'Genuine informed consent requires that farmers understand what they are agreeing to. Studies show that agricultural data agreements are often written at a reading level that excludes most farmers. Plain-language summaries, visual consent interfaces, and farmer education programmes are essential trust-building investments. Voluntary codes of conduct (e.g., Farm Data Code) provide sector-specific consent standards.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Protecting consent infrastructure', text: 'Consent management systems are high-value targets: manipulating consent records can enable unauthorised data use at scale. Consent records must be stored with cryptographic integrity protection. Blockchain-based consent management provides tamper-evident records of consent decisions. Access controls on consent management systems prevent unauthorised modification of consent status.' }
      ],
      closing: 'Informed consent is the point where all three pillars intersect most directly: it is the sovereignty mechanism, the trust foundation, and a critical cybersecurity asset that must be protected from manipulation.'
    },

    'fair-principles': {
      icon: '📐',
      title: 'FAIR Principles',
      subtitle: 'Regulatory Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'FAIR principles — Findable, Accessible, Interoperable, Reusable — provide a framework for data management that maximises the value of agricultural data while maintaining governance standards. FAIR compliance is increasingly required by research funders and is a prerequisite for participation in European data spaces.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: FAIR within governance boundaries', text: 'FAIR principles must be implemented within sovereignty constraints: data should be as findable and accessible as the farmer\'s sovereignty policies permit. FAIR licences (Creative Commons, Open Data Commons) provide standardised rights frameworks. The "Reusable" dimension of FAIR directly aligns with usage control — specifying the conditions under which data may be reused.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Quality standards for data sharing', text: 'FAIR compliance signals data quality and governance maturity to potential data recipients. Findable data (with rich metadata) enables informed decisions about data use. Interoperable data (using shared vocabularies and ontologies) reduces interpretation errors. FAIR principles operationalise trustworthy data management at the institutional level.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Securing FAIR data infrastructure', text: 'FAIR data infrastructure — repositories, APIs, metadata catalogues — must be secured against attack. Persistent identifiers (DOIs, handles) must be protected against hijacking. Access control mechanisms ensure that "Accessible" means accessible to authorised users only. Integrity verification protects FAIR datasets from tampering during storage and retrieval.' }
      ],
      closing: 'FAIR principles provide the data management standards that connect sovereignty (through licences and usage conditions), trust (through quality and interoperability), and cybersecurity (through secure infrastructure).'
    },

    'stakeholder-participation': {
      icon: '🤝',
      title: 'Stakeholder Participation',
      subtitle: 'Institutional Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Meaningful stakeholder participation — particularly farmer representation through cooperatives, advisory bodies, and governance structures — is essential for the legitimacy and effectiveness of agricultural data governance. Without farmer voice, governance frameworks risk reflecting the interests of technology providers and agribusinesses rather than the farmers whose data is at stake.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Participatory governance as a sovereignty mechanism', text: 'Farmer participation in governance design ensures that sovereignty mechanisms reflect actual farmer needs and values. Cooperatives and farmer organisations can negotiate collective data governance agreements that provide stronger protections than individual farmers could achieve alone. Participatory design processes for data spaces ensure that sovereignty tools are usable and effective for their intended beneficiaries.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Legitimacy through representation', text: 'Governance structures that include meaningful farmer representation are perceived as more legitimate and trustworthy. Trust seals and certification systems for data governance practices provide external validation. Voluntary codes of conduct developed with farmer input (e.g., Farm Data Code) have higher adoption rates than top-down regulatory requirements.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Security awareness and incident response', text: 'Farmer participation in cybersecurity governance includes security awareness training, incident reporting mechanisms, and participation in sector-wide threat intelligence sharing. Agricultural cooperatives can provide shared cybersecurity services to resource-constrained small farmers who cannot afford individual security infrastructure. Community-based security governance improves collective resilience.' }
      ],
      closing: 'Stakeholder participation is the social foundation of the governance framework: it ensures sovereignty mechanisms are farmer-centric, builds the trust that enables data sharing, and creates the community structures that support collective cybersecurity.'
    },

    'data-traceability': {
      icon: '🔗',
      title: 'Data Traceability',
      subtitle: 'Technical Layer — Trust & Trustworthiness',
      accentColor: '#16a34a',
      intro: 'Data traceability tracks the full history of agricultural data — from its collection through every transformation, sharing event, and use — creating a verifiable record that supports accountability, quality assurance, and regulatory compliance.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Traceability as accountability infrastructure', text: 'Data traceability systems enable farmers to verify that their sovereignty policies are being respected throughout the data lifecycle. By tracking every access decision and data transformation, traceability creates the accountability infrastructure that makes sovereignty enforcement meaningful rather than merely aspirational. GDPR and the EU Data Act both require traceability mechanisms.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Transparency through verifiable history', text: 'Traceability builds trust by making data history visible and verifiable. Data recipients can assess the quality and provenance of shared data. Data providers can demonstrate compliance with governance standards. Traceability also supports data quality management by enabling the identification and correction of errors introduced at specific points in the processing pipeline.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Tamper-evident provenance records', text: 'Traceability records must be protected against tampering to be trustworthy. Blockchain immutability provides tamper-evident provenance logs. Cryptographic hashing ensures that any modification to traceability records is immediately detectable. Distributed storage of provenance records prevents single points of failure and reduces the risk of coordinated tampering.' }
      ],
      closing: 'Data traceability is the connective tissue of the governance framework: it makes sovereignty verifiable, builds trust through transparency, and relies on cybersecurity to remain tamper-resistant.'
    },

    /* ── CYBERSECURITY NODES ── */
    'encryption': {
      icon: '🔐',
      title: 'Encryption & Anonymisation',
      subtitle: 'Technical Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'Encryption and anonymisation are the primary technical mechanisms for protecting agricultural data privacy. Encryption protects data in transit and at rest, while anonymisation techniques (including differential privacy) allow data to be shared and analysed without revealing individual farmer information.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Technical enforcement of privacy policies', text: 'Encryption is the technical implementation of sovereignty\'s privacy requirements. Differential privacy allows statistical analyses to be shared without revealing individual farmer data, enabling sovereignty-compliant data sharing at scale. Homomorphic encryption enables computation on encrypted data, allowing analysis without decryption — preserving sovereignty even during processing.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Privacy preservation as a trust foundation', text: 'Privacy-preserving techniques demonstrate to farmers that their data is being protected as promised. Anonymisation enables data sharing for research and public benefit purposes without compromising individual privacy, supporting the social licence for agricultural data sharing. Transparency about which anonymisation techniques are used and their privacy guarantees builds informed trust.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Core security primitive', text: 'Encryption is a foundational cybersecurity control. End-to-end encryption protects agricultural data from interception during transmission. At-rest encryption protects stored data from breaches. Key management systems ensure that encryption remains effective over time. Quantum-resistant encryption algorithms are increasingly important for long-term data protection.' }
      ],
      closing: 'Encryption and anonymisation are where sovereignty policy meets cybersecurity implementation: they technically enforce privacy rights, enable trust through privacy preservation, and form the core of the security architecture.'
    },

    'access-control': {
      icon: '🔑',
      title: 'Role-Based Access Control',
      subtitle: 'Technical Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'Role-Based Access Control (RBAC) manages permissions based on predefined roles and privacy policies, ensuring that each actor in the agricultural data ecosystem can only access the data they are authorised to use. RBAC is a foundational mechanism for implementing both sovereignty policies and cybersecurity requirements.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Implementing access rights technically', text: 'RBAC translates sovereignty policies into technical access controls. Farmer-defined permissions are mapped to roles that determine what data each actor can access, modify, or share. Dynamic RBAC systems can adjust permissions based on context — for example, restricting access during sensitive growing periods or expanding access for verified research partners.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Accountability through role-based governance', text: 'RBAC creates clear accountability by linking data access to defined roles with associated responsibilities. Audit logs of role-based access decisions provide transparency about who accessed what data and when. Role certification processes ensure that actors claiming specific roles have the qualifications and accountability structures those roles require.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Minimising attack surface', text: 'RBAC implements the principle of least privilege — each actor has access only to the data they need for their specific role. This limits the damage from compromised credentials and reduces the attack surface. Separation of duties prevents single actors from having sufficient access to manipulate data governance systems undetected.' }
      ],
      closing: 'Role-Based Access Control is the implementation layer where sovereignty policies, trust relationships, and cybersecurity principles converge into operational data governance.'
    },

    'iot-security': {
      icon: '📡',
      title: 'IoT Device Security',
      subtitle: 'Technical Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'Agricultural IoT systems — including precision farming sensors, connected tractors, drone systems, and environmental monitors — generate the data that flows through governance frameworks. The security of these devices is foundational: compromised IoT sensors undermine the integrity of all downstream data governance.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Securing the data collection point', text: 'IoT device security is a prerequisite for meaningful data sovereignty: if sensors can be compromised, the data they generate cannot be trusted, and sovereignty policies built on that data become meaningless. Secure boot, firmware integrity verification, and device authentication ensure that IoT-generated data is genuinely from the claimed source.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Data quality from trusted sources', text: 'Trustworthy data requires trustworthy collection devices. IoT security certification schemes (aligned with NIST NISTIR 8259 and IEEE P2413) provide assurance that devices meet minimum security standards. Farmers and data recipients can make more informed trust decisions when device security credentials are available and verifiable.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Protecting resource-constrained devices', text: 'Agricultural IoT devices are often resource-constrained, deployed in remote locations, and difficult to update — creating significant security challenges. Lightweight cryptographic protocols, secure over-the-air update mechanisms, and network segmentation protect these devices. The Industrial Internet Consortium Security Framework and Cloud Security Alliance IoT Framework provide relevant guidance.' }
      ],
      closing: 'IoT device security is the foundation of the entire governance framework: if the data collection layer is compromised, sovereignty policies, trust mechanisms, and cybersecurity controls at higher layers all become ineffective.'
    },

    'blockchain': {
      icon: '⛓️',
      title: 'Blockchain Immutability',
      subtitle: 'Technical Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'Blockchain technology provides immutable, tamper-evident records of data access decisions, consent events, policy changes, and provenance information. In agricultural data governance, blockchain offers a decentralised trust infrastructure that does not require a central authority.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Immutable policy and consent records', text: 'Blockchain provides tamper-evident records of sovereignty policy decisions and consent events. Smart contracts automate the enforcement of data sharing agreements with predefined conditions. Immutable access logs ensure that policy violations are permanently recorded and cannot be retroactively concealed. Decentralised governance prevents any single actor from controlling the sovereignty infrastructure.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Decentralised trust without central authority', text: 'Blockchain enables trust between parties who do not know each other and have no pre-existing relationship — critical in open agricultural data markets. Immutable audit trails provide the transparency that builds trust over time. Smart contract execution is deterministic and verifiable, removing the need to trust the intentions of individual actors.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Tamper-resistant infrastructure', text: 'Blockchain\'s distributed consensus mechanism makes it highly resistant to tampering: modifying a record requires controlling a majority of the network. This provides strong protection for governance records. However, smart contract vulnerabilities and private key security remain important cybersecurity concerns that must be addressed in agricultural blockchain deployments.' }
      ],
      closing: 'Blockchain is a governance infrastructure technology that simultaneously serves sovereignty (through immutable policy records), trust (through decentralised accountability), and cybersecurity (through tamper-resistant record-keeping).'
    },

    'nist-framework': {
      icon: '📜',
      title: 'NIST IoT Guidelines',
      subtitle: 'Regulatory Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'NIST IoT Cybersecurity Guidelines (NISTIR 8228, NISTIR 8259) provide comprehensive frameworks for managing cybersecurity risks in IoT deployments. For agricultural IoT systems, these guidelines offer practical risk management approaches aligned with international standards.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Security standards as governance requirements', text: 'NIST IoT guidelines provide the technical security standards that give sovereignty policies their teeth. Without adequate security measures, sovereignty policies cannot be technically enforced. Compliance with recognised security frameworks also provides legal defensibility under GDPR and the EU Data Act\'s security requirements.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Standards compliance as trust signal', text: 'Compliance with recognised security standards (NIST, ISO 27001, IEC 62443) signals cybersecurity maturity to farmers and trading partners. Standards certification provides independent verification of security claims, reducing the information asymmetries that undermine trust. Common standards also enable interoperability between security systems from different vendors.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Comprehensive risk management framework', text: 'NISTIR 8228 identifies three IoT cybersecurity risk areas: device security, data security, and individual privacy. NISTIR 8259 provides device cybersecurity capability core baselines. The NIST Cybersecurity Framework (CSF) provides a comprehensive risk management approach covering identify, protect, detect, respond, and recover functions.' }
      ],
      closing: 'NIST IoT guidelines provide the regulatory and technical standards that connect sovereignty requirements, trust signals, and cybersecurity practice into a coherent risk management framework for agricultural IoT.'
    },

    'threat-detection': {
      icon: '🔭',
      title: 'AI Anomaly Detection',
      subtitle: 'Technical Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'AI-driven anomaly detection continuously monitors agricultural data systems for unusual patterns that may indicate security breaches, data quality issues, or policy violations. Machine learning models trained on normal system behaviour can identify threats that rule-based systems miss.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Automated policy violation detection', text: 'Anomaly detection systems can monitor data usage patterns for sovereignty policy violations — for example, detecting when data is being accessed outside permitted time windows or by unauthorised parties. Automated alerts enable rapid response to sovereignty breaches. AI systems can also detect data exfiltration attempts before significant harm occurs.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Proactive quality and security monitoring', text: 'Anomaly detection supports trustworthy data quality by automatically flagging unusual sensor readings that may indicate equipment malfunction or data tampering. Continuous monitoring demonstrates to farmers that their data is actively protected. Explainable anomaly detection systems that can describe why an alert was triggered build farmer confidence in the monitoring system.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Real-time threat intelligence', text: 'AI anomaly detection provides real-time threat intelligence that enables rapid incident response. Behavioural analysis identifies insider threats and compromised credentials that evade signature-based detection. Federated anomaly detection allows threat intelligence to be shared across the agricultural data ecosystem without centralising sensitive operational data.' }
      ],
      closing: 'AI anomaly detection is the active monitoring layer of the governance framework: it enforces sovereignty policies in real-time, maintains the data quality that builds trust, and provides the threat detection capability that keeps the system secure.'
    },

    'integrity': {
      icon: '🛡',
      title: 'Data Integrity & Resilience',
      subtitle: 'Institutional Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'Data integrity ensures that agricultural data remains accurate and unaltered throughout its lifecycle. Resilience ensures that data governance systems continue to function under adverse conditions — including cyberattacks, system failures, and environmental disruptions. Together, they form the reliability foundation of agricultural data governance.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Integrity as a sovereignty guarantee', text: 'Data sovereignty is meaningless if data can be silently altered after leaving the farmer\'s control. Integrity verification mechanisms — cryptographic hashing, digital signatures, and blockchain records — ensure that data has not been modified without authorisation. Resilience mechanisms ensure that sovereignty controls remain operational even during system disruptions.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Reliability as a trust foundation', text: 'System reliability and data integrity are fundamental trust requirements. Farmers will not share data with systems that are unreliable or that cannot guarantee data integrity. Resilience planning — including backup systems, disaster recovery, and business continuity — demonstrates institutional commitment to the long-term trustworthiness of the governance system.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Defence against integrity attacks', text: 'Data integrity attacks — including man-in-the-middle attacks, ransomware, and insider threats — are among the most serious cybersecurity risks for agricultural data systems. Cryptographic integrity verification, immutable backup systems, and network segmentation protect against these threats. Incident response plans ensure rapid recovery when integrity breaches do occur.' }
      ],
      closing: 'Data integrity and resilience are the reliability guarantees that make the entire governance framework trustworthy: they ensure sovereignty controls remain effective, maintain the data quality that builds trust, and form the core of the cybersecurity defence strategy.'
    },

    'federated-learning': {
      icon: '🧠',
      title: 'Federated Learning',
      subtitle: 'Technical Layer — Cybersecurity',
      accentColor: '#7c3aed',
      intro: 'Federated learning enables collaborative AI model training across distributed agricultural datasets without centralising sensitive data. Each participant trains a local model on their own data; only model updates (not raw data) are shared. This architecture provides privacy-preserving collective intelligence for agricultural applications.',
      chain: [
        { pillar: 'sovereignty', color: '#1a6bc7', icon: '🔒', heading: 'Sovereignty: Privacy-preserving collaboration', text: 'Federated learning enables farmers to contribute to collective AI models without surrendering control of their raw data. Sovereignty policies can govern what model updates are shared and with whom. Differential privacy techniques applied to model updates provide mathematical guarantees that individual farm data cannot be reconstructed from shared model parameters.' },
        { pillar: 'trust', color: '#16a34a', icon: '🤝', heading: 'Trust: Collective intelligence without centralisation', text: 'Federated learning addresses a key trust barrier: farmers can benefit from collective intelligence without trusting a central platform with their raw data. The architecture is inherently transparent about what is shared (model updates, not data). Explainable federated learning systems can describe how individual contributions influenced collective model outcomes.' },
        { pillar: 'cyber', color: '#7c3aed', icon: '🛡', heading: 'Cybersecurity: Distributed security architecture', text: 'Federated learning reduces attack surface by eliminating the central data repository that would be a prime target for attackers. However, federated systems face specific threats including model poisoning attacks (where malicious participants corrupt the global model) and gradient inversion attacks (attempting to reconstruct training data from model updates). Robust aggregation algorithms and anomaly detection protect against these threats.' }
      ],
      closing: 'Federated learning is a privacy-by-design architecture that operationalises all three pillars simultaneously: it preserves sovereignty through data localisation, builds trust through transparent collaboration, and reduces cybersecurity risk through distributed design.'
    }
  };

  /* ══════════════════════════════════════════════════════════════════════
     3. GEOMETRY HELPERS
  ══════════════════════════════════════════════════════════════════════ */

  function toRad(deg) { return deg * Math.PI / 180; }

  function polarToXY(cx, cy, r, angleDeg) {
    const a = toRad(angleDeg - 90); // -90 so 0° = top
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  /* ══════════════════════════════════════════════════════════════════════
     4. LAYOUT COMPUTATION
     Assigns x,y to every node. Pillar nodes at PILLAR_R.
     Keyword nodes distributed across inner/mid/outer rings.
  ══════════════════════════════════════════════════════════════════════ */

  const CX = 380, CY = 370; // SVG centre
  const PILLAR_R = 100;     // pillar label ring

  function computeLayout() {
    const layout = {};

    Object.entries(NODES).forEach(([key, pillar]) => {
      const baseAngle = pillar.angle;
      // Pillar node
      const pPos = polarToXY(CX, CY, PILLAR_R, baseAngle);
      layout[key] = { x: pPos.x, y: pPos.y, angle: baseAngle };

      // Keyword nodes
      pillar.keywords.forEach(kw => {
        const sp = SPREAD[kw.spreadIdx];
        const r = RINGS[sp.ring];
        const angle = baseAngle + sp.offset;
        const pos = polarToXY(CX, CY, r, angle);
        layout[kw.id] = { x: pos.x, y: pos.y, angle, pillar: key };
      });
    });

    return layout;
  }

  /* ══════════════════════════════════════════════════════════════════════
     5. SVG BUILDER
  ══════════════════════════════════════════════════════════════════════ */

  const SVG_W = 760, SVG_H = 740;

  function makeSVG(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  function wrapText(text, maxLen) {
    return text.split('\n').map(line => {
      if (line.length <= maxLen) return [line];
      const words = line.split(' ');
      const lines = [];
      let cur = '';
      words.forEach(w => {
        if ((cur + ' ' + w).trim().length > maxLen) { lines.push(cur.trim()); cur = w; }
        else cur = (cur + ' ' + w).trim();
      });
      if (cur) lines.push(cur);
      return lines;
    }).flat();
  }

  function buildTextLines(svg, x, y, lines, fontSize, fill, fontWeight) {
    const lineH = fontSize * 1.35;
    const totalH = (lines.length - 1) * lineH;
    lines.forEach((line, i) => {
      const t = makeSVG('text', {
        x, y: y - totalH / 2 + i * lineH,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        fill, 'font-size': fontSize,
        'font-weight': fontWeight || 'normal',
        'font-family': 'Inter, system-ui, sans-serif',
        'pointer-events': 'none'
      });
      t.textContent = line;
      svg.appendChild(t);
    });
  }

  /* ══════════════════════════════════════════════════════════════════════
     6. MAIN BUILD FUNCTION
  ══════════════════════════════════════════════════════════════════════ */

  function build() {
    const host = document.getElementById('framework-widget');
    if (!host) return;

    injectStyles();

    const layout = computeLayout();

    /* ── Outer wrapper ── */
    const wrap = document.createElement('div');
    wrap.className = 'fw-wrap';
    host.appendChild(wrap);

    /* ── Legend ── */
    const legend = document.createElement('div');
    legend.className = 'fw-legend';
    legend.innerHTML = `
      <span class="fw-legend-title">Governance Layers:</span>
      <span class="fw-legend-dot" style="background:#0ea5e9"></span><span class="fw-legend-lbl">Technical</span>
      <span class="fw-legend-dot" style="background:#f59e0b"></span><span class="fw-legend-lbl">Regulatory</span>
      <span class="fw-legend-dot" style="background:#10b981"></span><span class="fw-legend-lbl">Social</span>
      <span class="fw-legend-dot" style="background:#8b5cf6"></span><span class="fw-legend-lbl">Institutional</span>
    `;
    wrap.appendChild(legend);

    /* ── Canvas row ── */
    const row = document.createElement('div');
    row.className = 'fw-row';
    wrap.appendChild(row);

    /* ── SVG ── */
    const svg = makeSVG('svg', {
      viewBox: `0 0 ${SVG_W} ${SVG_H}`,
      class: 'fw-svg',
      role: 'img',
      'aria-label': 'Interactive Data Governance Framework'
    });
    row.appendChild(svg);

    /* ── Defs: gradients & filters ── */
    const defs = makeSVG('defs', {});

    // Radial gradient for aim
    const aimGrad = makeSVG('radialGradient', { id: 'fw-aim-grad', cx: '50%', cy: '50%', r: '50%' });
    [['0%', '#fff7ed'], ['100%', '#ffedd5']].forEach(([offset, color]) => {
      const stop = makeSVG('stop', { offset, 'stop-color': color });
      aimGrad.appendChild(stop);
    });
    defs.appendChild(aimGrad);

    // Drop shadow filter
    const filter = makeSVG('filter', { id: 'fw-shadow', x: '-20%', y: '-20%', width: '140%', height: '140%' });
    const feBlur = makeSVG('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: '3' });
    const feOffset = makeSVG('feOffset', { dx: '0', dy: '2', result: 'offsetblur' });
    const feFlood = makeSVG('feFlood', { 'flood-color': 'rgba(0,0,0,0.18)', result: 'color' });
    const feComp = makeSVG('feComposite', { in: 'color', in2: 'offsetblur', operator: 'in', result: 'shadow' });
    const feMerge = makeSVG('feMerge', {});
    const feMerge1 = makeSVG('feMergeNode', { in: 'shadow' });
    const feMerge2 = makeSVG('feMergeNode', { in: 'SourceGraphic' });
    feMerge.appendChild(feMerge1); feMerge.appendChild(feMerge2);
    [feBlur, feOffset, feFlood, feComp, feMerge].forEach(el => filter.appendChild(el));
    defs.appendChild(filter);

    svg.appendChild(defs);

    /* ── Background ring guides (subtle) ── */
    [RINGS.inner, RINGS.mid, RINGS.outer].forEach(r => {
      const ring = makeSVG('circle', {
        cx: CX, cy: CY, r,
        fill: 'none',
        stroke: '#e2e8f0',
        'stroke-width': '1',
        'stroke-dasharray': '4 6',
        opacity: '0.5'
      });
      svg.appendChild(ring);
    });

    /* ── Sector arcs (coloured background wedges) ── */
    const SECTOR_SPREAD = 58; // degrees each side
    Object.entries(NODES).forEach(([key, pillar]) => {
      const col = PILLAR_COLORS[key];
      const startAngle = pillar.angle - SECTOR_SPREAD;
      const endAngle = pillar.angle + SECTOR_SPREAD;
      const r = RINGS.outer + 28;

      function arcPoint(angleDeg) {
        const a = toRad(angleDeg - 90);
        return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`;
      }

      const sa = toRad(startAngle - 90);
      const ea = toRad(endAngle - 90);
      const x1 = CX + r * Math.cos(sa), y1 = CY + r * Math.sin(sa);
      const x2 = CX + r * Math.cos(ea), y2 = CY + r * Math.sin(ea);

      const path = makeSVG('path', {
        d: `M ${CX},${CY} L ${x1},${y1} A ${r},${r} 0 0,1 ${x2},${y2} Z`,
        fill: col.light,
        opacity: '0.35',
        class: `fw-sector fw-sector-${key}`
      });
      svg.appendChild(path);
    });

    /* ── Spokes from centre to pillar nodes ── */
    Object.entries(NODES).forEach(([key, pillar]) => {
      const col = PILLAR_COLORS[key];
      const pPos = layout[key];
      const line = makeSVG('line', {
        x1: CX, y1: CY,
        x2: pPos.x, y2: pPos.y,
        stroke: col.main,
        'stroke-width': '2',
        'stroke-dasharray': '5 4',
        opacity: '0.5',
        class: `fw-spoke fw-spoke-${key}`
      });
      svg.insertBefore(line, svg.firstChild.nextSibling);
    });

    /* ── Spokes from pillar to keyword nodes ── */
    Object.entries(NODES).forEach(([key, pillar]) => {
      const col = PILLAR_COLORS[key];
      const pPos = layout[key];
      pillar.keywords.forEach(kw => {
        const kPos = layout[kw.id];
        const line = makeSVG('line', {
          x1: pPos.x, y1: pPos.y,
          x2: kPos.x, y2: kPos.y,
          stroke: col.main,
          'stroke-width': '1.2',
          opacity: '0.3',
          class: `fw-kw-spoke fw-kw-spoke-${key}`
        });
        svg.appendChild(line);
      });
    });

    /* ── Bridge arcs between pillar nodes ── */
    const pillarKeys = Object.keys(NODES);
    for (let i = 0; i < pillarKeys.length; i++) {
      for (let j = i + 1; j < pillarKeys.length; j++) {
        const a = layout[pillarKeys[i]];
        const b = layout[pillarKeys[j]];
        const mx = (a.x + b.x) / 2 + (CY - (a.y + b.y) / 2) * 0.12;
        const my = (a.y + b.y) / 2 - (CX - (a.x + b.x) / 2) * 0.12;
        const arc = makeSVG('path', {
          d: `M ${a.x},${a.y} Q ${mx},${my} ${b.x},${b.y}`,
          fill: 'none',
          stroke: '#94a3b8',
          'stroke-width': '1.5',
          'stroke-dasharray': '6 5',
          opacity: '0.45',
          class: 'fw-bridge'
        });
        svg.appendChild(arc);
      }
    }

    /* ── KEYWORD NODES ── */
    const LAYER_COLORS = {
      technical: '#0ea5e9',
      regulatory: '#f59e0b',
      social: '#10b981',
      institutional: '#8b5cf6'
    };

    const KW_R_NODE = 26; // keyword node radius

    const kwGroups = {};

    Object.entries(NODES).forEach(([key, pillar]) => {
      const col = PILLAR_COLORS[key];
      pillar.keywords.forEach(kw => {
        const pos = layout[kw.id];
        const layerColor = LAYER_COLORS[kw.layer];

        const g = makeSVG('g', {
          class: `fw-kw-g fw-kw-g-${key}`,
          'data-id': kw.id,
          style: 'cursor:pointer'
        });

        // Outer ring (layer colour)
        const outerCircle = makeSVG('circle', {
          cx: pos.x, cy: pos.y, r: KW_R_NODE + 3,
          fill: layerColor,
          opacity: '0.25'
        });

        // Main circle
        const circle = makeSVG('circle', {
          cx: pos.x, cy: pos.y, r: KW_R_NODE,
          fill: '#fff',
          stroke: col.main,
          'stroke-width': '2',
          filter: 'url(#fw-shadow)',
          class: 'fw-kw-circle'
        });

        // Layer dot (top-right)
        const dotAngle = toRad(-45);
        const dotX = pos.x + (KW_R_NODE) * Math.cos(dotAngle);
        const dotY = pos.y + (KW_R_NODE) * Math.sin(dotAngle);
        const dot = makeSVG('circle', {
          cx: dotX, cy: dotY, r: 5,
          fill: layerColor,
          stroke: '#fff',
          'stroke-width': '1.5'
        });

        // Icon
        const iconText = makeSVG('text', {
          x: pos.x, y: pos.y - 6,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'font-size': '14',
          'pointer-events': 'none'
        });
        iconText.textContent = kw.icon;

        // Label
        const labelLines = wrapText(kw.label, 10);
        const labelG = makeSVG('g', { 'pointer-events': 'none' });
        const lineH = 9.5;
        const totalH = (labelLines.length - 1) * lineH;
        labelLines.forEach((line, i) => {
          const lt = makeSVG('text', {
            x: pos.x,
            y: pos.y + 8 - totalH / 2 + i * lineH,
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            fill: col.dark,
            'font-size': '8.5',
            'font-weight': '600',
            'font-family': 'Inter, system-ui, sans-serif',
            'pointer-events': 'none'
          });
          lt.textContent = line;
          labelG.appendChild(lt);
        });

        [outerCircle, circle, dot, iconText, labelG].forEach(el => g.appendChild(el));
        svg.appendChild(g);
        kwGroups[kw.id] = g;

        g.addEventListener('click', (e) => { e.stopPropagation(); openPanel(kw.id, key); });
        g.addEventListener('mouseenter', () => hoverNode(kw.id));
        g.addEventListener('mouseleave', () => clearHover());
      });
    });

    /* ── PILLAR NODES ── */
    const PILLAR_R_NODE = 42;
    const pillarGroups = {};

    Object.entries(NODES).forEach(([key, pillar]) => {
      const col = PILLAR_COLORS[key];
      const pos = layout[key];

      const g = makeSVG('g', {
        class: `fw-pillar-g fw-pillar-g-${key}`,
        'data-id': key,
        style: 'cursor:pointer'
      });

      // Outer glow
      const glow = makeSVG('circle', {
        cx: pos.x, cy: pos.y, r: PILLAR_R_NODE + 8,
        fill: col.light,
        opacity: '0.6'
      });

      // Main circle
      const circle = makeSVG('circle', {
        cx: pos.x, cy: pos.y, r: PILLAR_R_NODE,
        fill: col.main,
        filter: 'url(#fw-shadow)'
      });

      // Label
      const lines = wrapText(pillar.label, 11);
      const lineH2 = 13;
      const totalH2 = (lines.length - 1) * lineH2;
      lines.forEach((line, i) => {
        const t = makeSVG('text', {
          x: pos.x,
          y: pos.y - totalH2 / 2 + i * lineH2,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          fill: '#fff',
          'font-size': '11',
          'font-weight': '700',
          'font-family': 'Inter, system-ui, sans-serif',
          'pointer-events': 'none'
        });
        t.textContent = line;
        g.appendChild(t);
      });

      [glow, circle].forEach(el => g.insertBefore(el, g.firstChild));
      // Re-append text on top
      const texts = Array.from(g.querySelectorAll('text'));
      texts.forEach(t => g.appendChild(t));

      svg.appendChild(g);
      pillarGroups[key] = g;

      g.addEventListener('click', (e) => { e.stopPropagation(); openPanel(key, key); });
      g.addEventListener('mouseenter', () => hoverPillar(key));
      g.addEventListener('mouseleave', () => clearHover());
    });

    /* ── AIM NODE (centre) ── */
    const AIM_R = 58;
    const aimG = makeSVG('g', { class: 'fw-aim-g', style: 'cursor:pointer' });

    const aimGlow = makeSVG('circle', {
      cx: CX, cy: CY, r: AIM_R + 12,
      fill: '#fed7aa', opacity: '0.4'
    });
    const aimCircle = makeSVG('circle', {
      cx: CX, cy: CY, r: AIM_R,
      fill: 'url(#fw-aim-grad)',
      stroke: '#f97316',
      'stroke-width': '2.5',
      filter: 'url(#fw-shadow)'
    });

    const aimIcon = makeSVG('text', {
      x: CX, y: CY - 18,
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-size': '20', 'pointer-events': 'none'
    });
    aimIcon.textContent = '🌾';

    const aimLines = ['Data', 'Governance', 'Practices'];
    aimLines.forEach((line, i) => {
      const t = makeSVG('text', {
        x: CX, y: CY + 2 + (i - 1) * 13,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#9a3412', 'font-size': '10', 'font-weight': '700',
        'font-family': 'Inter, system-ui, sans-serif',
        'pointer-events': 'none'
      });
      t.textContent = line;
      aimG.appendChild(t);
    });

    [aimGlow, aimCircle, aimIcon].forEach(el => aimG.insertBefore(el, aimG.firstChild));
    const aimTexts = Array.from(aimG.querySelectorAll('text'));
    aimTexts.forEach(t => aimG.appendChild(t));

    svg.appendChild(aimG);

    aimG.addEventListener('click', (e) => { e.stopPropagation(); openPanel('aim', null); });
    aimG.addEventListener('mouseenter', () => {
      aimCircle.setAttribute('stroke', '#ea580c');
      aimCircle.setAttribute('stroke-width', '3.5');
    });
    aimG.addEventListener('mouseleave', () => {
      aimCircle.setAttribute('stroke', '#f97316');
      aimCircle.setAttribute('stroke-width', '2.5');
    });

    /* ── PANEL ── */
    const panel = document.createElement('div');
    panel.className = 'fw-panel';
    row.appendChild(panel);

    /* ══════════════════════════════════════════════════════════════════
       7. INTERACTION LOGIC
    ══════════════════════════════════════════════════════════════════ */

    let activeId = null;

    function getAllKwGroups() { return Object.values(kwGroups); }
    function getAllPillarGroups() { return Object.values(pillarGroups); }

    function hoverNode(id) {
      const pillarKey = layout[id] ? layout[id].pillar : null;
      getAllKwGroups().forEach(g => {
        g.style.opacity = (g.getAttribute('data-id') === id || g.className.baseVal.includes(`fw-kw-g-${pillarKey}`)) ? '1' : '0.3';
      });
    }

    function hoverPillar(key) {
      getAllKwGroups().forEach(g => {
        g.style.opacity = g.className.baseVal.includes(`fw-kw-g-${key}`) ? '1' : '0.3';
      });
      getAllPillarGroups().forEach(g => {
        g.style.opacity = g.getAttribute('data-id') === key ? '1' : '0.5';
      });
    }

    function clearHover() {
      if (activeId) return;
      getAllKwGroups().forEach(g => g.style.opacity = '1');
      getAllPillarGroups().forEach(g => g.style.opacity = '1');
    }

    function openPanel(id, pillarKey) {
      activeId = id;
      const data = NARRATIVES[id];
      if (!data) return;

      // Dim non-related nodes
      getAllKwGroups().forEach(g => {
        if (pillarKey) {
          g.style.opacity = g.className.baseVal.includes(`fw-kw-g-${pillarKey}`) ? '1' : '0.25';
        } else {
          g.style.opacity = '0.6';
        }
      });
      getAllPillarGroups().forEach(g => {
        g.style.opacity = pillarKey && g.getAttribute('data-id') !== pillarKey ? '0.4' : '1';
      });

      const accentColor = data.accentColor;

      const chainHTML = data.chain.map((step, idx) => {
        const col = PILLAR_COLORS[step.pillar];
        const isLast = idx === data.chain.length - 1;
        return `
          <div class="fw-chain-step">
            <div class="fw-chain-pill" style="background:${col.main}">
              <span class="fw-chain-icon">${step.icon}</span>
              <span class="fw-chain-pillar-name">${step.pillar.charAt(0).toUpperCase() + step.pillar.slice(1)}</span>
            </div>
            <div class="fw-chain-content" style="--step-color:${col.main}">
              <div class="fw-chain-heading">${step.heading}</div>
              <div class="fw-chain-text">${step.text}</div>
            </div>
            ${!isLast ? '<div class="fw-chain-connector"><svg width="16" height="20" viewBox="0 0 16 20"><path d="M8 0 L8 14 M4 10 L8 16 L12 10" stroke="#94a3b8" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>' : ''}
          </div>
        `;
      }).join('');

      panel.innerHTML = `
        <div class="fw-panel-inner">
          <button class="fw-panel-close" aria-label="Close panel">✕</button>
          <div class="fw-panel-head">
            <div class="fw-panel-icon">${data.icon}</div>
            <div>
              <div class="fw-panel-title" style="color:${accentColor}">${data.title}</div>
              <div class="fw-panel-subtitle">${data.subtitle}</div>
            </div>
          </div>
          <div class="fw-panel-intro">${data.intro}</div>
          <div class="fw-chain-label">How all three pillars connect ↓</div>
          <div class="fw-chain">${chainHTML}</div>
          <div class="fw-panel-closing">
            <span class="fw-closing-icon">💡</span>
            <span>${data.closing}</span>
          </div>
          <a href="#pillar-sovereignty" class="fw-panel-cta" style="background:${accentColor}">Explore the Pillars →</a>
        </div>
      `;

      panel.classList.add('fw-panel-open');
      panel.querySelector('.fw-panel-close').addEventListener('click', closePanel);
    }

    function closePanel() {
      activeId = null;
      panel.classList.remove('fw-panel-open');
      getAllKwGroups().forEach(g => g.style.opacity = '1');
      getAllPillarGroups().forEach(g => g.style.opacity = '1');
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !e.target.closest('.fw-kw-g') && !e.target.closest('.fw-pillar-g') && !e.target.closest('.fw-aim-g')) {
        closePanel();
      }
    });

    // ESC key
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

    /* ══════════════════════════════════════════════════════════════════
       8. ENTRANCE ANIMATION
    ══════════════════════════════════════════════════════════════════ */

    svg.style.opacity = '0';
    svg.style.transform = 'scale(0.95)';
    svg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      svg.style.opacity = '1';
      svg.style.transform = 'scale(1)';
    }, 300);
  }

  /* ══════════════════════════════════════════════════════════════════════
     9. STYLES
  ══════════════════════════════════════════════════════════════════════ */

  function injectStyles() {
    if (document.getElementById('fw-styles')) return;
    const s = document.createElement('style');
    s.id = 'fw-styles';
    s.textContent = `
      .fw-wrap {
        font-family: Inter, system-ui, sans-serif;
        max-width: 1100px;
        margin: 0 auto;
        padding: 1rem 0.5rem 2rem;
      }

      .fw-legend {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
        margin-bottom: 0.9rem;
        padding: 0.55rem 1rem;
        background: #f8fafc;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        font-size: 0.79rem;
      }
      .fw-legend-title {
        font-weight: 700;
        color: #475569;
        margin-right: 0.3rem;
      }
      .fw-legend-dot {
        display: inline-block;
        width: 10px; height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .fw-legend-lbl {
        color: #64748b;
        margin-right: 0.5rem;
      }

      .fw-row {
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        flex-wrap: wrap;
      }

      .fw-svg {
        flex: 1 1 520px;
        min-width: 320px;
        max-width: 760px;
        height: auto;
        display: block;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        border: 1px solid #e2e8f0;
      }

      .fw-kw-g, .fw-pillar-g, .fw-aim-g {
        transition: opacity 0.2s ease;
      }

      .fw-kw-g:hover .fw-kw-circle {
        stroke-width: 3;
        filter: url(#fw-shadow) brightness(1.05);
      }

      /* Panel */
      .fw-panel {
        flex: 0 0 290px;
        width: 290px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        border: 1px solid #e2e8f0;
        opacity: 0;
        transform: translateX(16px) scale(0.97);
        pointer-events: none;
        transition: opacity 0.28s ease, transform 0.28s ease;
        position: sticky;
        top: 80px;
        max-height: 82vh;
        overflow: hidden;
      }
      .fw-panel.fw-panel-open {
        opacity: 1;
        transform: translateX(0) scale(1);
        pointer-events: all;
      }

      .fw-panel-inner {
        padding: 1.3rem 1.1rem 1.4rem;
        overflow-y: auto;
        max-height: 82vh;
        position: relative;
      }

      .fw-panel-close {
        position: absolute;
        top: 0.7rem; right: 0.7rem;
        background: #f1f5f9;
        border: none;
        border-radius: 50%;
        width: 26px; height: 26px;
        font-size: 0.68rem;
        cursor: pointer;
        color: #64748b;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }
      .fw-panel-close:hover { background: #e2e8f0; }

      .fw-panel-head {
        display: flex;
        align-items: flex-start;
        gap: 0.65rem;
        margin-bottom: 0.8rem;
        padding-right: 2rem;
      }
      .fw-panel-icon { font-size: 1.75rem; flex-shrink: 0; line-height: 1; margin-top: 0.05rem; }
      .fw-panel-title { font-size: 0.95rem; font-weight: 700; line-height: 1.25; margin: 0 0 0.18rem; }
      .fw-panel-subtitle { font-size: 0.71rem; color: #94a3b8; font-style: italic; }

      .fw-panel-intro {
        font-size: 0.79rem;
        color: #374151;
        line-height: 1.58;
        margin: 0 0 0.9rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #f1f5f9;
      }

      .fw-chain-label {
        font-size: 0.69rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #94a3b8;
        margin-bottom: 0.65rem;
      }

      .fw-chain {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin-bottom: 0.9rem;
      }

      .fw-chain-step { position: relative; }

      .fw-chain-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.22rem 0.6rem 0.22rem 0.45rem;
        border-radius: 999px;
        margin-bottom: 0.38rem;
      }
      .fw-chain-icon { font-size: 0.85rem; }
      .fw-chain-pillar-name { font-size: 0.7rem; font-weight: 700; color: #fff; }

      .fw-chain-content { margin-bottom: 0.5rem; }
      .fw-chain-heading {
        font-size: 0.78rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.25rem;
        line-height: 1.3;
        border-left: 3px solid var(--step-color);
        padding-left: 0.5rem;
      }
      .fw-chain-text {
        font-size: 0.75rem;
        color: #475569;
        line-height: 1.58;
        padding-left: 0.5rem;
      }

      .fw-chain-connector {
        display: flex;
        justify-content: center;
        margin: 0.05rem 0 0.4rem;
        opacity: 0.45;
      }

      .fw-panel-closing {
        background: #f8fafc;
        border-radius: 10px;
        padding: 0.65rem 0.8rem;
        font-size: 0.75rem;
        color: #374151;
        line-height: 1.58;
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        margin-bottom: 0.9rem;
      }
      .fw-closing-icon { font-size: 0.95rem; flex-shrink: 0; margin-top: 0.05rem; }

      .fw-panel-cta {
        display: inline-block;
        padding: 0.45rem 1rem;
        border-radius: 8px;
        color: #fff !important;
        font-size: 0.78rem;
        font-weight: 600;
        text-decoration: none;
        transition: opacity 0.2s;
      }
      .fw-panel-cta:hover { opacity: 0.85; }

      /* Responsive */
      @media (max-width: 700px) {
        .fw-panel {
          position: relative;
          top: auto;
          flex: 1 1 100%;
          width: 100%;
          max-height: none;
          transform: none;
          opacity: 0;
          pointer-events: none;
        }
        .fw-panel.fw-panel-open {
          opacity: 1;
          pointer-events: all;
        }
        .fw-row { flex-direction: column; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════════════════════
     10. BOOT
  ══════════════════════════════════════════════════════════════════════ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

})();
