namespace ESAT_backend.Core.DTO
{
    public class CustomerHdrDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int Category { get; set; }
        public List<CustomerDetailDto>? CustomerDetails { get; set; }
        public bool IsUpdate { get; set; }
    }

    public class CustomerDetailDto
    {
        public int? ID { get; set; }
        public int? SN { get; set; }
        public DateTime? TIME{ get; set; }
        public DateTime? DATE { get; set; }
        public string? REMARK { get; set; }
        public string? SendEmail { get; set; }

    }
}
