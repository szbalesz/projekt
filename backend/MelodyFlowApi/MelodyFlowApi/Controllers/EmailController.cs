using EmailApiKedd.Services.IEmail;
using MelodyFlowApi.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EmailApiKedd.Controllers
{
    [Route("api/email")]
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
        public ActionResult PostSendMail(SendEmailDto sendEmailDto)
        {
            emailInterface.SendEmail(sendEmailDto.To,sendEmailDto.Subject,sendEmailDto.Body);
            return Ok("Sikeres email küldés.");
        }
    }
}
