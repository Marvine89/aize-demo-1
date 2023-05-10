import { dockStart } from '@nlpjs/basic';
import { Injectable } from '@nestjs/common';
import { NlpBot } from '../models/be-chat.model';

@Injectable()
export class NlpService {
  private _nlp_bot: NlpBot;

  constructor() {
    this._setupDockStart();
  }

  get nlp_bot() {
    return this._nlp_bot;
  }

  process(question: string) {
    return this._nlp_bot.process('en', question);
  }

  private async _setupDockStart() {
    const dock = await dockStart({ use: ['Basic', 'Qna'] });
    const nlp = dock.get('nlp');
    await nlp.addCorpus({
      filename: this.qnaFile,
      importer: 'qna',
      locale: 'en'
    });
    await nlp.train();
    this._nlp_bot = nlp;
  }

  private get qnaFile() {
    return './libs/be-chat-lib/src/lib/services/mock/qna.tsv';
  }
}
