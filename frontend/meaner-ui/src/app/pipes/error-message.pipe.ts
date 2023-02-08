import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  errorMessages: Record<string, string> = {
    "username taken": "This name is taken, please try another one."
  }

  transform(value: string): string {
    return (typeof value == 'string' && this.errorMessages[value.toLocaleLowerCase()]) || 'Something went wrong, please try again later.';
  }
}