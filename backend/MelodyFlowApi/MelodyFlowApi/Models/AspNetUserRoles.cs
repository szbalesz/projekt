namespace MelodyFlowApi.Models
{
    public class AspNetUserRoles
    {
        public string UserId { get; set; } = null!;
        public string RoleId { get; set; } = null!;

        public virtual Aspnetrole Aspnetrole { get; set; }
        public virtual Aspnetuser Aspnetuser { get; set; }
    }
}
