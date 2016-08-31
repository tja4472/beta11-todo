import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { Indexes } from '../models/indexes';
import { ToDo } from '../models/todo';

import { reorderArray } from 'ionic-angular';

@Injectable()
export class TodoDataService {
    constructor(
        public af: AngularFire
    ) {
    }

    getData(): Observable<ToDo[]> {
        return this.af.database.list('/todo', {
            query: {
                orderByChild: 'index',
                limitToFirst: 8, /* include today which we ignore in HTML */
            }
        });
        // .map(x => x.map(d => toFivebookItem(d)));
    }

    reorderItemsAndUpdate(indexes: Indexes, todos: ToDo[]) {
        const itemsToSave = [...todos];
        reorderArray(itemsToSave, indexes);

        const items = this.af.database.list('/todo');

        for (let x = 0; x < itemsToSave.length; x++) {
            items.update(itemsToSave[x].$key, { index: x });
        }
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