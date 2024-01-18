import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { Manager } from "../../manager.js";
import { Accessableby, Command } from "../../structures/Command.js";
import { CommandHandler } from "../../structures/CommandHandler.js";
import { SongNotiEnum } from "../../database/schema/SongNoti.js";

export default class implements Command {
  public name = ["settings", "song-noti"];
  public description = "Enable or disable the player control notifications";
  public category = "Utils";
  public accessableby = Accessableby.Manager;
  public usage = "<enable> or <disable>";
  public aliases = ["song-noti", "snt", "sn"];
  public lavalink = false;
  public playerCheck = false;
  public usingInteraction = true;
  public sameVoiceCheck = false;
  public options = [
    {
      name: "type",
      description: "Choose enable or disable",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Enable",
          value: "enable",
        },
        {
          name: "Disable",
          value: "disable",
        },
      ],
    },
  ];

  public async execute(client: Manager, handler: CommandHandler) {
    await handler.deferReply();

    const value = handler.args[0];
    const originalValue = await client.db.songNoti.get(`${handler.guild!.id}`);

    if (value === "enable") {
      if (originalValue === SongNotiEnum.Enable)
        return handler.editReply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(
                  handler.language,
                  "utilities",
                  "songnoti_already_on"
                )}`
              )
              .setColor(client.color),
          ],
        });

      await client.db.songNoti.set(`${handler.guild!.id}`, SongNotiEnum.Enable);

      const embed = new EmbedBuilder()
        .setDescription(
          `${client.i18n.get(handler.language, "utilities", "songnoti_set", {
            toggle: `${client.i18n.get(handler.language, "music", "enabled")}`,
          })}`
        )
        .setColor(client.color);

      return handler.editReply({ embeds: [embed] });
    } else if (value === "disable") {
      if (originalValue === SongNotiEnum.Disable)
        return handler.editReply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(
                  handler.language,
                  "utilities",
                  "songnoti_already_off"
                )}`
              )
              .setColor(client.color),
          ],
        });

      await client.db.songNoti.set(
        `${handler.guild!.id}`,
        SongNotiEnum.Disable
      );
      const embed = new EmbedBuilder()
        .setDescription(
          `${client.i18n.get(handler.language, "utilities", "songnoti_set", {
            toggle: `${client.i18n.get(handler.language, "music", "disabled")}`,
          })}`
        )
        .setColor(client.color);

      return handler.editReply({ embeds: [embed] });
    } else {
      const onsome = new EmbedBuilder()
        .setDescription(
          `${client.i18n.get(handler.language, "utilities", "arg_error", {
            text: "**enable** or **disable**!",
          })}`
        )
        .setColor(client.color);
      return handler.editReply({ content: " ", embeds: [onsome] });
    }
  }
}