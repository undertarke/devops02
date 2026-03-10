using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Hospital_API.Services
{
    
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly string _sendGridApiKey;
        private readonly string _senderEmail;
        private readonly string _senderName;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _sendGridApiKey = _configuration["SendGrid:ApiKey"];
            _senderEmail = _configuration["SendGrid:SenderEmail"];
            _senderName = _configuration["SendGrid:SenderName"];
        }

        public async Task<bool> SendEmailAsync(EmailDTO emailDto)
        {
            var client = new SendGridClient(_sendGridApiKey);
            var from = new EmailAddress(_senderEmail, _senderName);
            var to = new EmailAddress(emailDto.To);
            var msg = MailHelper.CreateSingleEmail(from, to, emailDto.Subject, emailDto.Body, emailDto.Body);
            msg.ReplyTo = new EmailAddress("noreply@demoproject.software", "No Reply");
            var response = await client.SendEmailAsync(msg);
            return response.IsSuccessStatusCode;
        }
    }
}