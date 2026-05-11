import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { generateFunnel } from "./ruleEngine";

type FunnelInput = {
  productType?: string;
  priceRange?: string;
  audienceAwareness?: string;
  budget?: number;
  channels?: string[];
};

const FIXED_DATE = new Date("2026-05-11T10:30:00.000Z");

const expectedStages = [
  {
    id: "stage_1",
    name: "Awareness",
    type: "ad",
    channel: "facebook",
    copyTemplate: {
      headline: "Are you struggling with X?",
      body: "We have the perfect solution...",
      callToAction: "Learn More",
    },
  },
  {
    id: "stage_2",
    name: "Consideration",
    type: "landing_page",
    channel: "web",
    copyTemplate: {
      headline: "The Ultimate Guide to Y",
      body: "Sign up to get your free guide...",
      callToAction: "Download Now",
    },
  },
  {
    id: "stage_3",
    name: "Conversion",
    type: "checkout",
    channel: "web",
    copyTemplate: {
      headline: "Get Started Today",
      body: "Join thousands of happy customers...",
      callToAction: "Buy Now",
    },
  },
];

const expectMockedFunnel = (result: ReturnType<typeof generateFunnel>, input: FunnelInput) => {
  expect(result).toEqual({
    blueprintId: "bp_1778495400000",
    stages: expectedStages,
    metadata: {
      generatedAt: "2026-05-11T10:30:00.000Z",
      inputUsed: input,
    },
  });
};

describe("generateFunnel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the mocked funnel for a complete input payload", () => {
    const input = {
      productType: "course",
      priceRange: "$100-$250",
      audienceAwareness: "problem-aware",
      budget: 5000,
      channels: ["facebook", "instagram"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles an empty input object", () => {
    const input = {};

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles a missing productType field", () => {
    const input = {
      priceRange: "$50-$100",
      audienceAwareness: "cold",
      budget: 750,
      channels: ["facebook"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles a missing audienceAwareness field", () => {
    const input = {
      productType: "newsletter",
      priceRange: "free",
      budget: 300,
      channels: ["linkedin"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles a missing budget field", () => {
    const input = {
      productType: "agency",
      priceRange: "$1k-$5k",
      audienceAwareness: "solution-aware",
      channels: ["google"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles an empty channels array", () => {
    const input = {
      productType: "saas",
      priceRange: "$50-$99",
      audienceAwareness: "unaware",
      budget: 1200,
      channels: [],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles a zero budget", () => {
    const input = {
      productType: "ebook",
      priceRange: "$0-$25",
      audienceAwareness: "problem-aware",
      budget: 0,
      channels: ["email"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles a negative budget without crashing", () => {
    const input = {
      productType: "consulting",
      priceRange: "$500-$1000",
      audienceAwareness: "product-aware",
      budget: -100,
      channels: ["linkedin", "email"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("handles an extremely large budget", () => {
    const input = {
      productType: "enterprise-saas",
      priceRange: "$10k+",
      audienceAwareness: "most-aware",
      budget: Number.MAX_SAFE_INTEGER,
      channels: ["google", "youtube", "linkedin"],
    };

    const result = generateFunnel(input);

    expectMockedFunnel(result, input);
  });

  it("does not mutate the original input object", () => {
    const input = {
      productType: "membership",
      priceRange: "$29-$49",
      audienceAwareness: "solution-aware",
      budget: 900,
      channels: ["tiktok"],
    };

    const originalSnapshot = JSON.parse(JSON.stringify(input));

    generateFunnel(input);

    expect(input).toEqual(originalSnapshot);
  });
});
