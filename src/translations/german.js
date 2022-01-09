module.exports = {
  login: {
    title: "Willkommen!",
    message:
      "Nur noch ein Login trennt dich und deine zukünftigen Lieblingsbücher 📚.",
    button_label: "anmelden / registrieren",
    logging_in: "Logge ein",
    previous_login_message:
      " Wir haben einen früheren Login erkannt und loggen dich erneut ein.",
  },
  home: {
    loading_offer_message: "Suche nach Inseraten",
    no_offers_message:
      "Wir konnten leider keine Inserate finden. Du kannst die Suchfilter ändern, um mehr Angebote zu finden oder erstelle ein Inserat.",
    create_button_label: "Erstelle ein Inserat",
    load_more_button_label: "Weitere laden",
  },
  library: {
    no_reservations:
      "Du hast aktuell keine Reservierungen. Schau gerne in den Inseraten 🕵️‍♂️, ob du nicht dein neues Lieblingsbuch endeckst!",
    button_to_offers: "Zu den Inseraten",
    no_offers:
      "Du hast noch kein Inserat eingestellt. Erstelle eins, um anderen und Nutzerinnen die Möglichkeit zu geben ihr neues Lieblingsbuch ❤️ zu finden.",
    button_create_offer: "Inserat erstellen",
    create_title: "Neues Inserat 📚 ",
    create_message:
      "Um ein neues Inserat anzulegen, gib einfach die ISBN oder des Buches ein. Wir werden anschließend alle Informationen zusammentragen und automatisch 🤖 dich ergänzen.",
    isbn_check_error:
      "Ups! Leider konnten wir dein Buch nicht in unserer finden. Dies ist meistens der Fall, wenn das gerade erschienen ist. Probiere es in einigen Tagen.",
    button_check_isbn: "Überprüfe ISBN",
    cancel: "abbrechen",
    reserved: "reserviert",
    offered: "inseriert",
    isbn_validation_error: "Die ISBN muss 9,10 oder 13 stellig sein.",
    create: "erstellen",
    back: "zurück",
    offered_in: "Angeboten in",
    creation_successfull:
      "Dein Buch 📖 wurde erfolgreich inseriert und ist nun für andere Nutzer und Nutzerinnen sichtbar 🎉.",
    back_to_offers: "zurück zu meinen Inseraten",
  },
  chat: {
    no_chats:
      "Du hast leider noch niemanden kontaktiert. Schau doch mal in die ob du etwas findest was dich interessiert. Reserviere und dann den Anbieter, um dein neues Lieblingsbuch 📖 abholen können.",
    button_to_offers: "zu den inseraten",
    search: "suchen",
  },
  onboarding: {
    choose_language: "Wähle deine Sprache.",
    your_name: "Dein Name",
    your_name_desc:
      "Unter welchem Namen sollen dich die anderen Nutzer und Nutzerinnen sehen 👀 können?",
    your_searcharea: "Dein Einzugsgebiet",
    your_searcharea_desc:
      "In welchem Gebiet 🗺 sollen wir für dich nach Büchern suchen 🔎?",
    rent_books: "Bücher verleiehen",
    rent_books_desc:
      "Wäre es für dich in Zukunft eine Option einige deiner Lieblingsstücke ♥ zu verleihen?",
    save_and_go: "Speichern & Loslegen",
    cancel_and_logout: "Abbrechen & Ausloggen",
    successfull_onboarded:
      "Alles ist eingerichtet 🎉! Schnapp  eine Tasse Kaffee ☕, Tee oder dein Lieblingsgetränk deiner Wahl und begib dich auf die Suche 🔎 nach deinem nächsten Lieblingsbuch 📖.",
  },
  settings: {
    avatar_url: "Profilbild Link",
    avatar_hint:
      "Profilbilder werden erst nach einer erneuten Anmeldung angezeigt.",
    edit_profile: "Profil editieren",
    change_password: "passwort ändern",
    change_password_desc:
      "Du hast eine e-Mail 📧 erhalten, mit der du dein Passwort ändern kannst.",
    delete_account: "Account löschen",
    delete_account_desc:
      "😳 Oh nein! Schade, dass du uns  möchtest. Bist du dir sicher, dass du dein Konto löschen möchtest?",
    yes_delete_account: "Ja, mein Konto löschen",
  },
  words: {
    language: "Sprache",
    nickname: "Anzeigename",
    city: "Stadt",
    zip: "Postleitzahl",
    yes: "Ja",
    no: "Nein",
    nice: "Super",
    go: "Loslegen",
    settings: "Einstellungen",
    name: "Name",
    email: "e-Mail",
    logout: "abmelden",
    save: "speichern",
    cancel: "abbruch",
    day: "Tag",
    days: "Tage",
    contact_verb: "kontaktieren",
    close: "schließen",
    reserve: "reservieren",
    back: "zurück",
    reservation: "Reservierung",
    by: "von",
    reserved: "reserviert",
  },
  components: {
    filter: {
      err_invalid_isbn: "Ungültige ISBN",
      err_invalid_zip: "Ungültige Postleitzahl - 5 Zahlen erfordert",
      zip: "Postleitzahl",
      city: "Stadt",
      filter: "filtern",
      reset: "zurücksetzen",
      close: "schließen",
    },
    offer_card: {
      delete_offer: "Inserat löschen",
      pickup_at: "Abzuholen in",
      book_was_pickedup: "Buch wurde abgeholt",
    },
    reservation_card: {
      book_was_pickedup: "Buch wurde abgeholt",
    },
    offer: {
      revoke_reservation: "Reservierung storniern",
      contact_provider: "Anbieter kontaktieren",
    },
  },
};
