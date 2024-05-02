const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const trigger = require("../../schemas/triggerSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trigger")
    .setDescription("trigger system")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("add a url and a trigger responded")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("the url to reply to")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reply")
            .setDescription("the response to the trigger")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("remove trigger")
        .addStringOption((option) =>
          option.setName("url").setDescription("the url to remove")
        )
    )

    .addSubcommand((subcommand) =>
      subcommand.setName("check").setDescription("check triggers added")
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("edit")
        .setDescription("edit trigger")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("the url to edit")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("new-reply").setDescription("the new reply to the url")
        )
        .addChannelOption((option) =>
          option
            .setName("block-channel")
            .setDescription("Block a channel from the trigger reply")
        )
    ),

  async execute(interaction) {
    async function sendMessage(message) {
      const embed = new EmbedBuilder()
        .setColor("DarkVividPink")
        .setDescription(message);

      await interaction.reply({ embeds: [embed], emphemeral: true });

      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      )
        return await sendMessage(`You don't have perms to use this!`);
    }
    const { options } = interaction;
    const sub = options.getSubcommand;

    var globalData = await trigger.find({ Guild: interaction.guild.id });
    var data;
    var url;
    switch (sub) {
      case "add":
        url = options.getString("url");
        reply = options.getString("reply");

        data = await trigger.findOne({ Guild: interaction.guild.id, Url: url });
        if (data) {
          return await sendMessage(
            `Looks like this url \`${url}\` is already a trigger`
          );
        } else {
          await trigger.create({
            Guild: interaction.guild.id,
            Url: url,
            Reply: reply,
          });

          await sendMessage(
            `I have added \`${reply}\` as a reply to all messages containing \`${url}\`! Feel free to block this reply in specific channels using /trigger edit `
          );
        }
        break;
      case "remove":
        url = options.getString("url");
        data = await trigger.findOne({ Guild: interaction.guild.id, Url: url });

        if (!data) {
          return await sendMessage(
            `Looks like \`${url}\` is not an EXACT match to one of the url replies!`
          );
        } else {
          await trigger.deleteOne({ Guild: interaction.guild.id, Url: url });
          await sendMessage(
            `I have deleted \`${url}\` from our trigger database.`
          );
        }
        break;
      case "edit":
        url = options.getString("url");
        data = await trigger.findOne({ Guild: interaction.guild.id, Url: url });
        var newReply = options.getString("new-reply") || data.Reply;
        var blockChannel = options.getChannel("block-channel");

        if (!data) {
          return await sendMessage(
            `Looks like \`${url}\` is not an EXACT match to one of the url replies!`
          );
        } else {
          var update;
          if (blockChannel) {
            update = {
              $set: { Reply: newReply },
              $push: { Block: `${blockChannel.id}` },
            };
          } else {
            update = {
              $set: { Reply: newReply },
            };
          }
          await trigger.updateOne(
            { Guild: interaction.guild.id, Url: url },
            update
          );
          await sendMessage(
            `I have updated your trigger with your set changes.`
          );
        }

        break;
      case "check":
        if (globalData) {
          var information = [];
          await globalData.forEach(async (value) => {
            var blocked = value.Block;
            if (blocked.length == 0) blocked = "No blocked channels";
            else blocked = value.Block.join(",");

            information.push(
              `**Trigger Phrase:** \`${value.Phrase}\`\n**Reply Phrase:** \`${value.Reply}\`\n**Blocked Channels:** \`${blocked}\`\n\n`
            );
          });
          await sendMessage(
            `** Your Trigger Phrases and Corresponding Data**\n\n${information.join(
              "\n"
            )}`
          );
        }
    }
  },
};
