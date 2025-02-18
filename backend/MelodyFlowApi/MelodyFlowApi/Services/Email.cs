using EmailApiKedd.Services.IEmail;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace EmailApiKedd.Services
{
    public class Email : IEmailInterface
    {
        private readonly IConfiguration configuration;

        public Email(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void SendEmail(string To, string Subject, string Body)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(configuration.GetSection("EmailSettings:EmailUserName").Value));
            email.To.Add(MailboxAddress.Parse(To));
            email.Subject = Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = Body };

            using var smtp = new SmtpClient();
            smtp.Connect(configuration.GetSection("EmailSettings:EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(configuration.GetSection("EmailSettings:EmailUserName").Value, configuration.GetSection("EmailSettings:EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
