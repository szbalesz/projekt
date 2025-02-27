import api from './Api';

const emailTemplates = {
    register: {
      subject: "🎶 Üdvözlünk {username} a MelodyFlow-n – Kezdődjön a zenei utazásod!",
      body: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; background: white; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2c3e50;">Üdvözlünk {username} a MelodyFlow-n!</h2>
            <h3 style="color: #2c3e50;">Kezdődjön a zenei utazásod! 🎶</h3>
            <p style="font-size: 16px; color: #555;">
              Köszönjük, hogy csatlakoztál hozzánk! A MelodyFlow segítségével felfedezheted, megoszthatod és élvezheted kedvenc zenéidet.
            </p>
            <p style="font-size: 16px; color: #555;">
              Kattints az alábbi gombra, hogy belépj és elkezdhesd a zenehallgatást!
            </p>
            <a href="http://localhost:3000" 
               style="display: inline-block; background-color: #1db954; color: white; padding: 12px 24px; text-decoration: none; font-size: 18px; border-radius: 5px; margin-top: 10px;">
              🎵 Nyisd meg a MelodyFlow-t
            </a>
            <p style="font-size: 14px; color: #888; margin-top: 20px;">
              Ha a fenti gomb nem működik, másold be ezt a linket a böngésződ címsorába: 
              <br>
              <a href="http://localhost:3000" style="color: #1db954;">http://localhost:3000</a>
            </p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #999;">
              Ezt az e-mailt automatikusan küldtük. Ha nem te regisztráltál, kérjük, hagyd figyelmen kívül.
            </p>
          </div>
        </div>
      `
    }
};

export const sendEmail = async (to, username, type) => {
  const template = emailTemplates[type];

  if (!template) {
    throw new Error(`Érvénytelen e-mail típus: ${type}`);
  }

  const subject = template.subject.replace("{username}", username);
  const body = template.body.replace(/{username}/g, username);

  try {
    const response = await api.post("/email", {
      to,
      subject,
      body
    });
    return response.data;
  } catch (error) {
    console.error("Hiba történt az e-mail küldése közben:", error);
    throw error;
  }
}
