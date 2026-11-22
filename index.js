
require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = "!";

const roles = [
  { name: "🆕 Yeni Üye", color: "#95A5A6" },
  { name: "🎮 Oyuncu", color: "#1ABC9C" },
  { name: "💬 Sohbetçi", color: "#3498DB" },
  { name: "🏆 Efsane Üye", color: "#9B59B6" },
  { name: "🌟 Aktif Üye", color: "#2ECC71" },
  { name: "💠 VIP", color: "#F1C40F" },
  { name: "🎨 Tasarımcı", color: "#E91E63" },
  { name: "📹 İçerik Üreticisi", color: "#E67E22" },
  { name: "🎥 Yayıncı", color: "#9146FF" },
  { name: "🤝 Partner", color: "#16A085" },
  { name: "🎫 Destek Ekibi", color: "#1ABC9C",
    permissions: [PermissionFlagsBits.ManageMessages] },
  { name: "📝 Başvuru Yetkilisi", color: "#16A085" },
  { name: "🔧 Deneme Moderatör", color: "#5DADE2",
    permissions: [PermissionFlagsBits.ModerateMembers] },
  { name: "🔨 Moderatör", color: "#2980B9",
    permissions: [
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers
    ] },
  { name: "🔰 Baş Moderatör", color: "#3498DB",
    permissions: [
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers
    ] },
  { name: "🛡️ Yönetici Yardımcısı", color: "#FF7043",
    permissions: [
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers
    ] },
  { name: "⚜️ Yönetici", color: "#E74C3C",
    permissions: [
      PermissionFlagsBits.ManageMessages,
      PermissionFlagsBits.ManageChannels,
      PermissionFlagsBits.ManageRoles,
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
      PermissionFlagsBits.ViewAuditLog
    ] },
  { name: "💎 Kurucu Yardımcısı", color: "#B78BFF",
    permissions: [PermissionFlagsBits.Administrator] },
  { name: "👑 Kurucu", color: "#E5B83B",
    permissions: [PermissionFlagsBits.Administrator] },

  { name: "💜 ElitPrime", color: "#9B59B6" },
  { name: "🤖 GPTPRIME", color: "#5865F2" },
  { name: "🔔 Duyuru Bildirimi", color: "#F1C40F" },
  { name: "🎉 Etkinlik Bildirimi", color: "#2ECC71" },
  { name: "🤖 Bot", color: "#5865F2" }
];

const categories = [
  {
    name: "📌・SUNUCU BİLGİLERİ",
    channels: [
      "📢・duyurular",
      "📜・kurallar",
      "📋・sunucu-rehberi",
      "🎭・rol-seçimi",
      "🤝・iş-birlikleri",
      "📊・anketler"
    ]
  },
  {
    name: "👋・TOPLULUK",
    channels: [
      "💬・sohbet",
      "👋・hoş-geldin",
      "🚪・güle-güle",
      "🤖・bot-komut",
      "📸・medya-paylaşım",
      "😂・meme",
      "🎨・tasarım-paylaşım"
    ]
  },
  {
    name: "🎮・EĞLENCE",
    channels: [
      "🎲・oyun-komutları",
      "🏆・başarımlar",
      "🎁・çekilişler",
      "🎯・etkinlikler",
      "💡・öneriler"
    ]
  },
  {
    name: "🛠️・DESTEK MERKEZİ",
    channels: [
      "🎫・destek-talebi",
      "❓・yardım",
      "📝・şikayet-öneri",
      "📩・başvuru"
    ]
  },
  {
    name: "🤝・TOPLULUK ETKİNLİKLERİ",
    channels: [
      "📅・etkinlik-takvimi",
      "🥇・yarışmalar",
      "🎉・etkinlik-sohbet",
      "📷・etkinlik-galerisi"
    ]
  },
  {
    name: "🔊・SES KANALLARI",
    voice: [
      "🔊・Genel-Sohbet",
      "🎮・Oyun-Odası-1",
      "🎮・Oyun-Odası-2",
      "🎵・Müzik-Odası",
      "🔒・Özel-Oda",
      "💤・AFK"
    ]
  },
  {
    name: "🔒・YÖNETİM",
    private: true,
    channels: [
      "📢・yetkili-duyuru",
      "💬・yetkili-sohbet",
      "📋・yetkili-rapor",
      "🚨・ceza-kayıtları",
      "🎫・destek-kayıtları",
      "📊・sunucu-istatistik"
    ]
  },
  {
    name: "🤖・BOT LOG",
    private: true,
    channels: [
      "📥・giriş-çıkış-log",
      "🔨・moderasyon-log",
      "🛡️・güvenlik-log",
      "🎫・ticket-log",
      "🎁・çekiliş-log",
      "🤖・bot-log"
    ]
  }
];

const staffRoles = [
  "👑 Kurucu",
  "💎 Kurucu Yardımcısı",
  "⚜️ Yönetici",
  "🛡️ Yönetici Yardımcısı",
  "🔰 Baş Moderatör",
  "🔨 Moderatör",
  "🔧 Deneme Moderatör",
  "🎫 Destek Ekibi",
  "📝 Başvuru Yetkilisi"
];

async function createRole(guild, data) {
  let role = guild.roles.cache.find(r => r.name === data.name);

  if (!role) {
    role = await guild.roles.create({
      name: data.name,
      color: data.color,
      permissions: data.permissions || [],
      reason: "Otomatik sunucu kurulumu"
    });
  }

  return role;
}

async function createCategory(guild, data, staff) {
  let category = guild.channels.cache.find(
    c => c.name === data.name && c.type === ChannelType.GuildCategory
  );

  if (!category) {
    const overwrites = data.private
      ? [
          {
            id: guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel]
          },
          ...staff.map(role => ({
            id: role.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages
            ]
          }))
        ]
      : [];

    category = await guild.channels.create({
      name: data.name,
      type: ChannelType.GuildCategory,
      permissionOverwrites: overwrites,
      reason: "Otomatik sunucu kurulumu"
    });
  }

  for (const name of data.channels || []) {
    const exists = guild.channels.cache.find(
      c => c.name === name && c.parentId === category.id
    );

    if (!exists) {
      await guild.channels.create({
        name,
        type: ChannelType.GuildText,
        parent: category.id,
        reason: "Otomatik sunucu kurulumu"
      });
    }
  }

  for (const name of data.voice || []) {
    const exists = guild.channels.cache.find(
      c => c.name === name && c.parentId === category.id
    );

    if (!exists) {
      await guild.channels.create({
        name,
        type: ChannelType.GuildVoice,
        parent: category.id,
        reason: "Otomatik sunucu kurulumu"
      });
    }
  }

  return category;
}

client.once("ready", () => {
  console.log(`${client.user.tag} aktif!`);
  console.log("Kurulum komutu: !kur");
});

client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.content.trim().toLowerCase() !== `${PREFIX}kur`) return;

  if (
    message.author.id !== message.guild.ownerId &&
    !message.member.permissions.has(PermissionFlagsBits.Administrator)
  ) {
    return message.reply("❌ Bu komutu yalnızca sunucu yöneticileri kullanabilir.");
  }

  if (
    !message.guild.members.me.permissions.has(
      PermissionFlagsBits.ManageChannels
    ) ||
    !message.guild.members.me.permissions.has(
      PermissionFlagsBits.ManageRoles
    )
  ) {
    return message.reply(
      "❌ Botta Kanalları Yönet ve Rolleri Yönet izinleri bulunmuyor."
    );
  }

  const status = await message.reply(
    "👑 **Sunucu kurulumu başlatılıyor...**\nLütfen bekle."
  );

  try {
    let roleCount = 0;
    let channelCount = 0;

    const beforeRoles = message.guild.roles.cache.size;

    for (const data of roles) {
      await createRole(message.guild, data);
    }

    roleCount = message.guild.roles.cache.size - beforeRoles;

    const staff = staffRoles
      .map(name => message.guild.roles.cache.find(r => r.name === name))
      .filter(Boolean);

    for (const data of categories) {
      const before = message.guild.channels.cache.size;

      await createCategory(message.guild, data, staff);

      message.guild.channels.cache = message.guild.channels.cache;
      channelCount += message.guild.channels.cache.size - before;
    }

    await status.edit(
      `✅ **SUNUCU KURULUMU TAMAMLANDI!**\n\n` +
      `👑 Oluşturulan rol: **${roleCount}**\n` +
      `📁 Kategori ve kanal işlemleri tamamlandı.\n\n` +
      `💜 ElitPrime & GPTPRIME`
    );

  } catch (error) {
    console.error("Kurulum hatası:", error);

    await status.edit(
      "❌ Kurulum sırasında hata oluştu. Bot izinlerini ve rol sıralamasını kontrol et."
    ).catch(() => {});
  }
});

client.login(process.env.DISCORD_TOKEN);
