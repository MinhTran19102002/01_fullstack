import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class TransformTimezoneInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.transformDates(data)),
    );
  }

  private transformDates(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.transformDates(item));
    } else if (data && typeof data === 'object') {
      const newData = { ...data };
      for (const key of Object.keys(newData)) {
        if (newData[key] instanceof Date) {
          newData[key] = dayjs(newData[key])
            .tz('Asia/Ho_Chi_Minh')
            .format('YYYY-MM-DD HH:mm:ss');
        } else if (typeof newData[key] === 'object') {
          newData[key] = this.transformDates(newData[key]);
        }
      }
      return newData;
    }
    return data;
  }
}
