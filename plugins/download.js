const { command,   mode, getBuffer, toAudio, IronMan } = require("../lib");
const ScrapeDl = require("../lib/scraper");
command(
  {
    pattern: "fb",
    fromMe: mode,
    desc: "Downloads Facebook Media",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_provide vaild facebook link_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.facebook(match);
    return message.sendFile(buff);
  },
);

command(
  {
    pattern: "insta",
    fromMe: mode,
    desc: "Downloads Instagram Media",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_provide vaild instagram link_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.instagram(match);
    return message.sendFile(buff);
  },
);

command(
  {
    pattern: "twitter",
    fromMe: mode,
    desc: "Downloads Twitter Media",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_provide vaild twitter url_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.twitter(match);
    return await message.sendFile(buff);
  },
);

command(
  {
    pattern: "tiktok",
    fromMe: mode,
    desc: "Downloads Tiktok Media",
    type: "download",
  },
  async (message, match) => {
    if (!match) return await message.reply("_provide tiktok url_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.tiktok(match);
    return await message.sendFile(buff);
  },
);

command(
  {
    pattern: "pinterest",
    fromMe: mode,
    desc: "Downloads Pinterest Images",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_provide me a searching option_");
    await message.reply("_Searching_");
    const buff = await ScrapeDl.pinterest(match);
    return await message.sendFile(buff);
  },
);

command(
  {
    pattern: "spotify",
    fromMe: mode,
    desc: "Downloads Spotify Music",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_provide me spotify url_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.spotify(match);
    const audio = await toAudio(buff);
    return await message.sendFile(audio);
  },
);

command(
  {
    pattern: "ytvideo",
    fromeMe: mode,
    desc: "Downloads Youtube Videos",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_provide youtube url_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.youtube(match);
    return await message.sendFile(buff);
  },
);

command(
  {
    pattern: "ytaudio",
    fromMe: mode,
    desc: "Download Youtube Music Audio",
    type: "download",
  },
  async (message, match) => {
    if (!match) return await message.reply("_provide youtube music_");
    await message.reply("_Downloading_");
    const buff = await ScrapeDl.ytmp3(match);
    return await message.sendFile(buff);
  },
);

/*
command(
  {
    pattern: "video",
    fromMe: mode,
    desc: "Download video from youtube",
    type: "download",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Give me a query");
    let { dlink, title } = await ytsdl(match, "video");
    await message.reply(`_Downloading ${title}_`);
    return await message.sendMessage(
      message.jid,
      dlink,
      {
        mimetype: "video/mp4",
        filename: title + ".mp4",
      },
      "video"
    );
  }
); */
 
/*
command(
  {
    pattern: "song",
    fromMe: mode,
    desc: "Download audio from youtube",
    type: "download",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Give me a query");
    let { dlink, title } = await ytsdl(match);
    await message.reply(`_Downloading ${title}_`);
    let buff = await getBuffer(dlink);
    return await message.sendMessage(
      message.jid,
      buff,
      {
        mimetype: "audio/mpeg",
        filename: title + ".mp3",
      },
      "audio"
    );
  }
); */

 /*
command(
  {
    pattern: "yta",
    fromMe: mode,
    desc: "Download audio from youtube",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("Give me a youtube link");
    if (!isUrl(match)) return await message.reply("Give me a youtube link");
    let { dlink, title } = (
      await getJson(
        `https://api.thexapi.xyz/api/v1/download/youtube/audio?url=${match}`
      )
    ).data;
    await message.reply(`_Downloading ${title}_`);
    let buff = await getBuffer(dlink);
    return await message.sendMessage(
      message.jid,
      buff,
      {
        mimetype: "audio/mpeg",
        filename: title + ".mp3",
      },
      "audio"
    );
  }
);

command(
  {
    pattern: "ytv",
    fromMe: mode,
    desc: "Download audio from youtube",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    let url = getUrl(match)[0];
    if (!url)
      return await message.reply(
        "Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p"
      );
    let quality = match.split(";")[1];
    if (quality && !validateQuality(quality)) {
      return await message.reply(
        "Invalid Resolution \nSupported: 144p, 240p, 360p, 480p, 720p, 1080p, 1440p, 2160p"
      );
    } else if (!quality) quality = "360p";
    if (!match)
      return await message.reply(
        "Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p"
      );
    if (!isUrl(match))
      return await message.reply(
        "Give me a youtube link\n\nExample: ytv youtube.com/watch?v=xxxxx 480p"
      );
    let requrl = `https://api.thexapi.xyz/api/v1/download/youtube/video?url=${url}&quality=${quality}`;
    let response = (await getJson(requrl)).data;
    const { dlink, title } = response;
    console.log(response);
    await message.reply(`_Downloading ${title}_`);
    return await message.sendMessage(
      message.jid,
      dlink,
      {
        mimetype: "video/mp4",
        filename: title + ".mp4",
      },
      "video"
    );
  }
); */


command(
  {
    pattern: "story",
    fromMe: mode,
    desc: "Downloads Instagram stories",
    type: "download",
  },
  async (message, match) => {
    if (!match) return message.reply("_Provide a valid Instagram username_");
    await message.reply(`_Downloading stories of ${match}..._`);
    const res = await fetch(IronMan(`ironman/ig/story?user=${match}`));
    const data = await res.json();
    if (!data.status || !data.media.length)
      return message.reply(
        "_No stories found for this user or this account is private_",
      );
    for (const dl of data.media) {
      await message.sendFile(dl);
    }
  },
);
