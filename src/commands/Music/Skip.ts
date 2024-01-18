import { EmbedBuilder, Message } from "discord.js";
import { Manager } from "../../manager.js";
import { Accessableby, Command } from "../../structures/Command.js";
import { CommandHandler } from "../../structures/CommandHandler.js";
import { KazagumoPlayer } from "../../lib/main.js";

// Main code
export default class implements Command {
  public name = ["skip"];
  public description = "Skips the song currently playing.";
  public category = "Music";
  public accessableby = Accessableby.Member;
  public usage = "";
  public aliases = [];
  public lavalink = true;
  public playerCheck = true;
  public usingInteraction = true;
  public sameVoiceCheck = true;
  public options = [];

  public async execute(client: Manager, handler: CommandHandler) {
    await handler.deferReply();

    const player = client.manager.players.get(
      handler.guild!.id
    ) as KazagumoPlayer;

    if (player.queue.size == 0) {
      await player.destroy();
      await client.UpdateMusic(player);

      const skipped = new EmbedBuilder()
        .setDescription(
          `${client.i18n.get(handler.language, "music", "skip_msg")}`
        )
        .setColor(client.color);

      handler.editReply({ content: " ", embeds: [skipped] });
    } else {
      await player.skip();

      const skipped = new EmbedBuilder()
        .setDescription(
          `${client.i18n.get(handler.language, "music", "skip_msg")}`
        )
        .setColor(client.color);

      handler.editReply({ content: " ", embeds: [skipped] });
    }
  }
}