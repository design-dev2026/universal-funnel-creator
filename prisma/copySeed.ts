import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const copyTemplates = [
  {
    type: 'ad',
    productType: 'physical',
    awarenessStage: 'unaware',
    content: 'Are you tired of dealing with [problem]? Meet {{productName}}. The revolutionary new way to solve it forever.',
  },
  {
    type: 'landing_page',
    productType: 'physical',
    awarenessStage: 'problem-aware',
    content: '{{headline}}\n\nYou know how frustrating it is when [problem]. We created {{productName}} to fix exactly that. Get yours today with our exclusive offer.',
  },
  {
    type: 'email',
    productType: 'physical',
    awarenessStage: 'solution-aware',
    content: 'Subject: Why {{productName}} is better than the rest.\n\nYou have options, but here is why {{productName}} stands out: [benefits list]. Click here to claim your discount.',
  },
  {
    type: 'ad',
    productType: 'physical',
    awarenessStage: 'product-aware',
    content: 'Get 20% off {{productName}} today! See what our 10,000+ happy customers are saying.',
  },
  {
    type: 'checkout',
    productType: 'physical',
    awarenessStage: 'most-aware',
    content: 'Almost done! Complete your order for {{productName}} now before our stock runs out.',
  },
  {
    type: 'ad',
    productType: 'digital',
    awarenessStage: 'unaware',
    content: 'Stop wasting time on [problem]. Discover the secret framework used by top professionals. {{productName}} reveals it all.',
  },
  {
    type: 'landing_page',
    productType: 'digital',
    awarenessStage: 'problem-aware',
    content: '{{headline}}\n\nStruggling to achieve [goal]? In {{productName}}, you will learn exactly how to get there step-by-step. Download now.',
  },
  {
    type: 'email',
    productType: 'digital',
    awarenessStage: 'solution-aware',
    content: 'Subject: The ultimate guide you need.\n\nReady to master [skill]? {{productName}} gives you the exact templates and tools. Start today.',
  },
  {
    type: 'ad',
    productType: 'digital',
    awarenessStage: 'product-aware',
    content: 'Enroll in {{productName}} today and get our bonus course for free. Limited time offer.',
  },
  {
    type: 'checkout',
    productType: 'digital',
    awarenessStage: 'most-aware',
    content: 'Join {{productName}} and get instant access to all materials. Secure checkout.',
  },
  {
    type: 'ad',
    productType: 'service',
    awarenessStage: 'unaware',
    content: 'Is your business losing money because of [problem]? Learn how our expert team can help.',
  },
  {
    type: 'landing_page',
    productType: 'service',
    awarenessStage: 'problem-aware',
    content: '{{headline}}\n\nDon\'t let [problem] hold you back. Let {{productName}} handle it for you with our proven system.',
  },
  {
    type: 'email',
    productType: 'service',
    awarenessStage: 'solution-aware',
    content: 'Subject: How we helped [Client] achieve [result]\n\nWondering if {{productName}} is right for you? Read our latest case study and book a call.',
  },
  {
    type: 'ad',
    productType: 'service',
    awarenessStage: 'product-aware',
    content: 'Book your free strategy session for {{productName}} today and see exactly how we can scale your business.',
  },
  {
    type: 'checkout',
    productType: 'service',
    awarenessStage: 'most-aware',
    content: 'Secure your spot for {{productName}} now. Only a few spots left this month.',
  },
  {
    type: 'ad',
    productType: 'software',
    awarenessStage: 'unaware',
    content: 'Still doing [task] manually? There is a better way. Try {{productName}}.',
  },
  {
    type: 'landing_page',
    productType: 'software',
    awarenessStage: 'problem-aware',
    content: '{{headline}}\n\nAutomate your workflow with {{productName}}. Start your 14-day free trial today.',
  },
  {
    type: 'email',
    productType: 'software',
    awarenessStage: 'solution-aware',
    content: 'Subject: See {{productName}} in action.\n\nJoin our live demo to see how {{productName}} can save you 10 hours a week.',
  },
  {
    type: 'ad',
    productType: 'software',
    awarenessStage: 'product-aware',
    content: 'Upgrade to {{productName}} Pro and unlock premium features. Sign up today.',
  },
  {
    type: 'checkout',
    productType: 'software',
    awarenessStage: 'most-aware',
    content: 'Complete your registration for {{productName}}. Choose your plan below.',
  }
];

async function main() {
  console.log('Seeding copy templates...');
  
  for (const template of copyTemplates) {
    // using create instead of upsert since no unique constraint exists
    await prisma.copyTemplate.create({
      data: template
    });
  }
  
  console.log(`Seeded ${copyTemplates.length} copy templates.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
