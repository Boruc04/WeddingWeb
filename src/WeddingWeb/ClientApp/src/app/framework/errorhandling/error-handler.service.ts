import { ErrorHandler, Injectable } from "@angular/core";
import { LoggingService } from "../logging/logging.service";

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    constructor(private loggingService: LoggingService) {
        super();
    }

    handleError(error: Error) {
        this.loggingService.logException(error);
    }
}