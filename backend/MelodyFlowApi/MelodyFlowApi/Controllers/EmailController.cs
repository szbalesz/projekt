using EmailApiKedd.Services.IEmail;
using Microsoft.AspNetCore.Mvc;

namespace EmailApiKedd.Controllers
{
    [Route("emails")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailInterface emailInterface;

        public EmailController(IEmailInterface emailInterface)
        {
            this.emailInterface = emailInterface;
        }
        //Ezzel a végponttal emailt tudunk küldeni és tartalmazza hogy kinek a tárgyat és magát az üzenetet
        [HttpPost]
        public ActionResult PostSendMail(string To, string Subject, string Body)
        {
            emailInterface.SendEmail(To, Subject, Body);
            return Ok("Sikeres email küldés.");
        }
    }
}
