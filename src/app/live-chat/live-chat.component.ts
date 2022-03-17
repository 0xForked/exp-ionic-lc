import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as CustomerSDK from '@livechat/customer-sdk';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  @ViewChild('content', { static: false }) messageContainers: QueryList<ElementRef>;

  sdk = null;

  users = {};
  agent = {};
  chatId = null;
  customerId = null;

  history = null;
  active = false;
  activating = false;
  chat = null;
  messages = [];

  msg: string = null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.initLiveChatCustomerSDK();
  }

  initLiveChatCustomerSDK() {
    const sdk = CustomerSDK.debug(CustomerSDK.init({
      licenseId: 13819833,
      clientId: '227320b1fb580df078c596e482061cbc',
    }));

    this.sdk = sdk;

    sdk.on('connected', () => {
      const properties = {
        name: 'Lorto Poney',
        email: 'lorto@test.id',
        fields: {
          phone: '+9999999999999',
          origin: 'Custom LiveChat component'
        }
      };

      sdk.updateCustomer(properties).then(response => {
        console.log('after_update_customer', response);
      }).catch(error => {
        console.log('after_update_customer', error);
      });

      sdk.listChats().then(({ chatsSummary, totalChats }) => {
        if (this.chat) {
          return;
        }

        if (totalChats === 0) {
          // this.loaderElement.parentElement.removeChild(this.loaderElement);
          // DOMOperations.showFooter();
          // DOMOperations.showStartChatButton();
          return;
        }

        this.chat = chatsSummary[0].id;
        this.active = chatsSummary[0].active;

        // this.loadInitialHistory().then(() => {
        //   // this.loaderElement.parentElement.removeChild(this.loaderElement);
        //   // DOMOperations.showFooter();
        //   // if (!this.active) {
        //     // DOMOperations.hideChat();
        //   // } else {
        //     // DOMOperations.showChat();
        //   // }
        // });

        if (this.active) {
          this.loadInitialHistory();
        } else {
          this.startChat();
        }
      });
    });

    sdk.on('customer_id', (id) => {
      this.customerId = id;
      console.log('customer id', id);
    });

    sdk.on('user_data', (user) => {
      this.users[user.id] = user;
      this.agent = user.type === 'agent' ? user : '';
      console.log('user data', user);
      console.log('agent data', this.agent);
    });

    sdk.on('incoming_chat', ({ chat }) => {
      this.handleChatStart(chat);
      // this.scrollToBottom();
    });

    sdk.on('incoming_event', ({ event }) => {
      if (!this.chat || event.type !== 'message') {
        return;
      }

      const author = this.users[event.authorId];
      this.messages.push({
        id: event.id,
        text: event.text,
        authorType: this.isAgent(author) ? 'agent' : 'customer',
        avatar: author.avatar
      });

      // this.scrollToBottom();
    });

    sdk.on('connection_restored', () => {});
    sdk.on('user_is_typing', () => {});
    sdk.on('user_stopped_typing', () => {});
    sdk.on('user_joined_chat', () => {});
    sdk.on('user_left_chat', () => {});
    sdk.on('connection_lost', () => {});
    sdk.on('diconnected', (reason) => {});
  }

  isAgent = (user) => user.id !== this.customerId;

  loadInitialHistory = () => {
    const chatId = this.chat;

    this.history = this.sdk.getChatHistory({ chatId });

    const loadLatestHistory = () =>
      this.loadHistory(chatId).then(() => console.log(chatId));

    return loadLatestHistory()
      .catch(() => loadLatestHistory())
      .catch(() => {});
  };

  loadHistory(chat) {
    return new Promise((resolve, reject) => {
      // state.historyStatus = historyStates.LOADING;
      this.history.next().then(
        ({ value: { threads }, done }) => {
          if (!threads) {
            return;
          }

          this.getMessagesFromThreads(threads);
          resolve('');
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  startChat() {
    this.activating = true;

    const payload = {
      chat: {
        id: this.chat,
        thread: {}
      }
    };

    // events: this.messages.map((event) => ({
    //   type: 'message',
    //   text: event.message,
    //   customId: event.id
    // }))

    const action = this.chat ? this.sdk.resumeChat : this.sdk.startChat;

    action(payload)
      .then(({ chat }) => {
        this.handleChatStart(chat);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleMessage() {
    const inputData = this.msg;

    if (!inputData) {
      return;
    }

    const messageId = `${Math.random() * 1000}`;

    // console.log(this.active);
    // console.log(this.activating);
    if (this.active) {
      //
    }
    //else {
    //   if (!this.activating) {
    //     this.startChat();
    //   }
    // }

    this.sendMessage(this.chat, messageId, inputData);

    // this.messages.push({
    //   id: messageId,
    //   text: inputData,
    //   authorType: 'customer',
    //   avatar: null
    // });
  }

  handleChatStart(chat) {
    this.chatId = chat.id;
    this.getMessagesFromThreads([chat.thread]);
    console.log('handleChatStart', chat.thread);
  }

  sendMessage(chat, id, text) {
    const message = { customId: id, text, type: 'message' };

    this.sdk.sendEvent({
      chatId: chat,
      event: message
    }).then((confirmedMessage) => confirmedMessage ? this.msg = null : console.log('error'));

    this.messages.push({ id, text, authorType: 'customer' });

  }

  getMessagesFromThreads(threads) {
    const messageData = [];

    threads
      .map(({ events }) => events || [])
      .reduce((acc, current) => [...acc, ...current], [])
      .filter((event) => event.type === 'message')
      .map((event) => {
        const author = this.users[event.authorId];
        console.log('chat_data_test', event);
        messageData.push({
          id: event.id,
          text: event.text,
          authorType: this.isAgent(author) ? 'agent' : 'customer',
          avatar: author.avatar
        });
      });

    this.messages = messageData;
  }

  scrollToBottom = () => this.messageContainers.changes.subscribe((list: QueryList<ElementRef>) => {
    this.scrollToBottom(); // For messages added later
  });

  close = () => this.modalController.dismiss();
}
