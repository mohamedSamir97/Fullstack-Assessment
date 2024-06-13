namespace ESAT_backend.Core.Models
{
    public class CUSTOMER_DTL
    {
        public int ID { get; set; }
        public int SN { get; set; }
        public int HDR_ID { get; set; }
        public DateTime TIME { get; set; }
        public DateTime DATE { get; set; }
        public string? REMARK { get; set; }
        public string? SEND_EMAIL { get; set; }
    }
}
