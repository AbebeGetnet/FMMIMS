using System.ComponentModel.DataAnnotations;

namespace FMMIS.DTos.Account
{
    public class RegisterDTo
    {
        [Required]
        [StringLength(15, MinimumLength =3, ErrorMessage = "First name must be at least (3).")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Last name must be at least (3).")]
        public string LastName { get; set; }
        [Required]
        [RegularExpression("^\\w+@[a-zA-Z]+?\\.[a-zA-Z]{2,3}$", ErrorMessage = "Invalid email.")]
        public string Email { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 6, ErrorMessage = "Invalid password length.")]
        public string Password { get; set; }
    }
}
