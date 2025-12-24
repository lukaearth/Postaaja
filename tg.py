import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, CallbackQueryHandler
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

openai_client = OpenAI(api_key="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")

FINE_TUNED_MODEL = "ft:gpt-4o-mini-2024-07-18:acyr:postaajademo2:CEAOouTU"

SYSTEM_PROMPT = (
    "Olet ammattimainen myyntiassistentti, joka laatii kiinnostavia ja houkuttelevia myynti-ilmoituksia suomeksi. "
    "Tyyli on ammattimainen, lähestyttävä ja ytimekäs. Käytä käyttäjän antamia tietoja ja kirjoita 100–200 sanan "
    "ilmoitus, joka tuo esiin tuotteen tai kohteen tärkeimmät ominaisuudet, kunnon, hinnan ja hyödyt ostajalle. "
    "Päätä ilmoitus toimintakehotukseen."
)

TEMPLATE_REAL_ESTATE = """

<b>Kohdetyyppi</b> (Kerrostalo, Omakotitalo, Rivitalo):
<b>Sijainti</b> (Kaupunki, kaupunginosa):
<b>Pinta-ala</b> (m²):
<b>Huonejako</b> (esim. 3h+k):
<b>Kunto</b> (Erinomainen, Hyvä, Tyydyttävä):
<b>Hinta</b> (Myyntihinta/Velaton hinta):
<b>Keskeiset ominaisuudet</b> (esim. parveke, moderni keittiö, näkymät):
<b>Liikenneyhteydet ja palvelut</b>:
<b>Lisätiedot</b> (esim. sauna, remontit, vastike, energialuokka):

"""

TEMPLATE_CARS = """

<b>Merkki ja malli</b>:
<b>Vuosimalli</b>:
<b>Kilometrit</b>:
<b>Kunto</b> (Erinomainen, Hyvä, Tyydyttävä):
<b>Hinta</b>:
<b>Keskeiset ominaisuudet</b> (esim. automaatti, navi, vähän ajettu):
<b>Huoltohistoria</b> (lyhyesti, esim. täydellinen merkkihuolto):
<b>Lisätiedot</b> (esim. renkaat, varusteet, katsastus, vauriot):

"""

TEMPLATE_OTHER = """

<b>Kategoria</b> (esim. elektroniikka, huonekalut):
<b>Tuote</b> (esim. iPhone 14, sohva):
<b>Kunto</b> (Uusi, Kuin uusi, Hyvä, Käytetty):
<b>Hinta</b>:
<b>Keskeiset ominaisuudet</b> (esim. väri, koko, ominaisuudet):
<b>Sijainti</b>:
<b>Toimitus</b> (Nouto, Posti, Matkahuolto):
<b>Lisätiedot</b> (esim. takuu, paketin sisältö, pienet viat):

"""

# Command: /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Reset any previously selected category
    context.user_data["category"] = None
    # Create an inline keyboard with three category buttons
    keyboard = [
        [
            InlineKeyboardButton("Kiinteistöt", callback_data="template_real_estate"),
            InlineKeyboardButton("Autot", callback_data="template_cars"),
            InlineKeyboardButton("Muut", callback_data="template_other")
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Send greeting and category selection prompt
    await update.message.reply_text(
        "Tervetuloa <b>Postaaja-bottiin</b>! Valitse kategoria, niin saat oikean mallipohjan myynti-ilmoitukselle. "
        "Kopioi pohja, täytä tiedot ja lähetä, niin sinun botti laatii ammattimaisen ilmoituksen sinun äänelläsi!",
        parse_mode="HTML",
        reply_markup=reply_markup
    )

# Handle button clicks
async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()  # Acknowledge the callback

    # Create a Back button keyboard
    back_keyboard = [[InlineKeyboardButton("Takaisin", callback_data="back_to_start")]]
    back_reply_markup = InlineKeyboardMarkup(back_keyboard)

    # Send the appropriate template or return to start menu
    if query.data == "template_real_estate":
        context.user_data["category"] = "real_estate"
        await query.message.reply_text(
            f"""<b>Kiinteistön myynti-ilmoituksen mallipohja</b>  
Täytä alla olevat tiedot huolellisesti malliin ja lähetä viesti. Botti laatii ammattimaisen myynti-ilmoituksen antamiesi tietojen perusteella.  \n\n<pre>\n{TEMPLATE_REAL_ESTATE}\n</pre>\n\n"""
            "Kopioi yllä oleva pohja (paina kerran tai valitse 'Kopioi'), täytä tiedot ja lähetä.",
            parse_mode="HTML",
            reply_markup=back_reply_markup
        )
    elif query.data == "template_cars":
        context.user_data["category"] = "cars"
        await query.message.reply_text(
            f"""<b>Auton myynti-ilmoituksen mallipohja</b>  
Täytä alla olevat tiedot huolellisesti malliin ja lähetä viesti. Botti laatii ammattimaisen myynti-ilmoituksen antamiesi tietojen perusteella.  \n\n<pre>\n{TEMPLATE_CARS}\n</pre>\n\n"""
            "Kopioi yllä oleva pohja (paina kerran tai valitse 'Kopioi'), täytä tiedot ja lähetä.",
            parse_mode="HTML",
            reply_markup=back_reply_markup
        )
    elif query.data == "template_other":
        context.user_data["category"] = "other"
        await query.message.reply_text(
            f"""<b>Myynti-ilmoituksen mallipohja</b>  
Täytä alla olevat tiedot huolellisesti malliin ja lähetä viesti. Botti laatii ammattimaisen myynti-ilmoituksen antamiesi tietojen perusteella. \n\n<pre>\n{TEMPLATE_OTHER}\n</pre>\n\n"""
            "Kopioi yllä oleva pohja (paina kerran tai valitse 'Kopioi'), täytä tiedot ja lähetä.",
            parse_mode="HTML",
            reply_markup=back_reply_markup
        )
    elif query.data == "back_to_start":
        # Return to the start menu
        context.user_data["category"] = None
        keyboard = [
            [
                InlineKeyboardButton("Kiinteistöt", callback_data="template_real_estate"),
                InlineKeyboardButton("Autot", callback_data="template_cars"),
                InlineKeyboardButton("Muut", callback_data="template_other")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.message.reply_text(
            "Valitse kategoria, niin saat oikean mallipohjan myynti-ilmoitukselle. "
            "Kopioi pohja, täytä tiedot ja lähetä viesti, niin botti laatii ammattimaisen ilmoituksen!",
            parse_mode="HTML",
            reply_markup=reply_markup
        )

# Command: /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Valitse kategoria komennolla <b>/start</b> ja kopioi saamasi mallipohja. "
        "Täytä tiedot huolellisesti ja lähetä viesti. Botti laatii ammattimaisen myynti-ilmoituksen. "
        "Varmista, että ilmoituksessa on vähintään <b>Hinta</b> ja <b>Keskeiset ominaisuudet</b>. "
        "Jos valitset väärän kategorian, paina <b>Takaisin</b>-painiketta palataksesi valikkoon.",
        parse_mode="HTML"
    )

# Category-aware validation
REAL_ESTATE_REQUIRED = [
    "Sijainti",
    "Pinta-ala",
    "Huonejako",
    "Hinta",
]

CARS_REQUIRED = [
    "Merkki ja malli",
    "Vuosimalli",
    "Kilometrit",
    "Hinta",
]

OTHER_REQUIRED = [
    "Tuote",
    "Kunto",
    "Hinta",
    "Sijainti",
]

def detect_category_from_text(text: str) -> str | None:
    lowered = text.lower()
    if any(k in lowered for k in ["kohdetyyppi", "pinta-ala", "huonejako", "liikenneyhteydet"]):
        return "real_estate"
    if any(k in lowered for k in ["merkki ja malli", "vuosimalli", "kilometrit", "huoltohistoria"]):
        return "cars"
    if any(k in lowered for k in ["kategoria", "tuote", "toimitus", "maksutavat"]):
        return "other"
    return None

def validate_input(text: str, category: str | None) -> tuple[bool, list[str]]:
    # Choose required fields based on category; fallback to best-effort detection
    chosen_category = category or detect_category_from_text(text)
    if chosen_category == "real_estate":
        required = REAL_ESTATE_REQUIRED
    elif chosen_category == "cars":
        required = CARS_REQUIRED
    elif chosen_category == "other":
        required = OTHER_REQUIRED
    else:
        # Generic fallback
        required = ["Hinta", "Keskeiset ominaisuudet"]

    missing = [field for field in required if field not in text]
    return (len(missing) == 0, missing)

# Generate listing using fine-tuned GPT-4o
async def generate_listing(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_input = update.message.text
    user_id = update.effective_user.id
    chat_id = update.effective_chat.id

    # Validate based on selected or detected category
    category = context.user_data.get("category")
    is_valid, missing = validate_input(user_input, category)
    if not is_valid:
        missing_str = ", ".join(missing)
        await update.message.reply_text(
            f"Tarkista syöte! Puuttuvat kentät: <b>{missing_str}</b>. "
            "\nKäytä /start valitaksesi kategorian ja saadaksesi mallipohjan.",
            parse_mode="HTML"
        )
        return

    try:
        # Redact explicit price/fee fields from user message to prevent echoing them
        redacted_input = user_input
        redacted_input = redacted_input.replace("Velaton hinta", "[piilotettu]")
        redacted_input = redacted_input.replace("Myyntihinta", "[piilotettu]")
        redacted_input = redacted_input.replace("Vastike", "[piilotettu]")
        redacted_input = redacted_input.replace("Rahoitusvastike", "[piilotettu]")

        response = openai_client.chat.completions.create(
            model=FINE_TUNED_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": redacted_input}
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
