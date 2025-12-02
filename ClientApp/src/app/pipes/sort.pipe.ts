import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: false
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, reverse: boolean = false): any[] {
    if (!array || !field) {
      return array;
    }

    const sortedArray = [...array].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (aValue < bValue) {
        return reverse ? 1 : -1;
      }
      if (aValue > bValue) {
        return reverse ? -1 : 1;
      }
      return 0;
    });

    return sortedArray;
  }
}
