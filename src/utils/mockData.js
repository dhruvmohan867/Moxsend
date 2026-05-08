/**
 * Mock data generator for Moxsend email generation.
 * Simulates an AI backend by producing realistic email variations.
 */

const emailTemplates = [
  {
    subject: "Quick question about {{company}}'s growth strategy",
    body: `Hi {{firstName}},

I noticed {{company}} has been making impressive strides in the {{industry}} space — especially the recent expansion into new markets. That kind of momentum doesn't happen by accident.

I'm reaching out because we help companies like yours streamline their outreach and close deals 40% faster with AI-powered personalization. I thought it might be relevant given where you're headed.

Would you be open to a quick 15-minute call this week to see if it's a fit?

Best,
{{senderName}}`,
    personalizedLine: "I saw your recent LinkedIn post about scaling teams — it resonated with our mission.",
  },
  {
    subject: "{{firstName}}, a smarter way to handle outreach",
    body: `Hey {{firstName}},

I've been following {{company}} for a while now, and I'm genuinely impressed by how you've positioned yourselves in the {{industry}} market.

Here's why I'm reaching out: most sales teams spend 60% of their time writing emails that never get replies. We've built a tool that generates hyper-personalized cold emails in seconds — and our users see a 3x increase in response rates.

I'd love to show you a quick demo. Would Tuesday or Thursday work for a 10-minute walkthrough?

Cheers,
{{senderName}}`,
    personalizedLine: "Congrats on the Series B — that's a huge milestone for {{company}}.",
  },
  {
    subject: "Idea for {{company}}'s sales pipeline",
    body: `Hi {{firstName}},

I know your inbox is probably packed, so I'll keep this short.

We help {{industry}} companies turn cold outreach into warm conversations. Our AI personalizes every email based on the prospect's public profile, company news, and recent activity — no templates, no spam feel.

One of our clients in a similar space saw a 52% open rate and 18% reply rate within the first month.

Worth a quick chat? I promise to keep it under 10 minutes.

Best regards,
{{senderName}}`,
    personalizedLine: "I noticed {{company}} just launched a new product line — exciting times!",
  },
];

const improvedVersions = [
  {
    subject: "{{firstName}}, saw {{company}}'s news — had an idea",
    body: `Hi {{firstName}},

I just read about {{company}}'s recent momentum in {{industry}} — really impressive trajectory.

I had a quick thought: what if your team could generate personalized outreach for every prospect in your pipeline, automatically? No more copy-paste templates.

We're helping companies like {{company}} achieve:
• 3.2x higher reply rates
• 60% less time on email drafting
• Consistent brand voice across all reps

I put together a 2-minute personalized demo for {{company}} — want me to send it over?

{{senderName}}`,
    personalizedLine: "Your talk at the {{industry}} Summit was spot-on — especially the point about authentic outreach.",
  },
  {
    subject: "Re: {{company}}'s outreach approach",
    body: `{{firstName}},

Straight to the point — I think there's a gap in how {{company}} might be handling cold outreach, and I have a specific idea to fix it.

Most {{industry}} teams we talk to face the same challenge: writing emails that feel personal at scale. Here's what changed for our clients:

Before: 2 hours/day writing emails → 5% reply rate
After: 10 minutes/day reviewing AI drafts → 17% reply rate

The difference? Context-aware personalization that actually references what matters to each prospect.

Can I show you exactly how this would work for {{company}} in 8 minutes?

— {{senderName}}`,
    personalizedLine: "Saw that {{company}} is hiring 3 new SDRs — this might help them ramp faster.",
  },
];

function fillTemplate(template, context) {
  let result = template;
  Object.keys(context).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, context[key]);
  });
  return result;
}

export function generateEmails(productDescription) {
  const context = {
    firstName: "Alex",
    company: "TechCorp",
    industry: productDescription.toLowerCase().includes("saas")
      ? "SaaS"
      : productDescription.toLowerCase().includes("health")
      ? "HealthTech"
      : productDescription.toLowerCase().includes("finance")
      ? "FinTech"
      : "Technology",
    senderName: "Jordan",
  };

  return emailTemplates.map((template, index) => ({
    id: `email-${Date.now()}-${index}`,
    subject: fillTemplate(template.subject, context),
    body: fillTemplate(template.body, context),
    personalizedLine: fillTemplate(template.personalizedLine, context),
    variationLabel: `Variation ${index + 1}`,
    tone:
      index === 0
        ? "Professional"
        : index === 1
        ? "Conversational"
        : "Direct",
  }));
}

export function improveEmail(originalEmail) {
  const context = {
    firstName: "Alex",
    company: "TechCorp",
    industry: "Technology",
    senderName: "Jordan",
  };

  const improved =
    improvedVersions[Math.floor(Math.random() * improvedVersions.length)];

  return {
    id: `improved-${Date.now()}`,
    subject: fillTemplate(improved.subject, context),
    body: fillTemplate(improved.body, context),
    personalizedLine: fillTemplate(improved.personalizedLine, context),
    variationLabel: "Improved Version",
    tone: "Optimized",
  };
}

export function parseCSV(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    rows.push(row);
  }

  return rows;
}

export function generateEmailsForCSV(contacts, productDescription) {
  return contacts.map((contact, idx) => {
    const template =
      emailTemplates[Math.floor(Math.random() * emailTemplates.length)];
    const context = {
      firstName: contact.name || contact.firstname || contact["first name"] || "there",
      company: contact.company || contact.organization || "your company",
      industry: productDescription.toLowerCase().includes("saas")
        ? "SaaS"
        : "Technology",
      senderName: "Jordan",
    };

    return {
      id: `csv-email-${Date.now()}-${idx}`,
      contact,
      subject: fillTemplate(template.subject, context),
      body: fillTemplate(template.body, context),
      personalizedLine: fillTemplate(template.personalizedLine, context),
    };
  });
}

// Sample CSV for download
export const sampleCSV = `name,email,company,role
Alex Chen,alex@techcorp.com,TechCorp,VP Sales
Sarah Kim,sarah@innovate.io,Innovate Inc,Head of Growth
Marcus Johnson,marcus@scalable.ai,Scalable AI,CTO
Priya Patel,priya@nexgen.com,NexGen Solutions,Director of Marketing
David Lee,david@cloudbase.io,CloudBase,COO`;
