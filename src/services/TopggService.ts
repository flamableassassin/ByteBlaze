import cron from "node-cron";
import { Snowflake } from "discord.js";
import { Manager } from "../manager.js";
import { request } from "undici";

export class TopggService {
  isTokenAvalible: boolean = false;
  botId?: string;
  url: string = "https://top.gg/api";

  constructor(private client: Manager) {}

  public async settingUp(userId: Snowflake) {
    const res = await this.fetch(`/bots/${userId}/stats`);
    if (res.status == 200) {
      this.isTokenAvalible = true;
      this.botId = userId;
      this.client.logger.info(import.meta.url, "Topgg service has been successfully set up!");
      return true;
    }
    this.client.logger.error(import.meta.url, "There was a problem setting up the topgg service");
    this.client.logger.error(import.meta.url, await res.text());
    return false;
  }

  public async checkVote(userId: string): Promise<boolean> {
    if (!this.botId || !this.isTokenAvalible) throw new Error("TopGG service not setting up!");
    const res = await this.fetch(`/bots/${this.botId}/check?userId=${userId}`);
    if (res.status !== 200) {
      this.client.logger.error(import.meta.url, "There was a problem when fetching data from top.gg");
      return false;
    }
    const jsonRes = (await res.json()) as { voted: number };
    if (jsonRes.voted !== 0) return true;
    return false;
  }

  private async fetch(path: string) {
    return await fetch(this.url + path, {
      headers: {
        Authorization: this.client.config.features.TOPGG_TOKEN,
      },
    });
  }

  public async startInterval() {
    if (!this.botId || !this.isTokenAvalible) throw new Error("TopGG service not setting up!");
    this.updateServerCount(this.client.guilds.cache.size);
    cron.schedule("0 */1 * * * *", () => this.updateServerCount(this.client.guilds.cache.size));
    this.client.logger.info(import.meta.url, "Topgg server count update service has been successfully set up!");
  }

  public async updateServerCount(count: number) {
    if (!this.botId || !this.isTokenAvalible) throw new Error("TopGG service not setting up!");
    const res = await request(this.url + `/bots/${this.botId}/stats`, {
      method: "POST",
      body: JSON.stringify({
        server_count: count,
      }),
      headers: {
        Authorization: this.client.config.features.TOPGG_TOKEN,
        "Content-Type": "application/json",
      },
    });
  }
}
