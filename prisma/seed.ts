import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const awarenessProfiles = [
  {
    key: "unaware",
    label: "Unaware",
    blueprintStage: "education_quiz",
    copyStage: "interrupt_educate",
    objective: "traffic",
    offerStrategy: "quiz_or_educational_hook",
    messagingAngle: "pattern interrupt with a pain-led education angle",
    callToAction: "Learn More",
    priority: 30,
  },
  {
    key: "problem-aware",
    label: "Problem Aware",
    blueprintStage: "pain_lead_magnet",
    copyStage: "pain_agitate_solve",
    objective: "lead_generation",
    offerStrategy: "lead_magnet_or_buyers_guide",
    messagingAngle: "name the problem clearly and promise a practical first step",
    callToAction: "Get the Guide",
    priority: 45,
  },
  {
    key: "solution-aware",
    label: "Solution Aware",
    blueprintStage: "comparison_vsl",
    copyStage: "solution_contrast",
    objective: "consideration",
    offerStrategy: "comparison_content_or_vsl",
    messagingAngle: "contrast solution categories and remove buying friction",
    callToAction: "See How It Works",
    priority: 60,
  },
  {
    key: "product-aware",
    label: "Product Aware",
    blueprintStage: "demo_case_study",
    copyStage: "proof_mechanism_offer",
    objective: "conversion",
    offerStrategy: "demo_or_case_study",
    messagingAngle: "show mechanism, proof, and a direct path to purchase",
    callToAction: "Start Now",
    priority: 75,
  },
  {
    key: "most-aware",
    label: "Most Aware",
    blueprintStage: "retarget_offer_close",
    copyStage: "urgency_close",
    objective: "purchase",
    offerStrategy: "retargeting_offer_or_consult",
    messagingAngle: "push decision with urgency, proof, and a tight CTA",
    callToAction: "Buy Now",
    priority: 90,
  },
] as const;

const budgetRanges = {
  b2cImpulse: {
    unaware: { min: 1500, max: 6000, tier: "growth" },
    "problem-aware": { min: 1000, max: 5000, tier: "growth" },
    "solution-aware": { min: 800, max: 4000, tier: "efficient" },
    "product-aware": { min: 500, max: 3000, tier: "retargeting" },
    "most-aware": { min: 250, max: 2000, tier: "bottom_funnel" },
  },
  b2cMidTicket: {
    unaware: { min: 3000, max: 12000, tier: "scale" },
    "problem-aware": { min: 2000, max: 10000, tier: "scale" },
    "solution-aware": { min: 1500, max: 8000, tier: "efficient" },
    "product-aware": { min: 1000, max: 6000, tier: "retargeting" },
    "most-aware": { min: 500, max: 4000, tier: "bottom_funnel" },
  },
  b2cHighTicket: {
    unaware: { min: 5000, max: 20000, tier: "scale" },
    "problem-aware": { min: 3500, max: 15000, tier: "qualified_demand" },
    "solution-aware": { min: 2500, max: 12000, tier: "qualified_demand" },
    "product-aware": { min: 2000, max: 10000, tier: "appointment_booking" },
    "most-aware": { min: 1000, max: 7000, tier: "close" },
  },
  b2bSmb: {
    unaware: { min: 4000, max: 18000, tier: "demand_gen" },
    "problem-aware": { min: 3000, max: 15000, tier: "demand_gen" },
    "solution-aware": { min: 2500, max: 12000, tier: "consideration" },
    "product-aware": { min: 2000, max: 10000, tier: "demo_booking" },
    "most-aware": { min: 1000, max: 8000, tier: "pipeline_conversion" },
  },
  b2bEnterprise: {
    unaware: { min: 10000, max: 60000, tier: "enterprise_awareness" },
    "problem-aware": { min: 8000, max: 50000, tier: "enterprise_demand" },
    "solution-aware": { min: 6000, max: 40000, tier: "shortlist" },
    "product-aware": { min: 4000, max: 30000, tier: "demo_sequence" },
    "most-aware": { min: 2000, max: 20000, tier: "opportunity_acceleration" },
  },
} as const;

type AwarenessKey = (typeof awarenessProfiles)[number]["key"];
type BudgetModel = keyof typeof budgetRanges;

type Scenario = {
  slug: string;
  name: string;
  market: "B2B" | "B2C";
  productType: "physical_product" | "digital_product" | "service";
  vertical: string;
  budgetModel: BudgetModel;
  priceBand: string;
  salesCycle: "short" | "medium" | "long";
  primaryChannels: string[];
  offer: string;
  funnelFamily: string;
  copyTheme: string;
};

const scenarios: Scenario[] = [
  {
    slug: "dtc_skincare",
    name: "DTC Skincare",
    market: "B2C",
    productType: "physical_product",
    vertical: "beauty_and_skincare",
    budgetModel: "b2cMidTicket",
    priceBand: "50_to_120",
    salesCycle: "short",
    primaryChannels: ["meta", "instagram", "email"],
    offer: "routine_bundle_with_intro_discount",
    funnelFamily: "quiz_to_bundle_checkout",
    copyTheme: "skin concerns, before-after proof, ingredient trust",
  },
  {
    slug: "fitness_supplement",
    name: "Fitness Supplement",
    market: "B2C",
    productType: "physical_product",
    vertical: "health_and_fitness",
    budgetModel: "b2cImpulse",
    priceBand: "35_to_90",
    salesCycle: "short",
    primaryChannels: ["meta", "youtube", "email"],
    offer: "starter_stack_with_subscription_upsell",
    funnelFamily: "ugc_vsl_to_checkout",
    copyTheme: "energy, convenience, social proof, transformation",
  },
  {
    slug: "home_office_ergonomics",
    name: "Home Office Ergonomics",
    market: "B2C",
    productType: "physical_product",
    vertical: "home_office",
    budgetModel: "b2cMidTicket",
    priceBand: "150_to_600",
    salesCycle: "medium",
    primaryChannels: ["pinterest", "google_search", "email"],
    offer: "ergonomic_bundle_with_financing",
    funnelFamily: "educational_content_to_bundle_offer",
    copyTheme: "productivity, posture relief, premium workspace design",
  },
  {
    slug: "creator_course",
    name: "Creator Course",
    market: "B2C",
    productType: "digital_product",
    vertical: "education_and_creator_economy",
    budgetModel: "b2cMidTicket",
    priceBand: "197_to_997",
    salesCycle: "medium",
    primaryChannels: ["youtube", "webinar", "email"],
    offer: "signature_course_with_bonus_stack",
    funnelFamily: "lead_magnet_to_webinar_close",
    copyTheme: "clarity, shortcuts, expert positioning, proof of outcomes",
  },
  {
    slug: "template_bundle",
    name: "Template Bundle",
    market: "B2C",
    productType: "digital_product",
    vertical: "productivity_templates",
    budgetModel: "b2cImpulse",
    priceBand: "19_to_79",
    salesCycle: "short",
    primaryChannels: ["tiktok", "instagram", "email"],
    offer: "bundle_with_limited_time_bonus_templates",
    funnelFamily: "short_form_to_tripwire_checkout",
    copyTheme: "speed, convenience, done-for-you assets, instant win",
  },
  {
    slug: "high_ticket_coaching",
    name: "High-Ticket Coaching",
    market: "B2C",
    productType: "service",
    vertical: "coaching_and_consulting",
    budgetModel: "b2cHighTicket",
    priceBand: "2000_to_10000",
    salesCycle: "long",
    primaryChannels: ["instagram", "webinar", "sales_call"],
    offer: "strategy_call_for_group_program",
    funnelFamily: "authority_content_to_application_call",
    copyTheme: "identity shift, transformation, authority, urgency",
  },
  {
    slug: "local_med_spa",
    name: "Local Med Spa",
    market: "B2C",
    productType: "service",
    vertical: "local_beauty_services",
    budgetModel: "b2cHighTicket",
    priceBand: "300_to_2500",
    salesCycle: "medium",
    primaryChannels: ["google_search", "meta", "sms"],
    offer: "consultation_with_first_visit_incentive",
    funnelFamily: "lead_form_to_booking_sequence",
    copyTheme: "trust, safety, local proof, premium results",
  },
  {
    slug: "b2b_saas_smb",
    name: "B2B SaaS SMB",
    market: "B2B",
    productType: "digital_product",
    vertical: "sales_and_marketing_software",
    budgetModel: "b2bSmb",
    priceBand: "99_to_999_mrr",
    salesCycle: "medium",
    primaryChannels: ["linkedin", "google_search", "email"],
    offer: "free_trial_or_live_demo",
    funnelFamily: "problem_content_to_demo_sequence",
    copyTheme: "efficiency, pipeline visibility, ROI, fast onboarding",
  },
  {
    slug: "demand_gen_agency",
    name: "Demand Gen Agency",
    market: "B2B",
    productType: "service",
    vertical: "agency_services",
    budgetModel: "b2bSmb",
    priceBand: "3000_to_15000_mrr",
    salesCycle: "long",
    primaryChannels: ["linkedin", "webinar", "email"],
    offer: "audit_plus_strategy_call",
    funnelFamily: "thought_leadership_to_audit_offer",
    copyTheme: "expert diagnosis, missed pipeline, proof, strategic clarity",
  },
  {
    slug: "industrial_equipment",
    name: "Industrial Equipment",
    market: "B2B",
    productType: "physical_product",
    vertical: "industrial_manufacturing",
    budgetModel: "b2bEnterprise",
    priceBand: "20000_plus",
    salesCycle: "long",
    primaryChannels: ["linkedin", "google_search", "sales_call"],
    offer: "spec_sheet_plus_engineer_consultation",
    funnelFamily: "spec_content_to_consultative_sale",
    copyTheme: "reliability, throughput, compliance, total cost of ownership",
  },
];

function buildRules(): Prisma.RuleSetCreateManyInput[] {
  return scenarios.flatMap((scenario, scenarioIndex) =>
    awarenessProfiles.map((profile) => {
      const budget = budgetRanges[scenario.budgetModel][profile.key as AwarenessKey];

      return {
        name: `${scenario.name} | ${profile.label} | ${budget.tier}`,
        priority: profile.priority + scenarioIndex,
        conditions: {
          productType: scenario.productType,
          vertical: scenario.vertical,
          market: scenario.market,
          awareness: profile.key,
          budget: {
            min: budget.min,
            max: budget.max,
            tier: budget.tier,
          },
          priceBand: scenario.priceBand,
          salesCycle: scenario.salesCycle,
          preferredChannels: scenario.primaryChannels,
        },
        actions: {
          funnelBlueprintId: `bp_${scenario.slug}_${profile.blueprintStage}`,
          copyTemplatePack: `pack_${scenario.slug}_${profile.copyStage}`,
          funnelFamily: scenario.funnelFamily,
          primaryChannels: scenario.primaryChannels,
          campaignObjective: profile.objective,
          offerStrategy: profile.offerStrategy,
          coreOffer: scenario.offer,
          messagingAngle: profile.messagingAngle,
          copyTheme: scenario.copyTheme,
          callToAction: profile.callToAction,
        },
      };
    }),
  );
}

async function main() {
  const rules = buildRules();

  if (rules.length !== 50) {
    throw new Error(`Expected 50 rules, received ${rules.length}.`);
  }

  const createdCount = await prisma.$transaction(async (tx) => {
    await tx.ruleSet.deleteMany();

    const result = await tx.ruleSet.createMany({
      data: rules,
    });

    return result.count;
  });

  console.log(`Seeded ${createdCount} RuleSet rows.`);
}

main()
  .catch((error) => {
    console.error("Failed to seed RuleSet data.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
