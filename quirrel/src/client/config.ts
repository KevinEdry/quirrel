const isProduction = process.env.NODE_ENV === "production";

export function withoutTrailingSlash(url: string): string {
  if (url.endsWith("/")) {
    return url.slice(0, url.length - 1);
  }

  return url;
}

export function prefixWithProtocol(string: string): string {
  if (string.startsWith("http://") || string.startsWith("https://")) {
    return string;
  }

  return "https://" + string;
}

export function getQuirrelBaseUrl(): string | undefined {
  const fromEnvironment = process.env.QUIRREL_URL;
  if (fromEnvironment) {
    return prefixWithProtocol(withoutTrailingSlash(fromEnvironment));
  }

  return isProduction ? "https://api.quirrel.dev" : "http://localhost:9181";
}

export function getQuirrelToken(): string | undefined {
  return process.env.QUIRREL_TOKEN;
}

export function getEncryptionSecret(): string | undefined {
  return process.env.QUIRREL_ENCRYPTION_SECRET;
}

export function getOldEncryptionSecrets(): string[] | null {
  return JSON.parse(process.env.QUIRREL_OLD_SECRETS ?? "null");
}

export function getApplicationBaseUrl(): string {
  const baseUrl = process.env.QUIRREL_BASE_URL;

  if (!baseUrl) {
    throw new Error("Please specify QUIRREL_BASE_URL.");
  }

  return prefixWithProtocol(baseUrl);
}

export function registerDevelopmentDefaults({
  applicationBaseUrl,
}: {
  applicationBaseUrl: string;
}) {
  if (!isProduction && !process.env.QUIRREL_BASE_URL) {
    process.env.QUIRREL_BASE_URL = applicationBaseUrl;
  }
}
