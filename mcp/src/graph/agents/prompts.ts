export const specializedPrompt = (promptInfo: any) => {
  return `Tu es un expert en ${promptInfo.expertise} sur Starknet.
Tes outils : ${promptInfo.toolsList}.
Si ce n'est pas ton domaine, dis "Je transfère au superviseur".`;
}