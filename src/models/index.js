const mongoose = require('mongoose');
const { Schema } = mongoose;

const GuildConfig = mongoose.model('GuildConfig', new Schema({
  guildId: { type: String, unique: true, index: true, required: true },
  prefix: { type: String, default: '!' },
  logChannelId: String,
  welcomeChannelId: String,
  leaveChannelId: String,
  autoroleId: String,
  quarantineRoleId: String,
  suggestionChannelId: String,
  announcementChannelId: String,
  chatChannelId: String,
  applicationChannelId: String,
  applicationRoleId: String,
  applicationQuestions: { type: [String], default: [] },
  ticketCategories: { type: [String], default: [] },
  ticketPanelChannelId: String,
  ticketSupportRoleIds: { type: [String], default: [] },
  xpRoleRules: { type: [{ xp: Number, roleId: String }], default: [] },
  xpChannelId: String,
  birthdayRewarded: { type: [String], default: [] },
  raidProtectionUntil: Date,
  raidOldVerificationLevel: String,
  filters: { type: Boolean, default: true },
  totalMessages: { type: Number, default: 0 },
  totalWords: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }));

const UserStats = mongoose.model('UserStats', new Schema({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  totalXp: { type: Number, default: 0 },
  weeklyXp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  lastMessageXpAt: Date,
  lastVoiceXpAt: Date,
  birthdayRewardYear: Number
}));
UserStats.schema.index({ guildId: 1, userId: 1 }, { unique: true });

const Warning = mongoose.model('Warning', new Schema({
  guildId: String, userId: String, moderatorId: String, reason: String, createdAt: { type: Date, default: Date.now }
}));

const Ticket = mongoose.model('Ticket', new Schema({
  guildId: String, channelId: { type: String, unique: true }, ownerId: String,
  category: String, status: { type: String, default: 'open' }, claimedBy: String,
  helpers: { type: [String], default: [] }, createdAt: { type: Date, default: Date.now },
  closedAt: Date
}));

const Giveaway = mongoose.model('Giveaway', new Schema({
  guildId: String, channelId: String, messageId: String, prize: String,
  winnersCount: Number, endsAt: Date, entrants: { type: [String], default: [] },
  ended: { type: Boolean, default: false }
}));

const Drop = mongoose.model('Drop', new Schema({
  guildId: String, channelId: String, messageId: String, prize: String,
  winnerId: String, ended: { type: Boolean, default: false }
}));

const Application = mongoose.model('Application', new Schema({
  guildId: String, userId: String, answers: [String],
  status: { type: String, default: 'pending' }, createdAt: { type: Date, default: Date.now }
}));

const Reminder = mongoose.model('Reminder', new Schema({
  userId: String, guildId: String, text: String, dueAt: Date, sent: { type: Boolean, default: false }
}));

const Suggestion = mongoose.model('Suggestion', new Schema({
  guildId: String, channelId: String, messageId: String, authorId: String,
  text: String, up: { type: [String], default: [] }, down: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
}));

const Birthday = mongoose.model('Birthday', new Schema({
  guildId: String, userId: String, accountCreatedAt: Date
}));

const Poll = mongoose.model('Poll', new Schema({ guildId: String, channelId: String, messageId: String, question: String, options: [String], votes: { type: Schema.Types.Mixed, default: {} } }));
const ReactionRole = mongoose.model('ReactionRole', new Schema({ guildId: String, channelId: String, messageId: String, emoji: String, roleId: String }));

const Tkm = mongoose.model('Tkm', new Schema({
  guildId: String, channelId: String, messageId: String, challengerId: String,
  opponentId: String, status: { type: String, default: 'pending' }, choices: { type: Schema.Types.Mixed, default: {} }
}));

module.exports = { GuildConfig, UserStats, Warning, Ticket, Giveaway, Drop, Application, Reminder, Suggestion, Birthday, Tkm, Poll, ReactionRole };
