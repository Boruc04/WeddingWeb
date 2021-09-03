import { Injectable } from '@angular/core';
import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoggingService {
    appInsights: ApplicationInsights;
    constructor() {
        this.appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: environment.appInsights.instrumentationKey,
                enableAutoRouteTracking: true
            }
        });
        this.appInsights.loadAppInsights();
    }

    logPageView(name?: string, url?: string) {
        this.appInsights.trackPageView({
            name: name,
            uri: url
        });
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        this.appInsights.trackEvent({ name: name }, properties);
    }

    logMetric(name: string, average: number, properties?: { [key: string]: any }) {
        this.appInsights.trackMetric({ name: name, average: average }, properties);
    }

    logException(exception: Error, severityLevel?: number) {
        this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
        if (!environment.production) {
            this.sendToConsole(exception);
        }
    }

    logTrace(message: string, properties?: { [key: string]: any }) {
        this.appInsights.trackTrace({ message: message }, properties);
    }

    private sendToConsole(error: any, severityLevel: SeverityLevel = SeverityLevel.Error) {

        switch (severityLevel) {
            case SeverityLevel.Critical:
            case SeverityLevel.Error:
                (<any>console).group('WeddingWeb Error:');
                console.error(error);
                if (error.message) {
                    console.error(error.message);
                }
                if (error.stack) {
                    console.error(error.stack);
                }
                (<any>console).groupEnd();
                break;
            case SeverityLevel.Warning:
                (<any>console).group('WeddingWeb Error:');
                console.warn(error);
                (<any>console).groupEnd();
                break;
            case SeverityLevel.Information:
                (<any>console).group('WeddingWeb Error:');
                console.log(error);
                (<any>console).groupEnd();
                break;
        }
    }
}
