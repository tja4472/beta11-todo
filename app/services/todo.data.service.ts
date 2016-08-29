import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { ToDo } from '../models/todo';

@Injectable()
export class TodoDataService {
    constructor(
        public af: AngularFire
    ) {
    }

    getData(): Observable<ToDo[]> {
        return this.af.database.list('/todo', {
            query: {
                orderByKey: true,
                limitToFirst: 8, /* include today which we ignore in HTML */
            }
        });
            // .map(x => x.map(d => toFivebookItem(d)));
    }
}

/*
function toFivebookItem(x: any): FivebookItem {
    console.log('xxxx>', x);
    let result: FivebookItem = <FivebookItem>{
        books: [],
        date: x.date,
        description: x.descr,
        title: x.title
    };

    result.books = x.books.map(book => toFivebookItemBook(book));

    return result;
}

function toFivebookItemBook(x: any): FivebookItemBook {
    let result = <FivebookItemBook>{
        authorString: x.authorstring,
        description: x.descr,
        imageUrl: x.image_url,
        subTitle: x.subtitle,
        title: x.title
    };

    return result;
}
*/