import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, CallbackQueryHandler
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client
openai_client = OpenAI(api_key="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")

# Fine-tuned model ID
FINE_TUNED_MODEL = "ft:gpt-4o-mini-2024-07-18:acyr:postaajademo2:CEAOouTU"

# System prompt
SYSTEM_PROMPT = (
    "Olet ammattimainen myyntiassistentti, joka laatii kiinnostavia ja houkuttelevia myynti-ilmoituksia suomeksi. "
    "Tyyli on ammattimainen, lähestyttävä ja ytimekäs. Käytä käyttäjän antamia tietoja ja kirjoita 100–200 sanan "
    "ilmoitus, joka tuo esiin tuotteen tai kohteen tärkeimmät ominaisuudet, kunnon, hinnan ja hyödyt ostajalle. "
    "Päätä ilmoitus toimintakehotukseen."
)

# Template text
TEMPLATE_TEXT = """Tuotteen tiedot:
- Tuotekategoria: esim. Auto, Asunto, Puhelin
- Hinta: esim. 14 900 €
- Sijainti: esim. Tampere
- Koko / tekniset tiedot: esim. 2 h, 55 m² / 128 GB, 6,1 tuumaa
- Kunto: esim. Erinomainen, Hyvä, Tyydyttävä
- Keskeiset ominaisuudet: esim. Parveke, ilmastointi, nahkapenkit, nopea prosessori
- Lisätiedot: esim. Remontoitu 2021 / Akku vaihdettu / Yhden omistajan auto"""

# Command: /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Create an inline keyboard with a button
    keyboard = [
        [InlineKeyboardButton("Kopioi mallipohja", callback_data="copy_template")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Send the template in a code block for easy copying
    await update.message.reply_text(
        "Tervetuloa <b>Postaaja-bottiin</b>!\n\n"
        "Käytä alla olevaa mallipohjaa tuotteen tietojen lähettämiseen. Voit kopioida sen painamalla nappia tai valitsemalla tekstin ja kopioimalla sen manuaalisesti.\n\n"
        f"<pre>\n{TEMPLATE_TEXT}\n</pre>\n\n"
        "Täytä tiedot ja lähetä viesti, niin botti laatii ammattimaisen myynti-ilmoituksen!",
        parse_mode="HTML",
        reply_markup=reply_markup
    )

# Handle button click
async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()  # Acknowledge the callback

    if query.data == "copy_template":
        # Send the template text again for easy copying
        await query.message.reply_text(
            f"```\n{TEMPLATE_TEXT}\n```\n\n"
            "Valitse ja kopioi yllä oleva teksti (paina pitkään ja valitse 'Kopioi') ja liitä se viestikenttään!",
            parse_mode="Markdown"
        )

# Command: /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Lähetä tuotteen tai kohteen tiedot <b>/start</b>-komennossa näkyvän mallin mukaan. "
        "Botti muokkaa syötteesi pohjalta ammattimaisen myynti-ilmoituksen suomeksi. "
        "Varmista, että ilmoituksessa on vähintään <b>kategoria</b>, <b>hinta</b> ja <b>keskeiset ominaisuudet</b>.",
        parse_mode="HTML"
    )

# Validate user input
def validate_input(text: str) -> bool:
    return all(field in text for field in ["Hinta", "Keskeiset ominaisuudet"])

# Generate listing using fine-tuned GPT-4o
async def generate_listing(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_input = update.message.text
    user_id = update.effective_user.id
    chat_id = update.effective_chat.id

    if not validate_input(user_input):
        await update.message.reply_text(
            "Tarkista syöte! Varmista, että mukana ovat ainakin <b>Hinta</b> ja <b>Keskeiset ominaisuudet</b>. "
            "Käytä /start nähdäksesi mallipohjan.",
            parse_mode="HTML"
        )
        return

    try:
        response = openai_client.chat.completions.create(
            model=FINE_TUNED_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_input}
            ],
            max_tokens=500,
            temperature=0.7,
        )
        listing = response.choices[0].message.content.strip()
        await update.message.reply_text(listing)
    except Exception as e:
        await update.message.reply_text(f"Virhe ilmoituksen luomisessa: {str(e)}")
        print(f"Error for user {user_id} in chat {chat_id}: {str(e)}")

def main():
    bot_token = "8459764501:AAErKB-8JHkM2wAMTdW_WH8iOKXBt7dxi7s"
    if not bot_token:
        raise ValueError("TELEGRAM_BOT_TOKEN not set in environment variables")
    
    application = Application.builder().token(bot_token).build()
    
    # Add handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, generate_listing))
    application.add_handler(CallbackQueryHandler(button_callback))  # Handle button clicks
    
    print("Bot is running...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()