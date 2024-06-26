import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import delay from "delay";
import { Manager } from "../../manager.js";
import { Accessableby, Command } from "../../structures/Command.js";
import type { CommandHandler } from "../../structures/CommandHandler.js";


export default class implements Command {
  public name = ["speed"];
  public description = "Sets the speed of the song.";
  public category = "Filter";
  public accessableby = Accessableby.Member;
  public usage = "<number>";
  public aliases = ["speed"];
  public lavalink = true;
  public playerCheck = true;
  public usingInteraction = true;
  public sameVoiceCheck = true;
  public permissions = [];
  public options = [
    {
      name: "amount",
      description: "The amount of speed to set the song to.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
      max_value: 10
    },
  ];

  public async execute(client: Manager, handler: CommandHandler) {
    await handler.deferReply();

    const value = handler.args[0];

    if (value && isNaN(+value))
      return handler.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(client.i18n.get(handler.language, "command.music", "number_invalid"))
            .setColor(client.color),
        ],
      });

    if (Number(value) < 0)
      return handler.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(client.i18n.get(handler.language, "command.filter", "filter_greater"))
            .setColor(client.color),
        ],
      });
    if (Number(value) > 10)
      return handler.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(client.i18n.get(handler.language, "command.filter", "filter_less"))
            .setColor(client.color),
        ],
      });

    const player = client.manager.players.get(handler.guild!.id);

    const vol = player?.volume ?? client.config.lavalink.DEFAULT_VOLUME ?? 100
    const data = {
      guildId: handler.guild!.id,
      playerOptions: {
        filters: {
          timescale: { speed: Number(value) },
          volume: vol
        },
      },
    };

    await player?.send(data);

    player?.data.set("filter-mode", this.name[0]);

    const embed = new EmbedBuilder()
      .setDescription(
        client.i18n.get(handler.language, "command.filter", "speed_on", {
          amount: value,
        })
      )
      .setColor(client.color);
    await delay(2000);
    await handler.editReply({ content: " ", embeds: [embed] });
  }
}
