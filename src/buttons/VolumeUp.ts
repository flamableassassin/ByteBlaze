import { ButtonInteraction, CacheType, InteractionCollector, Message } from "discord.js";
import { KazagumoPlayer } from "../lib/main.js";
import { PlayerButton } from "../@types/Button.js";
import { Manager } from "../manager.js";
import { ReplyInteractionService } from "../services/ReplyInteractionService.js";

export default class implements PlayerButton {
  name = "volup";
  async run(
    client: Manager,
    message: ButtonInteraction<CacheType>,
    language: string,
    player: KazagumoPlayer,
    nplaying: Message<boolean>,
    collector: InteractionCollector<ButtonInteraction<"cached">>
  ): Promise<any> {
    if (!player) {
      collector.stop();
    }

    const reply_msg = `${client.i18n.get(language, "button.music", "volup_msg", {
      volume: `${player.volume * 100 + 10}`,
    })}`;

    if (player.volume * 100 >= 100) {
      await new ReplyInteractionService(
        client,
        message,
        `${client.i18n.get(language, "button.music", "volume_invalid")}`
      );
      return;
    }

    player.setVolume(player.volume * 100 + 10);
    await new ReplyInteractionService(client, message, reply_msg);
    return;
  }
}
