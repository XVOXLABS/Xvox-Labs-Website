// Intrinsic sizes of the agent images in public/images/agents (read from the WebP files), so
// next/image can reserve the right space. still = agent.image, anim = agent.animatedImage.
export const agentImageSize = {
  scout: { still: [620, 705], anim: [274, 300] },
  quill: { still: [620, 673], anim: [296, 300] },
  beacon: { still: [620, 692], anim: [265, 300] },
  relay: { still: [620, 633], anim: [300, 295] },
  sage: { still: [620, 602], anim: [300, 296] },
  reel: { still: [620, 783], anim: [242, 300] },
};
