using ESAT_backend.Core.DTO;
using ESAT_backend.Core.Models;
using ESAT_backend.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ESAT_backend.Controllers
{

    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<CustomerResponseDto>> GetAll()
        {
            // Query hardware customers (category id = 0)
            var hardwareCustomers = await _context.CUSTOMER_HDR
                .Where(c => c.CATEGORY == 0)
                .Select(c => new CustomerDto { ID = c.ID, Name = c.NAME })
                .ToListAsync();

            // Query software customers (category id = 1)
            var softwareCustomers = await _context.CUSTOMER_HDR
                .Where(c => c.CATEGORY == 1)
                .Select(c => new CustomerDto { ID = c.ID, Name = c.NAME })
                .ToListAsync();

            // Construct the response
            var response = new CustomerResponseDto
            {
                Hardware = hardwareCustomers,
                Software = softwareCustomers
            };

            return Ok(response);
        }

        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] CustomerHdrDto customerDto)
        {
            if (customerDto == null)
            {
                return BadRequest(new { message = "Invalid customer data." });
            }

            try
            {
                //Add
                if (!customerDto.IsUpdate)
                {
                    var customerHeader = new CUSTOMER_HDR
                    {
                        ID = customerDto.Id,
                        NAME = customerDto.Name,
                        EMAIL = customerDto.Email,
                        CATEGORY = customerDto.Category
                    };

                    _context.CUSTOMER_HDR.Add(customerHeader);
                    await _context.SaveChangesAsync();

                    foreach (var detail in customerDto.CustomerDetails)
                    {
                        var customerDetail = new CUSTOMER_DTL
                        {
                            SN = detail.SN ?? 0,
                            HDR_ID = customerHeader.ID,
                            TIME = detail.TIME ?? DateTime.MinValue,
                            DATE = detail.DATE ?? DateTime.MinValue,
                            REMARK = detail.REMARK,
                            SEND_EMAIL = detail.SendEmail
                        };

                        _context.CUSTOMER_DTL.Add(customerDetail);
                    }

                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Customer created successfully" });

                }
                else //Update
                {
                    var customerHeaderDb = await _context.CUSTOMER_HDR
                                   .FirstOrDefaultAsync(c => c.ID == customerDto.Id);

                    if (customerHeaderDb == null)
                    {
                        return NotFound(new { message = "Customer not found." });
                    }

                    customerHeaderDb.NAME = customerDto.Name;
                    customerHeaderDb.EMAIL = customerDto.Email;
                    customerHeaderDb.CATEGORY = customerDto.Category;

                    var customerDetails = await _context.CUSTOMER_DTL.
                        Where(x => x.HDR_ID == customerDto.Id)
                        .ToListAsync();

                    _context.CUSTOMER_DTL.RemoveRange(customerDetails);

                    foreach (var detail in customerDto.CustomerDetails)
                    {
                        var customerDetail = new CUSTOMER_DTL
                        {
                            SN = detail.SN ?? 0,
                            HDR_ID = customerDto.Id,
                            TIME = detail.TIME ?? DateTime.MinValue,
                            DATE = detail.DATE ?? DateTime.MinValue,
                            REMARK = detail.REMARK,
                            SEND_EMAIL = detail.SendEmail
                        };

                        _context.CUSTOMER_DTL.Add(customerDetail);
                    }

                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Customer updated successfully" });
                }

            }
            catch (Exception ex)
            {

                return StatusCode(500, new { message = "An error occurred while saving the customer.", error = ex.Message });
            }
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var customerHeader = await _context.CUSTOMER_HDR
                    .FirstOrDefaultAsync(c => c.ID == id);

                var customerDetails = await _context.CUSTOMER_DTL
                    .Where(c => c.HDR_ID == id).ToListAsync();


                if (customerHeader == null)
                {
                    return NotFound(new { message = "Customer not found." });
                }
 
                var customerDto = new CustomerHdrDto
                {
                    Id = customerHeader.ID,
                    Name = customerHeader.NAME,
                    Email = customerHeader.EMAIL,
                    Category = customerHeader.CATEGORY,
                    CustomerDetails = customerDetails.Select(detail => new CustomerDetailDto
                    {
                        SN = detail.SN,
                        TIME = detail.TIME,
                        DATE = detail.DATE,
                        REMARK = detail.REMARK,
                        SendEmail = detail.SEND_EMAIL
                    }).ToList()
                };

                return Ok(customerDto);
            }
            catch (Exception ex)
            {

                return StatusCode(500, new { message = "An error occurred while retrieving the customer.", error = ex.Message });
            }
        }




    }
}
