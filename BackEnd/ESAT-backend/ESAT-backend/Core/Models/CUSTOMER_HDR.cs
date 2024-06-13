using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ESAT_backend.Core.Models
{
    public class CUSTOMER_HDR
    {
        public int ID { get; set; }
        public string? NAME { get; set; }
        public string? EMAIL { get; set; }
        public int CATEGORY { get; set; }
    }
}
