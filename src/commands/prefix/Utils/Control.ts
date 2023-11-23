import { Message } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "control"
  aliases = ["setcontrol"]
  usage = "<input>"
  category = "Utils"
  accessableby = Accessableby.Manager;
  description = "Change the player mode for the bot"
  owner = false
  premium = false
  lavalink = false
  isManager = true

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const db = await client.db.control.get(`${message.guild!.id}`);
    const embed = new EmbedBuilder()
      .setDescription(
        `${client.i18n.get(language, "utilities", "control_set", {
          toggle:
            db == "enable"
              ? `${client.i18n.get(language, "music", "disabled")}`
              : `${client.i18n.get(language, "music", "enabled")}`,
        })}`
      )
      .setColor(client.color);

    await message.reply({ embeds: [embed] });
    await client.db.control.set(
      `${message.guild!.id}`,
      db == "enable" ? "disable" : "enable"
    );
  }
};
