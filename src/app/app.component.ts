import { Component, OnInit } from '@angular/core';
// import {
//   EventHandlerPayload,
//   WidgetChatDataService,
//   WidgetChatDataSubject,
//   WidgetCustomerDataService,
//   WidgetCustomerDataSubject,
//   WidgetGreetingService,
//   WidgetGreetingSubject,
//   WidgetIsReadyService,
//   WidgetIsReadySubject,
//   WidgetStateService,
//   WidgetStateSubject
// } from '@livechat/widget-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // widgetState$: WidgetStateSubject;
  // widgetIsReady$: WidgetIsReadySubject;
  // chatData$: WidgetChatDataSubject;
  // greeting$: WidgetGreetingSubject;
  // customerData$: WidgetCustomerDataSubject;

  constructor(
    // widgetStateService: WidgetStateService,
    // widgetIsReadyService: WidgetIsReadyService,
    // chatDataService: WidgetChatDataService,
    // greetingService: WidgetGreetingService,
    // customerDataService: WidgetCustomerDataService,
  ) {
    // this.widgetState$ = widgetStateService.subject;
    // this.widgetIsReady$ = widgetIsReadyService.subject;
    // this.chatData$ = chatDataService.subject;
    // this.greeting$ = greetingService.subject;
    // this.customerData$ = customerDataService.subject;
  }

  ngOnInit() {
    // this.widgetState$.subscribe((widgetState) => {
    //   console.log('AppComponent.ngOnInit.widgetState', widgetState);
    // });

    // this.widgetIsReady$.subscribe((widgetIsReady) => {
    //   console.log('AppComponent.ngOnInit.widgetIsReady', widgetIsReady);
    // });

    // this.chatData$.subscribe((chatData) => {
    //   console.log('AppComponent.ngOnInit.chatData', chatData);
    // });

    // this.greeting$.subscribe((greeting) => {
    //   console.log('AppComponent.ngOnInit.greeting', greeting);
    // });

    // this.customerData$.subscribe((customerData) => {
    //   console.log('AppComponent.ngOnInit.customerData', customerData);
    // });
  }

  // handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
  //   console.log('LiveChatWidget.onNewEvent', event);
  // }
}
