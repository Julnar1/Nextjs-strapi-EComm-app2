export abstract class ServiceBase {
  private static readonly API_URL =
    "https://grounded-melody-0500becd92.strapiapp.com";
  private static readonly API_TOKEN =
    "366cc4ac9900d2f5810f06a3d93f304c3cb83122c6ad464895c0cbd03817d25c7314e5ddb5e8ac067178304a31d7d1b89e574dca1fc30aa43724b1e5f33d39c33d74f09bee598358cd2c6d8f539687b31b4f79f6e26b24453d09e5faff066c4937183660f89dd9f7bcd0e67976434422113e5914224fe5750e1b2184ec000d63";
  protected static getUrl(path: string) {
    return `${this.API_URL}${path}`;
  }
  protected static getApiToken(): string {
    return this.API_TOKEN;
  }
}
