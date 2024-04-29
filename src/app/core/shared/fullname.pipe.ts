import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(value: any): string {
    if (!value || (!value.firstName && !value.lastName)) {
      return '';
    }
    return `${value.lastName} ${value.firstName}`;
  }
}