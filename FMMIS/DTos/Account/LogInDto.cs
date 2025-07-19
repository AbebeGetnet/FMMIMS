using System.ComponentModel.DataAnnotations;

namespace FMMIS.DTos.Account
{
    public class LogInDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
