import { GuestItem } from './guest-item';

export interface ConfirmationItem {
    email: string;
    guestNumber: number;
    GuestArray: Array<GuestItem>;
    additionalInfo: string;
}
