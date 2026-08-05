declare module "mammoth/mammoth.browser" {
  interface MammothResult {
    value: string;
    messages: Array<{ type: string; message: string }>;
  }

  export function extractRawText(input: { arrayBuffer: ArrayBuffer }): Promise<MammothResult>;
  const mammoth: { extractRawText: typeof extractRawText };
  export default mammoth;
}
