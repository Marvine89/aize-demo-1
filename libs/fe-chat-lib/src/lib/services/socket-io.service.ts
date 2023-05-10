import { Injectable, inject } from '@angular/core';
import { EnvironmentToken } from '@fe-environment';
import { SocketEvents, TokenService } from '@share-lib';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class SocketIOService {
  private readonly _tokenService = inject(TokenService);
  private readonly _environment = inject(EnvironmentToken);
  private _socket!: Socket;

  get socket() {
    if (this._socket) return this._socket;
    throw new Error('please connect to web socket');
  }

  close() {
    this._socket.close();
  }

  disconnect() {
    this._socket.disconnect();
  }

  connect() {
    const extraHeaders = { Authorization: this._tokenService.token || '' };
    this._socket = io(this._environment.webSocketUrl, { extraHeaders });
    this._connected();
  }

  private _connected() {
    this._socket.on(SocketEvents.ON_CONNECT, () => this._socket.emit(SocketEvents.LOGIN_USER, {}));
  }
}
