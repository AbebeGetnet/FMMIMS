using System.ComponentModel.DataAnnotations;

namespace FMMIS.DTos.Account
{
    public class LogInDto
    {
        [Required(ErrorMessage ="User name is required")]
        public string UserName { get; set; }
        [Required(ErrorMessage ="Password is required")]
        public string Password { get; set; }
    }
}
