import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import delay from "delay";
import { Manager } from "../../manager.js";
import { Accessableby, Command } from "../../structures/Command.js";
import { CommandHandler } from "../../structures/CommandHandler.js";

export default class implements Command {
  public name = ["filter"];
  public description = "Apply a filter";
  public category = "Filter";
  public accessableby = Accessableby.Member;
  public usage = "<option>";
  public aliases = ["filter"];
  public lavalink = true;
  public options = [
    {
      name: "type",
      description: "The filter to apply.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: ["3D", "Bass", "Bassboost", "China", "Chipmunk", "Darthvader", "Daycore", "Doubletime", "Earrape", "Karaoke", "Nightcore", "Pop", "Reset", "Slowmotion", "Soft", "Superbass", "Television", "Treblebass", "Tremolo", "Vaporwave", "Vibrate", "Vibrato"].map(i => ({ name: i, value: i }))
    },
  ];
  public playerCheck = true;
  public usingInteraction = true;
  public sameVoiceCheck = true;
  public permissions = [];

  public async execute(client: Manager, handler: CommandHandler) {
    await handler.deferReply();

    const player = client.manager.players.get(handler.guild!.id);

    // Checking if filter is applied already
    if (player?.data.get("filter-mode") == this.name[0])
      return handler.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(handler.language, "command.filter", "filter_already", {
                name: this.name[0],
              })}`
            )
            .setColor(client.color),
        ],
      });

    player?.data.set("filter-mode", this.name[0]);

    let data = { guildId: handler.guild!.id } as any

    switch (handler.args[0]) {
      case "3D":
        data["playerOptions"] = {
          filters: {
            rotation: { rotationHz: 0.2 },
          },
        };
        break;
      case "Bassboost":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0.1 },
              { band: 1, gain: 0.1 },
              { band: 2, gain: 0.05 },
              { band: 3, gain: 0.05 },
              { band: 4, gain: -0.05 },
              { band: 5, gain: -0.05 },
              { band: 6, gain: 0 },
              { band: 7, gain: -0.05 },
              { band: 8, gain: -0.05 },
              { band: 9, gain: 0 },
              { band: 10, gain: 0.05 },
              { band: 11, gain: 0.05 },
              { band: 12, gain: 0.1 },
              { band: 13, gain: 0.1 },
            ],
          },
        };
        break;
      case "China":
        data["playerOptions"] = {
          filters: {
            timescale: {
              speed: 0.75,
              pitch: 1.25,
              rate: 1.25,
            },
          },
        }
        break;

      case "Chipmunk":
        data["playerOptions"] = {
          filters: {
            timescale: {
              speed: 1.05,
              pitch: 1.35,
              rate: 1.25,
            },
          },
        }
        break;
      case "Darthvader":
        data["playerOptions"] = {
          filters: {
            timescale: {
              speed: 0.975,
              pitch: 0.5,
              rate: 0.8,
            },
          },
        }
        break;
      case "Daycore":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0 },
              { band: 1, gain: 0 },
              { band: 2, gain: 0 },
              { band: 3, gain: 0 },
              { band: 4, gain: 0 },
              { band: 5, gain: 0 },
              { band: 6, gain: 0 },
              { band: 7, gain: 0 },
              { band: 8, gain: -0.25 },
              { band: 9, gain: -0.25 },
              { band: 10, gain: -0.25 },
              { band: 11, gain: -0.25 },
              { band: 12, gain: -0.25 },
              { band: 13, gain: -0.25 },
            ],
            timescale: {
              pitch: 0.63,
              rate: 1.05,
            },
          },
        }
        break;
      case "Doubletime":
        data["playerOptions"] = {
          filters: {
            timescale: {
              speed: 1.165,
            },
          },
        }
        break;
      case "Karaoke":
        data["playerOptions"] = {
          filters: {
            karaoke: {
              level: 1.0,
              monoLevel: 1.0,
              filterBand: 220.0,
              filterWidth: 100.0,
            },
          },
        }
        break;
      case "Nightcore":
        data["playerOptions"] = {
          filters: {
            timescale: {
              speed: 1.05,
              pitch: 1.125,
              rate: 1.05,
            },
          },
        }
        break;
      case "Pop":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0.65 },
              { band: 1, gain: 0.45 },
              { band: 2, gain: -0.45 },
              { band: 3, gain: -0.65 },
              { band: 4, gain: -0.35 },
              { band: 5, gain: 0.45 },
              { band: 6, gain: 0.55 },
              { band: 7, gain: 0.6 },
              { band: 8, gain: 0.6 },
              { band: 9, gain: 0.6 },
              { band: 10, gain: 0 },
              { band: 11, gain: 0 },
              { band: 12, gain: 0 },
              { band: 13, gain: 0 },
            ],
          },
        }
        break;
      case "Reset":
        player?.data.delete("filter-mode");
        data["playerOptions"] = {
          filters: {},
        }
        break;
      case "Slowmotion":
        data["playerOptions"] = {
          filters: {
            timescale: {
              speed: 0.5,
              pitch: 1.0,
              rate: 0.8,
            },
          },
        }
        break;
      case "Soft":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0 },
              { band: 1, gain: 0 },
              { band: 2, gain: 0 },
              { band: 3, gain: 0 },
              { band: 4, gain: 0 },
              { band: 5, gain: 0 },
              { band: 6, gain: 0 },
              { band: 7, gain: 0 },
              { band: 8, gain: -0.25 },
              { band: 9, gain: -0.25 },
              { band: 10, gain: -0.25 },
              { band: 11, gain: -0.25 },
              { band: 12, gain: -0.25 },
              { band: 13, gain: -0.25 },
            ],
          },
        }
        break;
      case "Superbass":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0.2 },
              { band: 1, gain: 0.3 },
              { band: 2, gain: 0 },
              { band: 3, gain: 0.8 },
              { band: 4, gain: 0 },
              { band: 5, gain: 0.5 },
              { band: 6, gain: 0 },
              { band: 7, gain: -0.5 },
              { band: 8, gain: 0 },
              { band: 9, gain: 0 },
              { band: 10, gain: 0 },
              { band: 11, gain: 0 },
              { band: 12, gain: 0 },
              { band: 13, gain: 0 },
            ],
          },
        }
        break;
      case "Television":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0 },
              { band: 1, gain: 0 },
              { band: 2, gain: 0 },
              { band: 3, gain: 0 },
              { band: 4, gain: 0 },
              { band: 5, gain: 0 },
              { band: 6, gain: 0 },
              { band: 7, gain: 0.65 },
              { band: 8, gain: 0.65 },
              { band: 9, gain: 0.65 },
              { band: 10, gain: 0.65 },
              { band: 11, gain: 0.65 },
              { band: 12, gain: 0.65 },
              { band: 13, gain: 0.65 },
            ],
          },
        }
        break;
      case "Treblebass":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0.6 },
              { band: 1, gain: 0.67 },
              { band: 2, gain: 0.67 },
              { band: 3, gain: 0 },
              { band: 4, gain: -0.5 },
              { band: 5, gain: 0.15 },
              { band: 6, gain: -0.45 },
              { band: 7, gain: 0.23 },
              { band: 8, gain: 0.35 },
              { band: 9, gain: 0.45 },
              { band: 10, gain: 0.55 },
              { band: 11, gain: 0.6 },
              { band: 12, gain: 0.55 },
              { band: 13, gain: 0 },
            ],
          },
        }
        break;
      case "Tremolo":
        data["playerOptions"] = {
          filters: {
            tremolo: {
              frequency: 4.0,
              depth: 0.75,
            },
          },
        }
        break;
      case "Vaporwave":
        data["playerOptions"] = {
          filters: {
            equalizer: [
              { band: 0, gain: 0 },
              { band: 1, gain: 0 },
              { band: 2, gain: 0 },
              { band: 3, gain: 0 },
              { band: 4, gain: 0 },
              { band: 5, gain: 0 },
              { band: 6, gain: 0 },
              { band: 7, gain: 0 },
              { band: 8, gain: 0.15 },
              { band: 9, gain: 0.15 },
              { band: 10, gain: 0.15 },
              { band: 11, gain: 0.15 },
              { band: 12, gain: 0.15 },
              { band: 13, gain: 0.15 },
            ],
            timescale: {
              pitch: 0.55,
            },
          },
        }
        break;
      case "Vibrate":
        data["playerOptions"] = {
          filters: {
            vibrato: {
              frequency: 4.0,
              depth: 0.75,
            },
            tremolo: {
              frequency: 4.0,
              depth: 0.75,
            },
          },
        }
        break;
      case "Vibrato":
        data["playerOptions"] = {
          vibrato: {
            frequency: 4.0,
            depth: 0.75,
          },
          filters: {
            vibrato: {
              frequency: 4.0,
              depth: 0.75,
            },
          },
        }
        break;
    }

    // Preventing the volume from being updated on filter apply
    if (!data.playerOptions?.filters?.volume) {
      const vol = player?.volume ?? client.config.lavalink.DEFAULT_VOLUME ?? 100

      if (!Object.hasOwn(data.playerOptions, "filters")) data.playerOptions["filters"] = { volume: vol }
      else data.playerOptions.filters["volume"] = vol
    }

    console.log(data);
    await player?.send(data);

    const embed = new EmbedBuilder()
      .setDescription(
        `${client.i18n.get(handler.language, "command.filter", "filter_on", {
          name: this.name[0],
        })}`
      )
      .setColor(client.color);

    await delay(2000);
    await handler.editReply({ content: " ", embeds: [embed] });
  }
}
