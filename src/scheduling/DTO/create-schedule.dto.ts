import { ScheduleStatus } from '../schedule-status.enum';
export class CreateScheduleDTO {
  date: Date;

  client: string;

  procedureId: number;

  status?: ScheduleStatus
}
