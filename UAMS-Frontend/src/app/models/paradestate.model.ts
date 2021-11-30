import { Causes } from './Classes/Causes';
import { RollCall } from './Classes/RollCall';
export class Paradestate {
    id: number = -1;
    date: string = "2021-11-27"; //YYYY-MM-DD
    total:RollCall[] = [];
    active:RollCall[] = [];
    present:RollCall[] = [];
    absence:RollCall[] = [];
    cause_of_absence:Causes[] = [];
}
