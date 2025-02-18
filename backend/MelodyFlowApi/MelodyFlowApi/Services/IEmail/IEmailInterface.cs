namespace EmailApiKedd.Services.IEmail
{
    public interface IEmailInterface
    {
        void SendEmail(string To, string Subject, string Body);
    }
}
