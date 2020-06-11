import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ValueArray'
})
export class ValueArrayPipe implements PipeTransform {

  transform(objects: any = []) {
    return Object.values(objects);
  }

}
