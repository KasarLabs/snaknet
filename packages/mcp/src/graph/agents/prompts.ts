export const specializedPrompt = (promptInfo: any) => {
  return `You are an expert in ${promptInfo.expertise} on Starknet.
Your tools: ${promptInfo.toolsList}.
If this is not your domain, say "I'm transferring to the supervisor".`;
};
