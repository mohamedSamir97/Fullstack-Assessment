using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ESAT_backend.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CUSTOMER_DTL",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SN = table.Column<int>(type: "int", nullable: false),
                    HDR_ID = table.Column<int>(type: "int", nullable: false),
                    TIME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DATE = table.Column<DateTime>(type: "datetime2", nullable: false),
                    REMARK = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SEND_EMAIL = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CUSTOMER_DTL", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CUSTOMER_HDR",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EMAIL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CATEGORY = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CUSTOMER_HDR", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CUSTOMER_DTL");

            migrationBuilder.DropTable(
                name: "CUSTOMER_HDR");
        }
    }
}
