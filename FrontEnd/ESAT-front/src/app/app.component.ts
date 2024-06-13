import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from './service/customer.service';
import { CustomerHdrDto, CustomerResponseDto } from './interface';
interface Customer {
  ID: number,
  NAME: string,
}

interface Category {
  NAME: string,
  ID: number
}
export interface CustomerDetail {
  id?: number;
  sn?: number;
  time?: Date;
  date?: Date;
  remark?: string;
  sendEmail?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent {
  customerDialog?: boolean;

  CustomerDetails?: CustomerDetail[] | any = [];

  CustomerDetail?: CustomerDetail;

  selectedCustomerDetail?: CustomerDetail[];

  submitted?: boolean;
  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public customerService: CustomerService) {

    this.categories = [
      { NAME: 'Hardware', ID: 0 },
      { NAME: 'Software', ID: 1 },
    ];

    //this.selectedCategory = this.categories[0];
  }
  title = 'ESAT-front';

  categories!: Category[];
  selectedCategory?: Category;

  id: number | null = null;
  name: string = '';
  email: string = '';


  HwList: Customer[] = [];
  SwList: Customer[] = [];
  selectedHw: Customer | null = null;
  selectedSw: Customer | null = null;

  isUpdate: boolean = false;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.customerService.getAll().subscribe({
      next: (data: CustomerResponseDto) => {
        this.HwList = data.hardware;
        this.SwList = data.software;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch customers.' });
      }
    });
  }


  fire(e: any) {
    this.isUpdate = true;

    let id = e.value.id;
    this.customerService.getById(id).subscribe({
      next: (response: CustomerHdrDto) => {
        console.log(response);
        let selectedCategoryRes = response.category == 0 ? this.categories[0] : this.categories[1] ;
        this.id = response.id;
        this.name = response.name;
        this.email = response.email;
        this.selectedCategory = selectedCategoryRes;
        this.CustomerDetails = response.customerDetails;

      },
      error: (error: any) => {
        const errorMessage = error.error?.message || 'Failed to get customer.';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      }
    });

  }

  //customer details

  openNew() {
    this.CustomerDetail = {};
    this.submitted = false;
    this.customerDialog = true;
  }

  deleteSelectedDetails() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected details?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CustomerDetails = this.CustomerDetails.filter((val: any) => !this.selectedCustomerDetail!.includes(val));
        this.selectedCustomerDetail = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Detail Deleted', life: 3000 });
      }
    });
  }

  editDetail(detail: CustomerDetail) {
    this.CustomerDetail = { ...detail };
    this.customerDialog = true;
  }

  deleteDetail(detail: CustomerDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected detail?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CustomerDetails = this.CustomerDetails.filter((val: CustomerDetail) => val.sn !== detail.sn);
        this.CustomerDetail = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Detail Deleted', life: 3000 });
        this.setSN();
      }
    });
  }

  hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }

  saveDetail() {
    this.submitted = true;
    if (this.CustomerDetail?.time && this.CustomerDetail?.date
      && this.CustomerDetail?.remark && this.CustomerDetail?.sendEmail) {
      if (this.CustomerDetail.sn) {

        let index = this.findIndexById(this.CustomerDetail.sn);
        this.CustomerDetails[index] = this.CustomerDetail;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Detail Updated', life: 3000 });
      }
      else {
        this.CustomerDetail.id  = 0 ;
        this.CustomerDetails.push(this.CustomerDetail);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Detail Created', life: 3000 });
      }

      this.CustomerDetails = [...this.CustomerDetails];
      this.customerDialog = false;
      this.CustomerDetail = {};
      this.setSN();
    }
  }

  findIndexById(sn: number): number {
    let index = -1;
    for (let i = 0; i < this.CustomerDetails.length; i++) {
      if (this.CustomerDetails[i].sn === sn) {
        index = i;
        break;
      }
    }

    return index;
  }

  private setSN() {
    for (let i = 0; i < this.CustomerDetails.length; i++) {
      this.CustomerDetails[i].sn = i + 1;
    }
  }

  save(form: NgForm) {
    if (form.valid) {
      const data: CustomerHdrDto = {
        id: this.isUpdate ? this.id! : 0,
        name: this.name,
        email: this.email,
        category: this.selectedCategory?.ID!,
        customerDetails: this.CustomerDetails,
        isUpdate : this.isUpdate,
      };

      this.customerService.save(data).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer saved successfully.' });
          this.reset();
          this.getAll();
          this.isUpdate = false;
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Failed to save customer.';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        }
      });

    } else {
      console.log('Form is invalid');
      if (form.controls['email']?.errors?.['email']) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter valid email', life: 3000 });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all fields', life: 3000 });
      }

      form.controls['id'].markAsTouched();
      form.controls['name'].markAsTouched();
      form.controls['email'].markAsTouched();
    }

  }

  print(){
    const printContent = document.getElementById('printableArea')!.innerHTML;
    const WindowPrt = window.open('', '', 'width=900,height=650');
    WindowPrt?.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            .hidden-printable-area {
              display: block;
            }
            body{
              font-size: 40px;
            }

            table, th, td {
              border: 1px solid;
              font-size: 40px;
            }

            #printableArea, #printableArea * {
              visibility: visible;
            }

            #printableArea {
              position: absolute;
              left: 0;
              top: 0;
            }
          </style>
        </head>
        <body onload="window.print(); window.close()">
          ${printContent}
        </body>
      </html>`
    );
    WindowPrt?.document.close();
    console.log(WindowPrt);
  }

  reset() {
    this.id = null;
    this.name = '',
      this.email = '',
      this.selectedCategory = this.categories[0],
      this.CustomerDetails = [];
  }

}
