export const generateFunnel = (input: unknown): Record<string, unknown> => {
  return {
    blueprintId: "bp_" + Date.now(),
    stages: [
      {
        id: "stage_1",
        name: "Awareness",
        type: "ad",
        channel: "facebook",
        copyTemplate: {
          headline: "Are you struggling with X?",
          body: "We have the perfect solution...",
          callToAction: "Learn More"
        }
      },
      {
        id: "stage_2",
        name: "Consideration",
        type: "landing_page",
        channel: "web",
        copyTemplate: {
          headline: "The Ultimate Guide to Y",
          body: "Sign up to get your free guide...",
          callToAction: "Download Now"
        }
      },
      {
        id: "stage_3",
        name: "Conversion",
        type: "checkout",
        channel: "web",
        copyTemplate: {
          headline: "Get Started Today",
          body: "Join thousands of happy customers...",
          callToAction: "Buy Now"
        }
      }
    ],
    metadata: {
      generatedAt: new Date().toISOString(),
      inputUsed: input
    }
  };
};
