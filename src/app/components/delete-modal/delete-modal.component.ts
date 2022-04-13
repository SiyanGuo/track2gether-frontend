import { Component, Input, OnInit } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RecordService } from 'src/app/services/record.service';
import { TransactionsService } from 'src/app/services/transactions.service';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  faTrashCan = faTrashCan;
  @Input()
  transactionId!: number;

  @Input()
  typeId!:number;
  
  closeResult = '';

  constructor(private modalService: NgbModal, private transactionService: TransactionsService, private recordService: RecordService) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  delete() {
    console.log("transactionId", this.transactionId)
    this.transactionService.deleteTransaction(this.transactionId)
    .subscribe( (res:any) => {
      this.transactionService.getAllTransactionsByType(this.typeId);
    });
  };

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
  }

}
