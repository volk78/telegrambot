const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('select', async (ctx) => {
  try {
  await ctx.replyWithHTML('<b>Станционные бани, отделение "Зенит"</b>', Markup.inlineKeyboard(
    [
      [Markup.button.callback('Время работы', 'btn_1'), Markup.button.callback('Цены', 'btn_2')]
    ]
  ))
  } catch(e) {
    console.error(e)
  }
})

function addActionBot(btnName, src, text) {
  bot.action(btnName, async (ctx) => {
    try {
      await ctx.answerCbQuery()
      if(src !== false) {
        await ctx.replyWithPhoto({
          source: src
        })
      }
    } catch(e) {
      console.error(e)
    }
    try {
      await ctx.answerCbQuery()
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true
      })
    } catch (e) {
      console.error(e)
    }
  })
}

addActionBot('btn_1', false, text.text1)
addActionBot('btn_2', false, text.text2)

// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))