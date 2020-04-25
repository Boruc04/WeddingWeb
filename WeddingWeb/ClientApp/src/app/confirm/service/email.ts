export interface Email {
    mainEmail: string;
    guestNumber: number;
    guestList: Guest[];
    additionalInfo: string;
}

export interface Guest {
    firstName: string;
    lastName: string;
}

export interface CustomResponse {
    ok: boolean;
    status: number;
    message: string;
}
