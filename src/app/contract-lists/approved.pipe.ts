import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approved'
})
export class ApprovedPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value);
    
    if(value == null){
      return null;
    }

    var data = [];
    var date = new Date();
    console.log("date : "+date);

    for(let list of value){
      var temp = new Date(list.start_date);
      if(date < temp){
        console.log("printed date = "+temp);
        if(list.isApproved){
          data.push(list);
        }
      }
    }
    return data;
  }

}
